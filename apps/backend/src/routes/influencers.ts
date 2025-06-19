import express from 'express'
import {
  getAllInfluencers,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
} from '../controllers/influencers'
import { authenticateAdmin } from '../middleware/auth'

export const influencerRoutes = express.Router()

influencerRoutes.get('/', getAllInfluencers)
influencerRoutes.post('/', createInfluencer)
influencerRoutes.put('/:id', authenticateAdmin, updateInfluencer)
influencerRoutes.delete('/:id', authenticateAdmin, deleteInfluencer)
