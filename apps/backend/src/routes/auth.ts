import express from 'express'
import { login } from '../controllers/auth'
export const authRoutes = express.Router()
authRoutes.post('/login', login)
