import express from "express";
import {
  createNarrative,
  deleteNarrative,
  getAllNarratives,
  updateNarrative,
} from "../controllers/narratives";
import { authenticateToken } from "../middleware/auth";

const narrativesRoutes = express.Router();

narrativesRoutes.get("/", getAllNarratives);
narrativesRoutes.post("/", authenticateToken, createNarrative);
narrativesRoutes.put("/:id", authenticateToken, updateNarrative);
narrativesRoutes.delete("/:id", authenticateToken, deleteNarrative);

export default narrativesRoutes;
