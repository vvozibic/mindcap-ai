import express from "express";
import {
  adminLogin,
  getMe,
  loginWithEmail,
  loginWithTwitter,
} from "../controllers/auth";
import { authenticateToken } from "../middleware/auth";

const authRoutes = express.Router();

authRoutes.post("/admin/login", adminLogin);

authRoutes.get("/admin/me", authenticateToken, (req, res) => {
  //@ts-ignore
  const user = req.user as { id: number; username: string; role: string };

  res.json({
    username: user.username,
    role: user.role,
  });
});

authRoutes.post("/login/email", loginWithEmail);
authRoutes.post("/login/twitter", loginWithTwitter);
authRoutes.get("/me", getMe);

export { authRoutes };
