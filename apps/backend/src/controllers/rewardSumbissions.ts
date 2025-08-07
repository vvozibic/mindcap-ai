import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sendJson } from "../utils/sendJson";

const prisma = new PrismaClient();

export const createSubmission = async (req: Request, res: Response) => {
  const { rewardPoolId, kolId, contentUrl, notes } = req.body;

  if (!rewardPoolId || !kolId || !contentUrl) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const submission = await prisma.rewardSubmission.create({
    data: {
      rewardPoolId,
      kolId,
      contentUrl,
      notes,
    },
  });

  res.status(201).json(submission);
};

// GET /api/submissions
export const getSubmissions = async (req: Request, res: Response) => {
  const submissions = await prisma.rewardSubmission.findMany({
    include: {
      rewardPool: true,
      kol: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  sendJson(res, submissions);
};

// GET /api/submissions?projectId=...
export const getSubmissionsByProject = async (req: Request, res: Response) => {
  const { projectId } = req.query;

  if (!projectId || typeof projectId !== "string") {
    return res.status(400).json({ error: "Missing or invalid projectId" });
  }

  const submissions = await prisma.rewardSubmission.findMany({
    where: {
      rewardPool: {
        projectId,
      },
    },
    include: {
      rewardPool: true,
      kol: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(submissions);
};

// PATCH /api/submissions/:id
export const updateSubmissionStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const submission = await prisma.rewardSubmission.update({
    where: { id },
    data: { status },
  });

  res.json(submission);
};
