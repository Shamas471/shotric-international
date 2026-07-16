// ═══════════════════════════════════════════════════════════
//  Shotric International — Supabase Product Seeder
//  Run: node seed-products.mjs
// ═══════════════════════════════════════════════════════════
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = 'https://wsliasfayrewbnrmlopq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbGlhc2ZheXJld2Jucm1sb3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4ODMzODUsImV4cCI6MjA5NzQ1OTM4NX0._sna3QfXKygeVv65hRkq_CmCteCkDlVWRmzChI-p5Y0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PRODUCTS = [
  {
    art_number: 'SI-BG-001', name: 'Pro Boxing Gloves', slug: 'boxing-gloves',
    category: 'combat-sports', subcategory: 'boxing-gloves',
    tags: ['oem','private-label','bestseller','custom-logo','wholesale','export-ready'],
    short_desc: 'Premium full-grain leather boxing gloves engineered for training and competition. Custom logo embossing available.',
    long_desc: 'Our flagship boxing gloves are crafted from premium full-grain cowhide leather with multi-layer foam padding system engineered for maximum protection. Reinforced thumb attachment, velcro wrist support, and moisture-wicking inner lining. Available in 7 colour options. Used by gyms and fight brands in 35+ countries. Full OEM, private label and white-label manufacturing available — custom logo, colours, lining, and retail packaging.',
    materials: ['Full-grain Cowhide Leather','Multi-layer Foam','Velcro Wrist Strap','Cotton Lining'],
    sizes: ['8oz','10oz','12oz','14oz','16oz','18oz'],
    colors: ['Black/Red','Red/White','Royal Blue','White/Gold','Forest Green','Gold/Black','Purple/Silver'],
    weight_options: ['8oz','10oz','12oz','14oz','16oz','18oz'],
    moq: 25, lead_time_days: 35,
    is_oem: true, is_private_label: true, is_wholesale: true, is_custom: true,
    image_url: '/boxing-gloves-shotric.png',
    gallery_urls: ['/boxing-gloves-shotric.png','/boxing-gloves-red.png','/boxing-gloves-blue.png','/boxing-gloves-white-gold.png','/boxing-gloves-green.png','/boxing-gloves-gold.png','/boxing-gloves-purple.png'],
    is_featured: true, sort_order: 1,
  },
  {
    art_number: 'SI-MMA-001', name: 'MMA Sparring Gloves', slug: 'mma-gloves',
    category: 'combat-sports', subcategory: 'mma-gloves',
    tags: ['oem','private-label','mma','grappling','custom-sizes'],
    short_desc: 'Open-palm MMA grappling gloves with reinforced knuckle protection. 4oz–7oz. Full custom branding.',
    long_desc: 'Hybrid open-palm MMA gloves engineered for both striking and grappling. High-density foam knuckle guard with breathable mesh palm panel. Velcro wrist closure. Available in 4 colour options. OEM and private label orders welcome.',
    materials: ['Full-grain Leather','High-density Foam','Mesh Palm Panel','Velcro Closure'],
    sizes: ['S/M','L/XL'],
    colors: ['Black/Red','Deep Red','Royal Blue','Gold/Black'],
    weight_options: ['4oz','5oz','6oz','7oz'],
    moq: 25, lead_time_days: 35,
    is_oem: true, is_private_label: true, is_wholesale: false, is_custom: true,
    image_url: '/mma-gloves-shotric.png',
    gallery_urls: ['/mma-gloves-shotric.png','/mma-gloves-red.png','/mma-gloves-blue.png','/mma-gloves-gold.png'],
    is_featured: true, sort_order: 2,
  },
  {
    art_number: 'SI-HG-001', name: 'Professional Head Guard', slug: 'head-guards',
    category: 'combat-sports', subcategory: 'head-guards',
    tags: ['oem','boxing','muay-thai','custom','protection'],
    short_desc: 'Multi-layer foam head guard with cheek and chin protection. Open-face and full-face designs available.',
    long_desc: 'Premium boxing head guard offering full protection — extended cheek guards, chin bar, and padded forehead panel. EVA foam core with genuine leather shell. Available in open-face and full-face configurations. 4 colour options.',
    materials: ['Genuine Leather','EVA Foam','Adjustable Velcro Straps'],
    sizes: ['S','M','L','XL'],
    colors: ['Black/Red','Bold Red','Royal Blue','Gold/Black'],
    weight_options: [],
    moq: 30, lead_time_days: 35,
    is_oem: true, is_private_label: true, is_wholesale: false, is_custom: true,
    image_url: '/head-guard-shotric.png',
    gallery_urls: ['/head-guard-shotric.png','/head-guard-red.png','/head-guard-blue.png','/head-guard-gold.png'],
    is_featured: false, sort_order: 3,
  },
  {
    art_number: 'SI-HW-001', name: 'Premium Hand Wraps', slug: 'hand-wraps',
    category: 'combat-sports', subcategory: 'hand-wraps',
    tags: ['wholesale','private-label','custom-label','all-colours','boxing','muay-thai'],
    short_desc: 'Professional 180" semi-elastic hand wraps with thumb loop. Custom woven labels available.',
    long_desc: 'Semi-elastic 180" cotton hand wraps with reinforced thumb loop and hook-and-loop closure. Machine washable. Available in 3 colours. Custom woven brand labels and retail packaging for private label orders.',
    materials: ['Semi-elastic Cotton','Hook-and-loop Closure'],
    sizes: ['180" (4.5m)'],
    colors: ['Red','Royal Blue','Black/Red'],
    weight_options: [],
    moq: 100, lead_time_days: 25,
    is_oem: false, is_private_label: true, is_wholesale: true, is_custom: false,
    image_url: '/hand-wraps-shotric.png',
    gallery_urls: ['/hand-wraps-shotric.png','/hand-wraps-blue.png','/hand-wraps-black.png'],
    is_featured: false, sort_order: 4,
  },
  {
    art_number: 'SI-PM-001', name: 'Punch Mitts / Focus Pads', slug: 'punch-mitts',
    category: 'combat-sports', subcategory: 'punch-mitts',
    tags: ['oem','boxing','muay-thai','custom-logo','wholesale'],
    short_desc: 'Curved focus pads with shock-absorbing multi-layer foam. Full-grain leather. Custom logo available.',
    long_desc: 'Professional curved focus pads with shock-absorbing multi-layer foam core. Full-grain leather outer shell with padded wrist support strap. Available in 3 colour options with OEM logo and custom colour manufacturing.',
    materials: ['Full-grain Leather','Multi-layer Foam','Padded Wrist Strap'],
    sizes: ['Standard'],
    colors: ['Black/Red','Royal Blue','Bold Red'],
    weight_options: [],
    moq: 25, lead_time_days: 35,
    is_oem: true, is_private_label: true, is_wholesale: true, is_custom: true,
    image_url: '/punch-mitts-shotric.png',
    gallery_urls: ['/punch-mitts-shotric.png','/punch-mitts-blue.png','/punch-mitts-red.png'],
    is_featured: false, sort_order: 5,
  },
  {
    art_number: 'SI-HB-001', name: 'Heavy Punching Bag', slug: 'heavy-bag',
    category: 'combat-sports', subcategory: 'heavy-bag',
    tags: ['wholesale','gym-equipment','custom-branding','oem'],
    short_desc: 'Commercial-grade heavy bags in 3ft–5ft. Custom branding embossed or printed on all sides.',
    long_desc: 'Commercial-grade hanging heavy bag in 3ft, 4ft, and 5ft versions. Shredded leather and sand fill. Reinforced leather outer shell with heavy-duty chain. Full custom logo and colour branding via embossing or screen printing.',
    materials: ['Leather Outer Shell','Shredded Leather & Sand Fill','Heavy-duty Chain'],
    sizes: ['3ft (25kg)','4ft (35kg)','5ft (45kg)'],
    colors: ['Black/Red','Royal Blue'],
    weight_options: [],
    moq: 10, lead_time_days: 40,
    is_oem: false, is_private_label: false, is_wholesale: true, is_custom: true,
    image_url: '/heavy-bag-shotric.png',
    gallery_urls: ['/heavy-bag-shotric.png','/heavy-bag-blue.png'],
    is_featured: false, sort_order: 6,
  },
  {
    art_number: 'SI-SHG-001', name: 'Muay Thai Shin Guards', slug: 'shin-guards',
    category: 'combat-sports', subcategory: 'shin-guards',
    tags: ['oem','muay-thai','mma','custom','kickboxing'],
    short_desc: 'Full-length shin and instep protection for Muay Thai, kickboxing and MMA. 4 colour options.',
    long_desc: 'Full-length shin and instep guards for Muay Thai, Kickboxing, and MMA. Anatomical pre-curved design with EVA foam core and genuine leather shell. Double velcro closure. Available in 4 colour options with OEM logo and custom packaging.',
    materials: ['Genuine Leather','EVA Foam','Double Velcro Closure'],
    sizes: ['S','M','L','XL'],
    colors: ['Black/Red','Bold Red','Royal Blue','Gold/Black'],
    weight_options: [],
    moq: 25, lead_time_days: 35,
    is_oem: true, is_private_label: true, is_wholesale: false, is_custom: true,
    image_url: '/shin-guards-shotric.png',
    gallery_urls: ['/shin-guards-shotric.png','/shin-guards-red.png','/shin-guards-blue.png','/shin-guards-gold.png'],
    is_featured: false, sort_order: 7,
  },
  {
    art_number: 'SI-TS-001', name: 'Custom Tracksuit Set', slug: 'tracksuits',
    category: 'apparel', subcategory: 'tracksuits',
    tags: ['full-custom','sublimation','private-label','team-kit','oem','bestseller'],
    short_desc: 'Premium polyester tracksuit — jacket and pants. Sublimation or embroidery. Any colour, any design.',
    long_desc: 'Complete combat sports tracksuit set — full-zip jacket and matching jogger pants. 100% premium polyester with moisture-wicking performance fabric. Full sublimation printing allows any colour and design. Embroidery also available. 5 colour options + unlimited custom. Ideal for gym teams, fight camps, and private label sportswear brands.',
    materials: ['100% Polyester','Moisture-wicking Fabric','YKK Zip','Elastic Waistband'],
    sizes: ['XS','S','M','L','XL','2XL','3XL','4XL'],
    colors: ['Black/Red','Royal Blue','Bold Red','White/Navy','Gold/Black','Custom (Any Color)'],
    weight_options: [],
    moq: 50, lead_time_days: 30,
    is_oem: true, is_private_label: true, is_wholesale: true, is_custom: true,
    image_url: '/tracksuit-shotric.png',
    gallery_urls: ['/tracksuit-shotric.png','/tracksuit-blue.png','/tracksuit-red.png','/tracksuit-white.png','/tracksuit-gold.png'],
    is_featured: true, sort_order: 8,
  },
  {
    art_number: 'SI-HD-001', name: 'Heavyweight Boxing Hoodie', slug: 'hoodie',
    category: 'apparel', subcategory: 'hoodies',
    tags: ['private-label','embroidery','custom-colour','heavyweight'],
    short_desc: '380gsm fleece boxing hoodie. Custom embroidery or print on chest, back and sleeves.',
    long_desc: 'Premium 380gsm cotton-fleece combat sports hoodie with kangaroo front pocket, double-lined hood, and reinforced seams. 3 colour options. Custom branding via embroidery, screen printing, or DTG. Custom colour, fit, and retail packaging for private label brands.',
    materials: ['380gsm Cotton Fleece','Polyester Lining','Ribbed Cuffs & Hem'],
    sizes: ['S','M','L','XL','2XL','3XL'],
    colors: ['Black/Red','Bold Red','Royal Blue'],
    weight_options: [],
    moq: 50, lead_time_days: 28,
    is_oem: false, is_private_label: true, is_wholesale: false, is_custom: true,
    image_url: '/hoodie-shotric.png',
    gallery_urls: ['/hoodie-shotric.png','/hoodie-red.png','/hoodie-blue.png'],
    is_featured: false, sort_order: 9,
  },
  {
    art_number: 'SI-RG-001', name: 'Compression Rash Guard', slug: 'rash-guard',
    category: 'apparel', subcategory: 'compression-wear',
    tags: ['oem','sublimation','mma','bjj','compression'],
    short_desc: '4-way stretch compression rash guard. Full sublimation print. Anti-microbial, moisture-wicking.',
    long_desc: 'High-performance long sleeve compression rash guard — 88% polyester / 12% spandex 4-way stretch. Flatlock stitching. Anti-microbial and moisture-wicking. UPF 50+. Full sublimation printing for any team or brand graphic. 3 colour options.',
    materials: ['88% Polyester','12% Spandex','4-way Stretch','Flatlock Stitching'],
    sizes: ['XS','S','M','L','XL','2XL'],
    colors: ['Black/Red','Royal Blue','Bold Red','Custom (Full Sublimation)'],
    weight_options: [],
    moq: 50, lead_time_days: 28,
    is_oem: true, is_private_label: true, is_wholesale: false, is_custom: true,
    image_url: '/rash-guard-shotric.png',
    gallery_urls: ['/rash-guard-shotric.png','/rash-guard-blue.png','/rash-guard-red.png'],
    is_featured: false, sort_order: 10,
  },
  {
    art_number: 'SI-FS-001', name: 'MMA Fight Shorts', slug: 'fight-shorts',
    category: 'apparel', subcategory: 'fight-shorts',
    tags: ['full-custom','mma','boxing','sublimation','wholesale'],
    short_desc: 'Lightweight MMA fight shorts with 4-way stretch. Full sublimation. Custom logo, name and flag prints.',
    long_desc: 'Professional MMA fight shorts — 4-way stretch satin/polyester blend with split side panels for unrestricted kicking range. Elastic waistband with velcro fly closure. Full sublimation print — custom logo, fighter name, country flag, and sponsor branding. 3 colour options.',
    materials: ['Polyester / Satin Blend','4-way Stretch','Elastic Waistband','Velcro Fly'],
    sizes: ['XS','S','M','L','XL','2XL','3XL'],
    colors: ['Black/Red','Royal Blue','Gold/Black','Custom (Any Color)'],
    weight_options: [],
    moq: 50, lead_time_days: 28,
    is_oem: true, is_private_label: true, is_wholesale: true, is_custom: true,
    image_url: '/fight-shorts-shotric.png',
    gallery_urls: ['/fight-shorts-shotric.png','/fight-shorts-blue.png','/fight-shorts-gold.png'],
    is_featured: true, sort_order: 11,
  },
];

async function seed() {
  console.log('🚀 Connecting to Supabase...');

  // Clear existing products
  const { error: delErr } = await supabase.from('products').delete().neq('id', 0);
  if (delErr) {
    console.error('❌ Delete error:', delErr.message);
    console.log('ℹ️  This may mean the table doesn\'t exist yet. Please run supabase-schema.sql first.');
    process.exit(1);
  }
  console.log('🗑️  Cleared existing products');

  // Insert all products
  const { data, error } = await supabase.from('products').insert(PRODUCTS).select();
  if (error) {
    console.error('❌ Insert error:', error.message);
    process.exit(1);
  }

  console.log(`\n✅ Successfully inserted ${data.length} products!\n`);
  data.forEach(p => console.log(`   [${p.art_number}] ${p.name} — ${p.gallery_urls.length} images`));
  console.log('\n🎉 Done! Your Supabase products table is fully populated.');
}

seed();
