import express from 'express'
import {
  getAllMentions,
  createMention,
  updateMention,
  deleteMention,
} from '../controllers/mentions'
import { authenticateAdmin } from '../middleware/auth'

export const mentionRoutes = express.Router()

mentionRoutes.get('/', getAllMentions)
mentionRoutes.post('/', createMention)
mentionRoutes.put('/:id', authenticateAdmin, updateMention)
mentionRoutes.delete('/:id', authenticateAdmin, deleteMention)
