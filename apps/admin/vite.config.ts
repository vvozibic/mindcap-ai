import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/admin/" : "/",
  plugins: [react()],
  server: {
    port: 5174,
    allowedHosts: true,
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
}));
