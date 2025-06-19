import { PrismaClient } from "@prisma/client";
import { parseLinks, serializeLinks } from "../utils/links";

const prisma = new PrismaClient();

export const getAllProjects = async (req, res) => {
  const data = await prisma.project.findMany();
  const transformed = data.map((project) => ({
    ...project,
    links: parseLinks(project.links),
  }));
  res.json(transformed);
};

export const createProject = async (req, res) => {
  const { links, ...rest } = req.body;
  const data = await prisma.project.create({
    data: {
      ...rest,
      links: serializeLinks(links),
    },
  });
  res.status(201).json(data);
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { links, ...rest } = req.body;
  const data = await prisma.project.update({
    where: { id: parseInt(id) },
    data: {
      ...rest,
      links: serializeLinks(links),
    },
  });
  res.json(data);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  await prisma.project.delete({ where: { id: parseInt(id) } });
  res.status(204).end();
};
