import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { authRoutes } from "./routes/auth";
import { influencerRoutes } from "./routes/influencers";
import narrativesRoutes from "./routes/narratives";
import { protokolsProjectRoutes } from "./routes/projects";
import rewardPoolRoutes from "./routes/rewardPool";
import { rewardSumbissionsRoutes } from "./routes/rewardSubmissions";
import trackRoute from "./routes/track";
import { usersRoutes } from "./routes/users";

import "./cron/index"; // Import cron jobs to ensure they run
import walletRoutes from "./routes/wallets";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cookieParser());

const isDev = process.env.NODE_ENV !== "production";

app.use("/api/auth", authRoutes);

app.use("/api/influencers", influencerRoutes);
app.use("/api/projects", protokolsProjectRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/narratives", narrativesRoutes);
app.use("/api/reward-pools", rewardPoolRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/submissions", rewardSumbissionsRoutes);
app.use("/api/track", trackRoute);

const ALLOWED_ORIGINS = ["mindoshare.ai", "mindoshare.up.railway.app"];

app.get("/config", (req, res) => {
  const host = req.headers.host;

  if (isDev) {
    return res.status(200).json({
      walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    });
  }

  if (!host || !ALLOWED_ORIGINS.includes(host)) {
    console.warn(`❌ Unauthorized config request from ${host}`);
    return res.status(403).json({ error: "Forbidden" });
  }

  res.json({
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
  });
});

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

console.log("process.env.PORT =", process.env.PORT);
console.log("Resolved PORT =", PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on ${PORT}`);
});
