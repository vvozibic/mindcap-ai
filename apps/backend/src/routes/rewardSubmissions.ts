import { Router } from "express";
import {
  createSubmission,
  getSubmissions,
  updateSubmissionStatus,
} from "../controllers/rewardSumbissions";

const rewardSumbissionsRoutes = Router();

rewardSumbissionsRoutes.post("/", createSubmission);
rewardSumbissionsRoutes.get("/", getSubmissions);
rewardSumbissionsRoutes.patch("/:id", updateSubmissionStatus);

export { rewardSumbissionsRoutes };
