// compress-images.mjs — fixed version using temp files
import sharp from 'sharp';
import { readdir, stat, rename, writeFile, readFile } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';
const QUALITY    = 75;
let   saved      = 0;
let   count      = 0;

async function compress(filePath) {
  const ext  = extname(filePath).toLowerCase();
  const tmpPath = filePath + '.tmp';

  let origSize;
  try { origSize = (await stat(filePath)).size; }
  catch { return; }

  try {
    // Read entire file into memory first
    const inputBuf = await readFile(filePath);
    let outputBuf;

    if (ext === '.png') {
      outputBuf = await sharp(inputBuf)
        .png({ quality: QUALITY, compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      outputBuf = await sharp(inputBuf)
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();
    } else {
      return;
    }

    if (outputBuf.length < origSize) {
      // Write compressed to temp, then rename over original
      await writeFile(tmpPath, outputBuf);
      await rename(tmpPath, filePath);

      const saving = origSize - outputBuf.length;
      saved += saving;
      count++;
      console.log(`✅ ${basename(filePath)}: ${kb(origSize)}KB → ${kb(outputBuf.length)}KB  (saved ${kb(saving)}KB)`);
    } else {
      console.log(`⏭️  ${basename(filePath)}: already optimal`);
    }
  } catch (e) {
    console.warn(`⚠️  Skipped ${basename(filePath)}: ${e.message}`);
  }
}

function kb(bytes) { return Math.round(bytes / 1024); }

async function run() {
  const files = await readdir(PUBLIC_DIR);
  const imgs  = files.filter(f => /\.(png|jpe?g)$/i.test(f));
  console.log(`\n🔍 Compressing ${imgs.length} images in public/...\n`);
  for (const f of imgs) {
    await compress(join(PUBLIC_DIR, f));
  }
  const totalMB = (saved / 1024 / 1024).toFixed(1);
  console.log(`\n🎉 Done! Compressed ${count} files — saved ${kb(saved)}KB (${totalMB}MB) total`);
}

run();
