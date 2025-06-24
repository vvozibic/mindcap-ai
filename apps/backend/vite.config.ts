import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    target: "node20",
    outDir: "dist",
    rollupOptions: {
      external: [
        "express",
        "cors",
        "dotenv",
        "jsonwebtoken",
        "bcryptjs",
        "@prisma/client",
      ],
    },
  },
});
