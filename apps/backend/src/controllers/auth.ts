import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.adminUser.findUnique({ where: { username } });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  // @ts-ignore

  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  res.json({ token });
};

export const loginWithEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    let user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email,
        },
      });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginWithTwitter = async (req: Request, res: Response) => {
  const { twitterHandle } = req.body;

  if (!twitterHandle) {
    return res.status(400).json({ error: "Twitter is required" });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { twitterHandle: twitterHandle },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          twitterHandle: twitterHandle,
        },
      });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const { user: userFromQuery } = req.query;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: String(userFromQuery) },
        { twitterHandle: String(userFromQuery) },
      ].filter(Boolean), // убираем undefined
    },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ user });
};
