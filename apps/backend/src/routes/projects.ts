import express from "express";
import {
  createProject,
  createProtokolsProject,
  deleteProject,
  deleteProtokolsProject,
  getAllProjects,
  getAllProtokolsProjects,
  getFeaturedProjects,
  getFeaturedProtokolsProjects,
  getInfluencersByProject,
  getPaginatedProtokolsProjects,
  getProject,
  getProtokolsProjectById,
  getProtokolsProjectBySlug,
  updateProject,
  updateProtokolsProject,
} from "../controllers/projects";

export const projectRoutes = express.Router();

projectRoutes.get("/", getAllProjects);
projectRoutes.get("/featured", getFeaturedProjects);
projectRoutes.get("/:id", getProject);
projectRoutes.post("/", createProject);
projectRoutes.put("/:id", updateProject);
projectRoutes.delete("/:id", deleteProject);

export const protokolsProjectRoutes = express.Router();

protokolsProjectRoutes.get("/", getAllProtokolsProjects);
protokolsProjectRoutes.get("/featured", getFeaturedProtokolsProjects);
protokolsProjectRoutes.get("/paginate", getPaginatedProtokolsProjects);
protokolsProjectRoutes.get("/:projectId/influencers", getInfluencersByProject);
protokolsProjectRoutes.get("/:id", getProtokolsProjectById);
protokolsProjectRoutes.get("/slug/:twitterUsername", getProtokolsProjectBySlug);
protokolsProjectRoutes.post("/", createProtokolsProject);
protokolsProjectRoutes.put("/:id", updateProtokolsProject);
protokolsProjectRoutes.delete("/:id", deleteProtokolsProject);
