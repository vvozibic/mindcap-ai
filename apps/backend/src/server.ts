import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { authenticateAdmin } from "./middleware/auth";
import { authRoutes } from "./routes/auth";
import { influencerRoutes } from "./routes/influencers";
import { mentionRoutes } from "./routes/mentions";
import { projectRoutes } from "./routes/projects";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authenticateAdmin);

app.use("/api/auth", authRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/mentions", mentionRoutes);

const PORT = process.env.PORT || 3000;

// Статичные билды
app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/admin", express.static(path.join(__dirname, "../admin")));

// fallback для SPA
app.get("*", (req, res) => {
  if (req.path.startsWith("/admin")) {
    res.sendFile(path.join(__dirname, "../admin/index.html"));
  } else {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
