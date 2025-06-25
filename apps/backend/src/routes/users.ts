import express from "express";
import { getAllUsers } from "../controllers/users";

export const usersRoutes = express.Router();

usersRoutes.get("/", getAllUsers);
