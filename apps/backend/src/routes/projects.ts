import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getFeaturedProjects,
  getProject,
  updateProject,
} from "../controllers/projects";

export const projectRoutes = express.Router();

projectRoutes.get("/", getAllProjects);
projectRoutes.get("/featured", getFeaturedProjects);
projectRoutes.get("/:id", getProject);
projectRoutes.post("/", createProject);
projectRoutes.put("/:id", updateProject);
projectRoutes.delete("/:id", deleteProject);
