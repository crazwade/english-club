import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://192.168.86.52",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // "/api": {
      //   target: "http://192.168.86.229:3000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
