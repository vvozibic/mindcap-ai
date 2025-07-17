import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { enrichInfluencer } from "../components/kols/enrichInfluencer";

const prisma = new PrismaClient();

const recalculateMindshareForInfluencers = async () => {
  const kols = await prisma.kol.findMany({
    select: {
      id: true,
      kolScore: true,
      smartFollowers: true,
      followersCountNumeric: true,
    },
  });

  const totalScore = kols.reduce((sum, i) => sum + (i.kolScore || 0), 0);

  // Простой батч по 10 штук
  const batchSize = 10;

  for (let i = 0; i < kols.length; i += batchSize) {
    const batch = kols.slice(i, i + batchSize);
    await Promise.all(
      batch.map((i) => {
        const score = i.kolScore || 0;
        const mindsharePercent =
          totalScore > 0 ? +((score / totalScore) * 100).toFixed(2) : 0;

        const smartFollowersPercent =
          i.followersCountNumeric && i.followersCountNumeric > 0
            ? +((i.smartFollowers / i.followersCountNumeric) * 100).toFixed(2)
            : 0;

        return prisma.kol.update({
          where: { id: i.id },
          data: { mindsharePercent, smartFollowersPercent },
        });
      })
    );
  }
};

export const getInfluencers = async (_req: Request, res: Response) => {
  const kols = await prisma.kol.findMany({
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
      mindshare: true,
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
  res.json(kols);
};

export const getPaginatedInfluencers = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const page = parseInt(req.query.page as string) || 1;
  const skip = (page - 1) * limit;

  const sortField = (req.query.sortField as string) || "kolScore";
  const sortDirection =
    (req.query.sortDirection as string) === "asc" ? "asc" : "desc";

  // Поддерживаем только допустимые поля сортировки
  const allowedSortFields = [
    "followersCountNumeric",
    "mindsharePercent",
    "pow",
    "poi",
    "poe",
    "smartFollowers",
    "engagementRate",
    "avgLikes",
    "tweetsCountNumeric",
    "kolScore",
  ] as const;

  const safeSortField = allowedSortFields.includes(sortField as any)
    ? (sortField as (typeof allowedSortFields)[number])
    : "kolScore";

  const [total, data] = await Promise.all([
    prisma.kol.count(),
    prisma.kol.findMany({
      skip,
      take: limit,
      orderBy: {
        [safeSortField]: sortDirection,
      },
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
        mindshare: true,
        smartFollowersPercent: true,
        pow: true,
        poi: true,
        poe: true,
        moneyScore: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
  ]);

  res.json({
    data,
    total,
    page,
    limit,
  });
};

export const getInfluencerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proj = await prisma.kol.findUnique({ where: { id } });
  if (!proj) return res.status(404).json({ error: "Not found" });
  res.json(proj);
};

export const getInfluencerByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const proj = await prisma.kol.findUnique({ where: { username } });
  if (!proj) return res.status(404).json({ error: "Not found" });
  res.json(proj);
};

export const createInfluencer = async (req: Request, res: Response) => {
  const kol = await prisma.kol.create({ data: req.body });
  await recalculateMindshareForInfluencers();
  res.status(201).json(kol);
};

export const updateInfluencer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await prisma.kol.update({
    where: { id },
    data: req.body,
  });
  await recalculateMindshareForInfluencers();
  res.json(updated);
};

export const deleteInfluencer = async (req: Request, res: Response) => {
  const { id } = req.params;

  // await prisma.mention.deleteMany({
  //   where: { projectId: id },
  // });

  await prisma.kol.delete({
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
    res.status(500).json({ error: "Failed to enrich kol" });
  }
};
