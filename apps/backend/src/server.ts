// src/server.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { authRoutes } from "./routes/auth";
import { influencerRoutes } from "./routes/influencers";
import { mentionRoutes } from "./routes/mentions";
import { projectRoutes } from "./routes/projects";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const isDev = process.env.NODE_ENV !== "production";

app.use("/api/auth", authRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/mentions", mentionRoutes);

if (isDev) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
    })
  );

  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
    })
  );
} else {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

const frontendPath = path.join(__dirname, "../../frontend/dist");
const indexHtmlPath = path.join(frontendPath, "index.html");

console.log("🚀 Environment:", process.env.NODE_ENV);
console.log("📁 Frontend dist path:", frontendPath);
console.log("📄 Checking index.html exists:", fs.existsSync(indexHtmlPath));

if (!fs.existsSync(indexHtmlPath)) {
  console.error("❌ index.html NOT FOUND");
}

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on ${PORT}`);
});
