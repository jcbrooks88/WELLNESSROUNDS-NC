import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import flowbiteReact from "flowbite-react/plugin/vite";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), flowbiteReact(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/graphql": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});