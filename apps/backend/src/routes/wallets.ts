import express from "express";
import { addWallet, removeWallet } from "../controllers/wallets";

const walletRoutes = express.Router();

walletRoutes.post("/add", addWallet);
walletRoutes.post("/remove", removeWallet);

export default walletRoutes;
