import express from 'express'
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects'
import { authenticateAdmin } from '../middleware/auth'

export const projectRoutes = express.Router()

projectRoutes.get('/', getAllProjects)
projectRoutes.post('/', createProject)
projectRoutes.put('/:id', authenticateAdmin, updateProject)
projectRoutes.delete('/:id', authenticateAdmin, deleteProject)
