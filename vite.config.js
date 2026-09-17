import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        main:          "index.html",
        oem:           "oem.html",
        about:         "about.html",
        contact:       "contact.html",
        "how-to-order":"how-to-order.html",
        admin:         "admin.html",
      }
    },
    minify: "esbuild",
    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  }
});
