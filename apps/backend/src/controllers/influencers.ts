import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { enrichInfluencer } from "../components/influencers/enrichInfluencer";

const prisma = new PrismaClient();

const recalculateMindshareForInfluencers = async () => {
  const influencers = await prisma.influencer.findMany({
    select: {
      id: true,
      kolScore: true,
      smartFollowers: true,
      followersCountNumeric: true,
    },
  });

  const totalScore = influencers.reduce((sum, i) => sum + (i.kolScore || 0), 0);

  // Простой батч по 10 штук
  const batchSize = 10;

  for (let i = 0; i < influencers.length; i += batchSize) {
    const batch = influencers.slice(i, i + batchSize);
    await Promise.all(
      batch.map((i) => {
        const score = i.kolScore || 0;
        const mindsharePercent =
          totalScore > 0 ? +((score / totalScore) * 100).toFixed(2) : 0;

        const smartFollowersPercent =
          i.followersCountNumeric && i.followersCountNumeric > 0
            ? +((i.smartFollowers / i.followersCountNumeric) * 100).toFixed(2)
            : 0;

        return prisma.influencer.update({
          where: { id: i.id },
          data: { mindsharePercent, smartFollowersPercent },
        });
      })
    );
  }
};

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
      mindsharePercent: true,
      smartFollowersPercent: true,
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

export const getInfluencerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proj = await prisma.influencer.findUnique({ where: { id } });
  if (!proj) return res.status(404).json({ error: "Not found" });
  res.json(proj);
};

export const getInfluencerByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const proj = await prisma.influencer.findUnique({ where: { username } });
  if (!proj) return res.status(404).json({ error: "Not found" });
  res.json(proj);
};

export const createInfluencer = async (req: Request, res: Response) => {
  const influencer = await prisma.influencer.create({ data: req.body });
  await recalculateMindshareForInfluencers();
  res.status(201).json(influencer);
};

export const updateInfluencer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await prisma.influencer.update({
    where: { id },
    data: req.body,
  });
  await recalculateMindshareForInfluencers();
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

  await recalculateMindshareForInfluencers();

  res.status(200).json({ message: "Project and related mentions deleted" });
};

export const adminEnrichInfluencer = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    await enrichInfluencer(username);
    await recalculateMindshareForInfluencers();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to enrich influencer" });
  }
};
