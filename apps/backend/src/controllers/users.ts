import { Request, Response } from "express";

import { prisma } from "../prisma";

export const getAllUsers = async (_: Request, res: Response) => {
  const projects = await prisma.user.findMany();
  res.json(projects);
};
