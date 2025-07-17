// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// export const getAllMentions = async (req, res) => {
//   const data = await prisma.mention.findMany({
//     include: { influencer: true, project: true },
//   });
//   res.json(data);
// };

// export const createMention = async (req, res) => {
//   const data = await prisma.mention.create({ data: req.body });
//   res.status(201).json(data);
// };

// export const updateMention = async (req, res) => {
//   const { id } = req.params;
//   const data = await prisma.mention.update({
//     // @ts-ignore
//     where: { id: parseInt(id) },
//     data: req.body,
//   });
//   res.json(data);
// };

// export const deleteMention = async (req, res) => {
//   const { id } = req.params;
//   // @ts-ignore
//   await prisma.mention.delete({ where: { id: parseInt(id) } });
//   res.status(204).end();
// };
