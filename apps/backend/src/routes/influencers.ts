import express from "express";
import {
  adminEnrichInfluencer,
  createInfluencer,
  deleteInfluencer,
  getInfluencer,
  getInfluencers,
  updateInfluencer,
} from "../controllers/influencers";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.get("/", getInfluencers);
router.get("/:id", getInfluencer);
router.post("/", createInfluencer);
router.put("/:id", updateInfluencer);
router.delete("/:id", deleteInfluencer);
router.post("/enrich", authenticateToken, adminEnrichInfluencer);

export { router as influencerRoutes };
