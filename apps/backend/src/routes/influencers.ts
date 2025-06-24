import express from "express";
import {
  createInfluencer,
  deleteInfluencer,
  getInfluencer,
  getInfluencers,
  updateInfluencer,
} from "../controllers/influencers";

const router = express.Router();

router.get("/", getInfluencers);
router.get("/:id", getInfluencer);
router.post("/", createInfluencer);
router.put("/:id", updateInfluencer);
router.delete("/:id", deleteInfluencer);

export { router as influencerRoutes };
