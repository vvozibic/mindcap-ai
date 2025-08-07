import { Router } from "express";
import {
  createProtokolsProject,
  getAllProjects,
  getProtokolsProjectById,
  updateProtokolsProject,
} from "../controllers/projects";
import { requireAuth } from "../middleware/requireAuth";

const adminRoleAdminRoutes = Router();

adminRoleAdminRoutes.use(requireAuth("ADMIN"));

adminRoleAdminRoutes.get("/projects", getAllProjects);
adminRoleAdminRoutes.get("/projects/:id", getProtokolsProjectById);
adminRoleAdminRoutes.post("/projects", createProtokolsProject);
adminRoleAdminRoutes.put("/projects/:id", updateProtokolsProject);

const adminRoleProjectRoutes = Router();

adminRoleProjectRoutes.use(requireAuth("PROJECT"));

adminRoleProjectRoutes.get("/projects", getAllProjects);
adminRoleProjectRoutes.get("/projects/:id", getProtokolsProjectById);
adminRoleProjectRoutes.post("/projects", createProtokolsProject);
adminRoleProjectRoutes.put("/projects/:id", updateProtokolsProject);

export { adminRoleAdminRoutes, adminRoleProjectRoutes };
