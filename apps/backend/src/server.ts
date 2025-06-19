// src/server.ts
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";
import { authRoutes } from "./routes/auth";
import { influencerRoutes } from "./routes/influencers";
import { mentionRoutes } from "./routes/mentions";
import { projectRoutes } from "./routes/projects";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    "/admin",
    createProxyMiddleware({
      target: "http://localhost:5174",
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
  app.use("/admin", express.static(path.join(__dirname, "../admin")));
  app.use("/", express.static(path.join(__dirname, "../public")));

  app.get("/admin/*", (_, res) => {
    res.sendFile(path.join(__dirname, "../admin/index.html"));
  });

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
