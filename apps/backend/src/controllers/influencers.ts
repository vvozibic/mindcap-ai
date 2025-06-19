import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllInfluencers = async (req, res) => {
  const data = await prisma.influencer.findMany()
  res.json(data)
}

export const createInfluencer = async (req, res) => {
  const data = await prisma.influencer.create({ data: req.body })
  res.status(201).json(data)
}

export const updateInfluencer = async (req, res) => {
  const { id } = req.params
  const data = await prisma.influencer.update({
    where: { id: parseInt(id) },
    data: req.body,
  })
  res.json(data)
}

export const deleteInfluencer = async (req, res) => {
  const { id } = req.params
  await prisma.influencer.delete({ where: { id: parseInt(id) } })
  res.status(204).end()
}
