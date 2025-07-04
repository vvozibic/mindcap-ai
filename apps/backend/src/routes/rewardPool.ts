import express from "express";
import {
  createRewardPool,
  deleteRewardPool,
  getAllRewardPools,
  getRewardPoolById,
  updateRewardPool,
} from "../controllers/rewardPool";

const router = express.Router();

router.get("/", getAllRewardPools);
router.get("/:id", getRewardPoolById);
router.post("/", createRewardPool);
router.put("/:id", updateRewardPool);
router.delete("/:id", deleteRewardPool);

export default router;
