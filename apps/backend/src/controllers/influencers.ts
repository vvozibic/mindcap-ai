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
type SortField =
  | "mindoMetric"
  | "followers"
  | "kolScore"
  | "engagementRate"
  | "walletScore"
  | "qualityScore"
  | "proofOfWork"
  | "earnedPoints"
  | "smartFollowersCount";

const ALLOWED_SORT: Record<SortField, string> = {
  mindoMetric: `"mindoMetric"`,
  followers: `k."twitterFollowersCount"`,
  kolScore: `k."kolScore"`,
  engagementRate: `k."engagementRate"`,
  walletScore: `"walletScore"`,
  qualityScore: `"qualityScore"`,
  proofOfWork: `"proofOfWork"`,
  earnedPoints: `"earnedPoints"`,
  smartFollowersCount: `k."smartFollowersCount"`,
};

/**
 * GET /api/kols
 * Лёгкий список для таблицы
 *   query: limit, page, sortField, sortDirection
 */
export const getPaginatedInfluencers = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(
      parseInt(String(req.query.limit ?? "20"), 10) || 20,
      100
    );
    const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
    const skip = (page - 1) * limit;

    const sortField = (req.query.sortField as SortField) || "mindoMetric";
    const sortDirection = (
      String(req.query.sortDirection) === "asc" ? "ASC" : "DESC"
    ) as "ASC" | "DESC";

    const sortExpr = ALLOWED_SORT[sortField];
    if (!sortExpr) {
      return res
        .status(400)
        .json({ error: `Invalid sortField: ${req.query.sortField}` });
    }

    // Лёгкая агрегация из KOLToProject
    const data = await prisma.$queryRawUnsafe<any[]>(
      `
      WITH agg AS (
        SELECT
          kp."kolId",
          SUM(kp."mindoMetric")  AS "mindoMetric",
          SUM(kp."proofOfWork")  AS "proofOfWork",
          SUM(kp."qualityScore") AS "qualityScore"
        FROM "KOLToProject" kp
        WHERE kp."mindoMetric" > 0
        GROUP BY kp."kolId"
      )
      SELECT
        k.id,
        k."twitterDisplayName",
        k."twitterUsername",
        k."twitterAvatarUrl",
        k."twitterFollowersCount" AS "followers",
        k."smartFollowersCount",
        k."kolScore",
        k."engagementRate",

        a."mindoMetric",
        a."proofOfWork",
        a."qualityScore",

        COALESCE(u."earnedPoints", 0) AS "earnedPoints",
        COALESCE(w."rubyWalletScore", 0)
          + COALESCE(w."nomisWalletScore", 0) * 100 AS "walletScore",

        -- mindshare %
        k."kolScorePercentFromTotal"                               AS "mindsharePercent",
        TO_CHAR(COALESCE(k."kolScorePercentFromTotal", 0), 'FM999990D00') AS "mindsharePercentText",

        -- posting frequency (posts/day)
        -- days since account created; минимум 1 день чтобы не делить на 0
        GREATEST(
          CEIL(DATE_PART('day', NOW() - k."twitterCreatedAt")),
          1
        )                                                          AS "accountAgeDays",

        (COALESCE(k."totalPosts", 0)::float
          / GREATEST(DATE_PART('day', NOW() - k."twitterCreatedAt"), 1)) 
                                                                AS "postingFrequencyRaw",

        -- твои правила: если (0,1) -> 1, иначе округлить до целого
        CASE
          WHEN (COALESCE(k."totalPosts", 0)::float
                / GREATEST(DATE_PART('day', NOW() - k."twitterCreatedAt"), 1)) > 0
          AND (COALESCE(k."totalPosts", 0)::float
                / GREATEST(DATE_PART('day', NOW() - k."twitterCreatedAt"), 1)) < 1
            THEN 1
          ELSE ROUND(
            COALESCE(k."totalPosts", 0)::float
            / GREATEST(DATE_PART('day', NOW() - k."twitterCreatedAt"), 1)
          )::int
        END                                                       AS "postingFrequency"

      FROM "KOL" k
      JOIN agg a                  ON a."kolId" = k.id
      LEFT JOIN "User"   u        ON u."kolId" = k.id
      LEFT JOIN "Wallet" w        ON w.id = u."primaryWalletId"
      WHERE k."hidden" = false
        AND k."isAlsoProject" = false
        AND k."kolScore" > 0
      ORDER BY ${sortExpr} ${sortDirection}, k.id ${sortDirection}
      LIMIT $1 OFFSET $2
      `,
      limit,
      skip
    );

    // total по тем же условиям
    const totalResult = await prisma.$queryRawUnsafe<{ count: number }[]>(
      `
      SELECT COUNT(*)::int AS count
      FROM (
        SELECT k.id
        FROM "KOL" k
        JOIN "KOLToProject" kp
          ON kp."kolId" = k.id AND kp."mindoMetric" > 0
        WHERE k."kolScore" > 0
          AND k."hidden" = false
          AND k."isAlsoProject" = false
        GROUP BY k.id
      ) sub;
      `
    );

    const total = totalResult[0]?.count ?? 0;

    sendJson(res, { data, total, page, limit });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
};

