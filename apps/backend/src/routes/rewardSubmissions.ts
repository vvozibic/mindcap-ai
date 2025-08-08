import { Router } from "express";
import {
  createSubmission,
  getSubmissionById,
  getSubmissions,
  updateSubmissionStatus,
} from "../controllers/rewardSumbissions";

const rewardSumbissionsRoutes = Router();

rewardSumbissionsRoutes.post("/", createSubmission);
rewardSumbissionsRoutes.get("/", getSubmissions);
rewardSumbissionsRoutes.get("/:id", getSubmissionById);
rewardSumbissionsRoutes.patch("/:id", updateSubmissionStatus);

export { rewardSumbissionsRoutes };
