import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// ✅ Добавление кошелька (по username)
export const addWallet = async (req: Request, res: Response) => {
  const { address, chain, username, label, symbol, explorer } = req.body;

  if (!username) return res.status(400).json({ error: "Missing username" });
  if (!address || !chain)
    return res.status(400).json({ error: "Missing wallet data" });

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const wallet = await prisma.wallet.upsert({
      where: { address },
      update: {
        userId: user.id,
        chain,
        label,
        symbol,
        explorer,
        verified: true,
      },
      create: {
        address,
        userId: user.id,
        chain,
        label,
        symbol,
        explorer,
        verified: true,
      },
    });

    if (!user.primaryWalletId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { primaryWalletId: wallet.id },
      });
    }

    res.json(wallet);
  } catch (err) {
    console.error("❌ addWallet error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Удаление кошелька (по username + address)
export const removeWallet = async (req: Request, res: Response) => {
  const { address, username } = req.body;

  if (!username) return res.status(400).json({ error: "Missing username" });

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const wallet = await prisma.wallet.findUnique({ where: { address } });
    if (!wallet || wallet.userId !== user.id) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    await prisma.wallet.delete({ where: { address } });

    // Сбрасываем primaryWallet, если это он
    if (user.primaryWalletId === wallet.id) {
      await prisma.user.update({
        where: { id: user.id },
        data: { primaryWalletId: null },
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ removeWallet error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