/**
 * GET /api/kols/:id
 * Подробная карточка KOL (все поля + агрегаты + walletScore)
 */
export const getKolById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Один ряд с агрегатами по проектам и score’ом кошелька
    const rows = await prisma.$queryRawUnsafe<any[]>(
      `
      WITH agg AS (
        SELECT
          kp."kolId",
          SUM(kp."mindoMetric")   AS "mindoMetric",
          SUM(kp."proofOfWork")   AS "proofOfWork",
          SUM(kp."qualityScore")  AS "qualityScore",
          SUM(kp."totalPosts")    AS "totalPostsByProjects",
          SUM(kp."totalComments") AS "totalCommentsByProjects"
        FROM "KOLToProject" kp
        WHERE kp."kolId" = $1
        GROUP BY kp."kolId"
      )
      SELECT
        k.id,
        k."hidden",
        k."isAlsoProject",

        -- Twitter profile
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

        -- Main metrics
        k."kolScore",
        k."kolScorePercentFromTotal",
        k."smartFollowersCount",
        k."threadsCount",
        k."engagementRate",
        k."smartEngagement",

        -- Average
        k."avgViews",
        k."avgLikes",

        -- Totals (account & organic & global)
        k."totalPosts",
        k."totalViews",
        k."totalInteractions",

        k."totalOrganicPosts",
        k."totalOrganicViews",
        k."totalOrganicInteractions",

        k."totalAccountPosts",
        k."totalAccountViews",
        k."totalAccountInteractions",
        k."totalAccountComments",
        k."totalAccountLikes",
        k."totalAccountRetweets",
        k."totalAccountReplies",

        -- Changes
        k."totalPostsChange",
        k."totalInteractionsChange",
        k."totalViewsChange",
        k."followersChange",
        k."smartEngagementChange",

        -- Aggregates by projects (из KOLToProject)
        a."mindoMetric",
        a."proofOfWork",
        a."qualityScore",
        a."totalPostsByProjects",
        a."totalCommentsByProjects",

        -- User / Points
        COALESCE(u."earnedPoints", 0) AS "earnedPoints",

        -- Wallet score (из primary wallet)
        COALESCE(w."rubyWalletScore", 0)
          + COALESCE(w."nomisWalletScore", 0) * 100 AS "walletScore",

        -- primary wallet meta (полезно в модалке)
        w.id AS "primaryWalletId",
        w.address AS "primaryWalletAddress",
        w.chain   AS "primaryWalletChain",
        w.verified AS "primaryWalletVerified",
        w.label   AS "primaryWalletLabel",
        w.symbol  AS "primaryWalletSymbol",
        w.explorer AS "primaryWalletExplorer",
        w."rubyWalletScore",
        w."nomisWalletScore",

        k."createdAt",
        k."updatedAt",
        k."fetchedAt"

      FROM "KOL" k
      LEFT JOIN agg a                  ON a."kolId" = k.id
      LEFT JOIN "User"   u            ON u."kolId" = k.id
      LEFT JOIN "Wallet" w            ON w.id = u."primaryWalletId"
      WHERE k.id = $1
      LIMIT 1
      `,
      id
    );

    const row = rows[0];
    if (!row) {
      return res.status(404).json({ error: "KOL not found" });
    }

    sendJson(res, row);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
};

// legacy
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
