import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/gdelt": {
        target: "https://api.gdeltproject.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gdelt/, ""),
      },
    },
  },
});