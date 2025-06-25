import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  // server: {
  //   port: 5173,
  //   allowedHosts: true,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3001",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
