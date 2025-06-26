import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getInfluencers = async (_req: Request, res: Response) => {
  const influencers = await prisma.influencer.findMany();
  res.json(influencers);
};

export const getInfluencer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proj = await prisma.influencer.findUnique({ where: { id } });
  if (!proj) return res.status(404).json({ error: "Not found" });
  res.json(proj);
};

export const createInfluencer = async (req: Request, res: Response) => {
  const influencer = await prisma.influencer.create({ data: req.body });
  res.status(201).json(influencer);
};

export const updateInfluencer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await prisma.influencer.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
};

export const deleteInfluencer = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.mention.deleteMany({
    where: { projectId: id },
  });

  await prisma.influencer.delete({
    where: { id },
  });

  res.status(200).json({ message: "Project and related mentions deleted" });
};
