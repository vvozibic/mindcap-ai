import express from "express";
import { login } from "../controllers/auth";
import { authenticateToken } from "../middleware/auth";

const authRoutes = express.Router();
authRoutes.post("/login", login);
console.log(authenticateToken);
authRoutes.get("/me", authenticateToken, (req, res) => {
  const user = req.user as { id: number; username: string; role: string };
  res.json({
    username: user.username,
    role: user.role,
  });
});

export { authRoutes };
