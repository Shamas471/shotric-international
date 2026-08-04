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
    minify: "esbuild",   /* esbuild is built-in, no extra install needed */
    cssMinify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  }
});
