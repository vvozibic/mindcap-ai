import { Request, Response } from "express";
import { sendJson } from "../utils/sendJson";
// import { parseLinks, serializeLinks } from "../utils/links";

import { prisma } from "../prisma";

export const getAllProjects = async (_: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    where: {
      featured: false,
    },
    select: {
      id: true,
      twitterUsername: true,
      twitterAvatarUrl: true,
      twitterDescription: true,
      coinMarketCap: true,
      // launchDate: true,
      mindshare: true,
      // kolAttention: true,
      // engagement: true,
      // trustScore: true,
      // rewardPoolUsd: true,
      // rewardRank: true,
      // twitter: true,
      createdAt: true,
      updatedAt: true,
      featured: true,
    },
    orderBy: [{ coinMarketCap: "desc" }],
  });

  sendJson(res, projects);
};

export const getFeaturedProjects = async (_: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    where: {
      featured: true,
    },
    select: {
      id: true,
      twitterUsername: true,
      twitterAvatarUrl: true,
      twitterDescription: true,
      coinMarketCap: true,
      // launchDate: true,
      mindshare: true,
      // kolAttention: true,
      // engagement: true,
      // trustScore: true,
      // rewardPoolUsd: true,
      // rewardRank: true,
      // twitter: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ coinMarketCap: "desc" }],
  });

  sendJson(res, projects);
};

// export const getAllProjects = async (req: Request, res: Response) => {
//   const { limit, offset } = getPaginationParams(req);

//   const [items, total] = await prisma.$transaction([
//     prisma.project.findMany({
//       skip: offset,
//       take: limit,
//       orderBy: { marketCap: "desc" },
//     }),
//     prisma.project.count(),
//   ]);

//   res.json({
//     items,
//     meta: buildPaginationMeta(total, limit, offset),
//   });
// };

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proj = await prisma.project.findUnique({ where: { id } });
  if (!proj) return res.status(404).json({ error: "Not found" });

  sendJson(res, proj);
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.update({
      where: { id },
      data: req.body,
    });
    res.json(project);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  // await prisma.mention.deleteMany({
  //   where: { projectId: id },
  // });

  await prisma.project.delete({
    where: { id },
  });

  res.status(200).json({ message: "Project and related mentions deleted" });
};

// Narratives from protokols
export const getAllProtokolsProjects = async (_: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    orderBy: { coinMarketCap: "desc" },
    include: {
      narrativeLinks: {
        select: {
          mindsharePercent: true,
          narrative: {
            select: {
              id: true,
              name: true,
              slug: true,
              mindsharePercent: true,
              // marketCapUsd: true,
              totalViews: true,
            },
          },
        },
      },
    },
  });

  sendJson(res, projects);
};

export const getFeaturedProtokolsProjects = async (
  _: Request,
  res: Response
) => {
  const projects = await prisma.project.findMany({
    where: {
      featured: true,
    },
    include: {
      narrativeLinks: {
        select: {
          mindsharePercent: true,
          narrative: {
            select: {
              id: true,
              name: true,
              slug: true,
              mindsharePercent: true,
              // marketCapUsd: true,
              totalViews: true,
            },
          },
        },
      },
      rewardPools: true,
    },
    orderBy: [{ coinMarketCap: "desc" }],
  });

  sendJson(res, projects);
};
export const getPaginatedProtokolsProjects = async (
  req: Request,
  res: Response
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const sortField = (req.query.sortField as string) || "coinMarketCap";
  const sortDirection =
    (req.query.sortDirection as string) === "asc" ? "asc" : "desc";
  const skip = (page - 1) * limit;

  // Валидация допустимых полей сортировки
  const allowedSortFields = [
    "coinMarketCap",
    "coinPrice",
    "mindshare",
    "twitterFollowersCount",
    // "totalViews",
  ];

  const safeSortField = allowedSortFields.includes(sortField as any)
    ? (sortField as (typeof allowedSortFields)[number])
    : "mindshare";

  const [total, projects] = await Promise.all([
    prisma.project.count(),
    prisma.project.findMany({
      skip,
      take: limit,
      orderBy: {
        [safeSortField]: sortDirection,
      },
      include: {
        narrativeLinks: {
          select: {
            mindsharePercent: true,
            narrative: {
              select: {
                id: true,
                name: true,
                slug: true,
                mindsharePercent: true,
                totalViews: true,
              },
            },
          },
        },
        rewardPools: true,
      },
    }),
  ]);

  sendJson(res, {
    data: projects,
    total,
    page,
    limit,
  });
};

export const getProtokolsProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      narrativeLinks: {
        select: {
          mindsharePercent: true,
          narrative: {
            select: {
              id: true,
              name: true,
              slug: true,
              mindsharePercent: true,
              totalViews: true,
            },
          },
        },
      },
      rewardPools: true,
    },
  });

  if (!project) return res.status(404).json({ error: "Not found" });

  sendJson(res, project);
};

export const getProtokolsProjectBySlug = async (
  req: Request,
  res: Response
) => {
  const { twitterUsername } = req.params;
  const project = await prisma.project.findUnique({
    where: { twitterUsername },
    include: {
      narrativeLinks: {
        select: {
          mindsharePercent: true,
          narrative: {
            select: {
              id: true,
              name: true,
              slug: true,
              mindsharePercent: true,
              totalViews: true,
            },
          },
        },
      },
      rewardPools: true,
    },
  });

  if (!project) return res.status(404).json({ error: "Not found" });

  sendJson(res, project);
};

