import express from "express";
import {
  adminEnrichInfluencer,
  createInfluencer,
  deleteInfluencer,
  getInfluencerById,
  getInfluencerByUsername,
  getInfluencers,
  getKolById,
  getPaginatedInfluencers,
  searchProtokolsByUsername,
  updateInfluencer,
} from "../controllers/influencers";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.get("/", getInfluencers);
router.get("/search-protokols/:twitterUsername", searchProtokolsByUsername);
router.get("/paginate", getPaginatedInfluencers);
router.get("/:id", getInfluencerById);
router.get("/kol/:id", getKolById);
router.get("/user/:username", getInfluencerByUsername);
router.post("/", createInfluencer);
router.put("/:id", updateInfluencer);
router.delete("/:id", deleteInfluencer);
router.post("/enrich", authenticateToken, adminEnrichInfluencer);

export { router as influencerRoutes };
