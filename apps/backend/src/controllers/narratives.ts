import { Request, Response } from "express";

import { prisma } from "../prisma";

export const getAllNarratives = async (_: Request, res: Response) => {
  const narratives = await prisma.narrative.findMany({
    orderBy: { name: "asc" },
  });
  res.json(narratives);
};

export const createNarrative = async (req: Request, res: Response) => {
  const data = req.body;
  const created = await prisma.narrative.create({ data });
  res.status(201).json(created);
};

export const updateNarrative = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await prisma.narrative.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
};

export const deleteNarrative = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.narrative.delete({ where: { id } });
  res.status(204).end();
};