export const allowedSortFields = {
  mindoMetric: `"mindoMetric"`,
  proofOfWork: `"proofOfWork"`,
  qualityScore: `"qualityScore"`,
  followers: `k."twitterFollowersCount"`,
  smartFollowersCount: `k."smartFollowersCount"`,
  kolScore: `k."kolScore"`,
  engagementRate: `k."engagementRate"`,
  walletScore: `"walletScore"`,
  earnedPoints: `"earnedPoints"`,
  postingFrequencyRaw: `"postingFrequencyRaw"`,
} as const;

export type SortField = keyof typeof allowedSortFields;

export function getSortSql(sortField: string, sortDirection: string): string {
  const dir = sortDirection === "asc" ? "ASC" : "DESC";
  const expr = allowedSortFields[sortField as SortField];
  if (!expr) throw new Error(`Invalid sortField: ${sortField}`);
  return `${expr} ${dir}`;
}

export const getInfluencersByProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const limit = Math.min(
    parseInt(String(req.query.limit ?? "100"), 10) || 100,
    100
  );
  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const skip = (page - 1) * limit;

  const sortField = (req.query.sortField as string) || "mindoMetric";
  const sortDirection = req.query.sortDirection === "asc" ? "asc" : "desc";

  if (!projectId)
    return res.status(400).json({ error: "Missing projectId in params" });

  const orderByClause = getSortSql(sortField, sortDirection);

  try {
    const data = await prisma.$queryRawUnsafe<any[]>(
      `
      WITH agg AS (
        SELECT
          kp."kolId",
          SUM(kp."mindoMetric")  AS "mindoMetric",
          SUM(kp."proofOfWork")  AS "proofOfWork",
          SUM(kp."qualityScore") AS "qualityScore"
        FROM "KOLToProject" kp
        WHERE kp."projectId" = $1
          AND kp."mindoMetric" > 0
        GROUP BY kp."kolId"
      )
      SELECT
        k.id,
        k."twitterDisplayName",
        k."twitterUsername",
        k."twitterAvatarUrl",
        k."twitterFollowersCount"              AS "followers",
        k."smartFollowersCount",
        k."kolScore",
        k."engagementRate",

        a."mindoMetric",
        a."proofOfWork",
        a."qualityScore",

        COALESCE(u."earnedPoints", 0)          AS "earnedPoints",
        COALESCE(w."rubyWalletScore", 0)
          + COALESCE(w."nomisWalletScore", 0) * 100
                                              AS "walletScore",

        -- mindshare %
        k."kolScorePercentFromTotal"           AS "mindsharePercent",
        TO_CHAR(COALESCE(k."kolScorePercentFromTotal", 0), 'FM999990D00')
                                              AS "mindsharePercentText",

        -- posting frequency (posts/day)
        GREATEST(CEIL(DATE_PART('day', NOW() - k."twitterCreatedAt")), 1)
                                              AS "accountAgeDays",

        (COALESCE(k."totalPosts", 0)::float
          / GREATEST(DATE_PART('day', NOW() - k."twitterCreatedAt"), 1))
                                              AS "postingFrequencyRaw",

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
        END                                   AS "postingFrequency"

      FROM "KOL" k
      JOIN agg a                ON a."kolId" = k.id
      LEFT JOIN "User"   u      ON u."kolId" = k.id
      LEFT JOIN "Wallet" w      ON w.id = u."primaryWalletId"
      WHERE k."hidden" = false
        AND k."isAlsoProject" = false
        AND k."kolScore" > 0
      ORDER BY ${orderByClause}, k.id ${sortDirection}
      LIMIT $2 OFFSET $3
      `,
      projectId, // text/uuid
      limit,
      skip
    );

    // total — по тем же условиям (на конкретный проект)
    const totalResult = await prisma.$queryRawUnsafe<{ count: number }[]>(
      `
      SELECT COUNT(*)::int AS count
      FROM (
        SELECT k.id
        FROM "KOL" k
        JOIN "KOLToProject" kp
          ON kp."kolId" = k.id
         AND kp."projectId" = $1
         AND kp."mindoMetric" > 0
        WHERE k."hidden" = false
          AND k."isAlsoProject" = false
          AND k."kolScore" > 0
        GROUP BY k.id
      ) sub
      `,
      projectId
    );

    sendJson(res, {
      data,
      total: totalResult[0]?.count ?? 0,
      page,
      limit,
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "Internal error" });
  }
};

export const createProtokolsProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({ data: req.body });
    res.status(201).json(project);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateProtokolsProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.update({
      where: { id },
      data: req.body,
      include: {
        rewardPools: true,
      },
    });
    sendJson(res, project);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteProtokolsProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.projectToNarrative.deleteMany({
    where: { projectId: id },
  });

  await prisma.rewardPool.deleteMany({
    where: { projectId: id },
  });

  await prisma.project.delete({
    where: { id },
  });

  res.status(200).json({ message: "Project and related links deleted" });
};
