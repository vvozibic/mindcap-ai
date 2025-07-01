import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { enrichInfluencer } from "../components/influencers/enrichInfluencer";
const prisma = new PrismaClient();

export const getInfluencers = async (_req: Request, res: Response) => {
  const influencers = await prisma.influencer.findMany({
    select: {
      id: true,
      name: true,
      badges: true,
      username: true,
      avatarUrl: true,
      platform: true,
      followingsNumeric: true,
      followersCountNumeric: true,
      smartFollowers: true,
      tweetsCountNumeric: true,
      avgLikes: true,
      avgViews: true,
      engagementRate: true,
      kolScore: true,
      totalPosts: true,
      totalLikes: true,
      totalReplies: true,
      totalRetweets: true,
      totalViews: true,
      totalComments: true,
      twitterRegisterDate: true,
      expertise: true,
      bio: true,
      profileUrl: true,
      mindshare: true,
      pow: true,
      poi: true,
      poe: true,
      moneyScore: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      kolScore: "desc",
    },
  });
  res.json(influencers);
};

// export const getInfluencers = async (req: Request, res: Response) => {
//   const { limit, offset } = getPaginationParams(req);

//   const [items, total] = await prisma.$transaction([
//     prisma.influencer.findMany({
//       skip: offset,
//       take: limit,
//       orderBy: { followersCount: "desc" },
//     }),
//     prisma.influencer.count(),
//   ]);

//   res.json({
//     items,
//     meta: buildPaginationMeta(total, limit, offset),
//   });
// };

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

export const adminEnrichInfluencer = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    await enrichInfluencer(username);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to enrich influencer" });
  }
};
