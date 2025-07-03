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
  getProject,
  getProtokolsProjectById,
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
protokolsProjectRoutes.get("/:id", getProtokolsProjectById);
protokolsProjectRoutes.post("/", createProtokolsProject);
protokolsProjectRoutes.put("/:id", updateProtokolsProject);
protokolsProjectRoutes.delete("/:id", deleteProtokolsProject);
