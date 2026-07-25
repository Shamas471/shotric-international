import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        main:  "index.html",
        admin: "admin.html",
      }
    },
    /* Minify + chunk splitting for faster loading */
    minify: "terser",
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true }
    },
    chunkSizeWarningLimit: 1000,
    cssMinify: true,
    assetsInlineLimit: 4096, /* inline small assets < 4KB */
  },
  /* Preload key assets */
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000"
    }
  }
});
