import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// import { parseLinks, serializeLinks } from "../utils/links";

const prisma = new PrismaClient();

export const getAllUsers = async (_: Request, res: Response) => {
  const projects = await prisma.user.findMany();
  res.json(projects);
};
