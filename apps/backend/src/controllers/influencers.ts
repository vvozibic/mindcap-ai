import { Request, Response } from "express";
import { updateKOLByUsername } from "../components/kols/updateKOLByUsername";
import { getProfile } from "../external-api/protokols/methods/kols";
import { sendJson } from "../utils/sendJson";

import { prisma } from "../prisma";

// const recalculateMindshareForInfluencers = async () => {
//   const kols = await prisma.kOL.findMany({
//     select: {
//       id: true,
//       kolScore: true,
//       smartFollowers: true,
//       followersCountNumeric: true,
//     },
//   });

//   const totalScore = kols.reduce((sum, i) => sum + (i.kolScore || 0), 0);

//   // Простой батч по 10 штук
//   const batchSize = 10;

//   for (let i = 0; i < kols.length; i += batchSize) {
//     const batch = kols.slice(i, i + batchSize);
//     await Promise.all(
//       batch.map((i) => {
//         const score = i.kolScore || 0;
//         const mindshare =
//           totalScore > 0 ? +((score / totalScore) * 100).toFixed(2) : 0;

//         const smartFollowersPercent =
//           i.followersCountNumeric && i.followersCountNumeric > 0
//             ? +((i.smartFollowers / i.followersCountNumeric) * 100).toFixed(2)
//             : 0;

//         return prisma.kOL.update({
//           where: { id: i.id },
//           data: { mindshare, smartFollowersPercent },
//         });
//       })
//     );
//   }
// };

export const getInfluencers = async (_req: Request, res: Response) => {
  const kols = await prisma.kOL.findMany({
    where: {
      kolScore: {
        gte: 0,
      },
      hidden: false,
    },
    orderBy: {
      kolScore: "desc",
    },
  });

  sendJson(res, kols);
};

export const searchProtokolsByUsername = async (
  req: Request,
  res: Response
) => {
  const { twitterUsername } = req.params;

  console.log(twitterUsername);

  const data = await getProfile(twitterUsername);

  res.status(200).json(data);
};

const allowedSortFields = {
  mindoMetric: `SUM(kp."mindoMetric")`,
  proofOfWork: `SUM(kp."proofOfWork")`,
  qualityScore: `SUM(kp."qualityScore")`,
  totalPosts: `SUM(kp."totalPosts")`,
  totalComments: `SUM(kp."totalComments")`,
  kolScore: `k."kolScore"`,
  engagementRate: `k."engagementRate"`,
  smartFollowersCount: `k."smartFollowersCount"`,
  twitterFollowersCount: `k."twitterFollowersCount"`,
  totalAccountPosts: `k."totalAccountPosts"`,
} as const;

type SortField = keyof typeof allowedSortFields;

export const getPaginatedInfluencers = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const page = parseInt(req.query.page as string) || 1;
  const skip = (page - 1) * limit;

  const sortField = (req.query.sortField as string) || "mindoMetric";
  const sortDirection = req.query.sortDirection === "asc" ? "ASC" : "DESC";

  const sortExpr = allowedSortFields[sortField as SortField];
  if (!sortExpr) {
    return res.status(400).json({ error: `Invalid sortField: ${sortField}` });
  }

  const data = await prisma.$queryRawUnsafe<any[]>(
    `
    SELECT
    k.id,
    k."hidden",
    k."twitterId",
    k."twitterUsername",
    k."twitterDisplayName",
    k."twitterAvatarUrl",
    k."twitterDescription",
    k."twitterDescriptionLink",
    k."twitterFollowersCount",
    k."twitterFollowingCount",
    k."twitterIsVerified",
    k."twitterGoldBadge",
    k."twitterLang",
    k."twitterCreatedAt",

    -- main metrics
    k."kolScore",
    k."kolScorePercentFromTotal",
    k."smartFollowersCount",
    k."threadsCount",
    k."engagementRate",
    k."smartEngagement",

    -- average
    k."avgViews",
    k."avgLikes",

    -- total
    k."totalPosts",
    k."totalViews",
    k."totalInteractions",

    -- total organic
    k."totalOrganicPosts",
    k."totalOrganicViews",
    k."totalOrganicInteractions",

    -- total account
    k."totalAccountPosts",
    k."totalAccountViews",
    k."totalAccountInteractions",
    k."totalAccountComments",
    k."totalAccountLikes",
    k."totalAccountRetweets",
    k."totalAccountReplies",

    -- change metrics
    k."totalPostsChange",
    k."totalInteractionsChange",
    k."totalViewsChange",
    k."followersChange",
    k."smartEngagementChange",
    
    SUM(kp."mindoMetric") AS "mindoMetric",
    SUM(kp."proofOfWork") AS "proofOfWork",
    SUM(kp."qualityScore") AS "qualityScore",
    SUM(kp."totalPosts") AS "totalPosts",
    SUM(kp."totalComments") AS "totalComments"
    FROM "KOL" k
    JOIN "KOLToProject" kp ON kp."kolId" = k.id
    WHERE k."kolScore" > 0 AND k."hidden" = false AND k."isAlsoProject" = false AND kp."mindoMetric" > 0
    GROUP BY k.id
    ORDER BY ${sortExpr} ${sortDirection}
    LIMIT $1 OFFSET $2
  `,
    limit,
    skip
  );

  const totalResult = await prisma.$queryRawUnsafe<{ count: number }[]>(`
    SELECT COUNT(*)::int AS count
    FROM (
      SELECT k.id
      FROM "KOL" k
      JOIN "KOLToProject" kp ON kp."kolId" = k.id
      WHERE k."kolScore" > 0 AND k."hidden" = false
      GROUP BY k.id
    ) sub;
  `);

  const total = totalResult[0]?.count ?? 0;

  sendJson(res, {
    data,
    total,
    page,
    limit,
  });
};

export const getInfluencerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proj = await prisma.kOL.findUnique({ where: { id } });
  if (!proj) return res.status(404).json({ error: "Not found" });

  sendJson(res, proj);
};

export const getInfluencerByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const kol = await prisma.kOL.findUnique({
    where: { twitterUsername: username },
  });
  if (!kol) {
    const updatedKOL = await updateKOLByUsername(username);

    if (!updatedKOL) {
      return res.status(404).json({ error: "Not found" });
    } else {
      sendJson(res, updatedKOL);
    }
  }
  sendJson(res, kol);
};

export const createInfluencer = async (req: Request, res: Response) => {
  const kol = await prisma.kOL.create({ data: req.body });
  // await recalculateMindshareForInfluencers();
  res.status(201).json(kol);
};

export const updateInfluencer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await prisma.kOL.update({
    where: { id },
    data: req.body,
  });
  // await recalculateMindshareForInfluencers();

  sendJson(res, updated);
};

export const deleteInfluencer = async (req: Request, res: Response) => {
  const { id } = req.params;

  // await prisma.mention.deleteMany({
  //   where: { projectId: id },
  // });

  await prisma.kOL.delete({
    where: { id },
  });

  // await recalculateMindshareForInfluencers();

  res.status(200).json({ message: "Project and related mentions deleted" });
};

export const adminEnrichInfluencer = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    await updateKOLByUsername(username);
    // await recalculateMindshareForInfluencers();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to enrich kol" });
  }
};
