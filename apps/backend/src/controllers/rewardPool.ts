import { Request, Response } from "express";

import { prisma } from "../prisma";

// GET /api/reward-pools
export const getAllRewardPools = async (_: Request, res: Response) => {
  const pools = await prisma.rewardPool.findMany({
    include: {
      project: {
        select: { id: true, twitterUsername: true },
      },
    },
    orderBy: { deadline: "asc" },
  });
  res.json(pools);
};

// GET /api/reward-pools/:id
export const getRewardPoolById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pool = await prisma.rewardPool.findUnique({
    where: { id },
    include: {
      project: {
        select: { id: true, twitterUsername: true },
      },
    },
  });
  if (!pool) return res.status(404).json({ error: "Not found" });
  res.json(pool);
};

// POST /api/reward-pools
export const createRewardPool = async (req: Request, res: Response) => {
  const {
    title,
    description,
    reward,
    rewardRate,
    rewardUnit,
    deadline,
    startDate,
    endDate,
    platforms,
    status,
    type,
    totalAmountUsd,
    paidOutUsd,
    campaignTargetViews,
    participantsCount,
    completedCount,
    requirements,
    projectId,
  } = req.body;

  const pool = await prisma.rewardPool.create({
    data: {
      title,
      description,
      reward,
      rewardRate,
      rewardUnit,
      deadline: deadline ? new Date(deadline) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      platforms,
      status,
      type,
      totalAmountUsd,
      paidOutUsd,
      campaignTargetViews,
      participantsCount,
      completedCount,
      requirements,
      project: {
        connect: { id: projectId },
      },
    },
    include: {
      project: {
        select: { id: true, twitterUsername: true },
      },
    },
  });

  res.status(201).json(pool);
};

// PUT /api/reward-pools/:id
export const updateRewardPool = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    reward,
    rewardRate,
    rewardUnit,
    deadline,
    startDate,
    endDate,
    platforms,
    status,
    type,
    totalAmountUsd,
    paidOutUsd,
    campaignTargetViews,
    participantsCount,
    completedCount,
    requirements,
    projectId,
  } = req.body;

  const updated = await prisma.rewardPool.update({
    where: { id },
    data: {
      title,
      description,
      reward,
      rewardRate,
      rewardUnit,
      deadline: deadline ? new Date(deadline) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      platforms,
      status,
      type,
      totalAmountUsd,
      paidOutUsd,
      campaignTargetViews,
      participantsCount,
      completedCount,
      requirements,
      project: {
        connect: { id: projectId },
      },
    },
    include: {
      project: {
        select: { id: true, twitterUsername: true },
      },
    },
  });

  res.json(updated);
};

// DELETE /api/reward-pools/:id
export const deleteRewardPool = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.rewardPool.delete({ where: { id } });
  res.status(204).end();
};
