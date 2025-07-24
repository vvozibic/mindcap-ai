import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sendJson } from "../utils/sendJson";
// import { parseLinks, serializeLinks } from "../utils/links";

const prisma = new PrismaClient();

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
  mindoMetric: `SUM(kp."mindoMetric")`,
  proofOfWork: `SUM(kp."proofOfWork")`,
  qualityScore: `SUM(kp."qualityScore")`,
  totalPosts: `SUM(kp."totalPosts")`,
  totalComments: `SUM(kp."totalComments")`,
  kolScore: `k."kolScore"`,
  engagementRate: `k."engagementRate"`,
  smartFollowersCount: `k."smartFollowersCount"`,
  twitterFollowersCount: `k."twitterFollowersCount"`,
  tweetsCountNumeric: `k."tweetsCountNumeric"`,
} as const;

export type SortField = keyof typeof allowedSortFields;

export function getSortSql(sortField: string, sortDirection: string): string {
  const direction = sortDirection === "asc" ? "ASC" : "DESC";
  const expr = allowedSortFields[sortField as SortField];
  if (!expr) throw new Error(`Invalid sortField: ${sortField}`);
  return `${expr} ${direction}`;
}

export const getInfluencersByProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const limit = parseInt(req.query.limit as string) || 100;
  const page = parseInt(req.query.page as string) || 1;
  const skip = (page - 1) * limit;
  const sortField = (req.query.sortField as string) || "mindoMetric";
  const sortDirection = req.query.sortDirection === "asc" ? "asc" : "desc";

  if (!projectId) {
    return res.status(400).json({ error: "Missing projectId in params" });
  }

  if (!allowedSortFields[sortField as keyof typeof allowedSortFields]) {
    return res.status(400).json({ error: `Invalid sortField: ${sortField}` });
  }

  const orderByClause = getSortSql(sortField, sortDirection);

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
    SUM(kp."mindoMetric")   AS "mindoMetric",
    SUM(kp."proofOfWork")   AS "proofOfWork",
    SUM(kp."qualityScore")  AS "qualityScore",
    SUM(kp."totalPosts")    AS "totalPosts",
    SUM(kp."totalComments") AS "totalComments"
    FROM "KOL" k
    JOIN "KOLToProject" kp ON kp."kolId" = k.id
    WHERE k."kolScore" > 0
      AND k."hidden" = false
      AND kp."projectId" = $1
    GROUP BY k.id
    ORDER BY ${orderByClause}
    LIMIT $2 OFFSET $3
  `,
    projectId,
    limit,
    skip
  );

  const totalResult = await prisma.$queryRawUnsafe<{ count: number }[]>(
    `
    SELECT COUNT(*)::int AS count
    FROM (
      SELECT k.id
      FROM "KOL" k
      JOIN "KOLToProject" kp ON kp."kolId" = k.id
      WHERE k."kolScore" > 0 AND k."hidden" = false AND kp."projectId" = $1
      GROUP BY k.id
    ) sub
  `,
    projectId
  );

  const total = totalResult[0]?.count || 0;

  sendJson(res, {
    data,
    total,
    page,
    limit,
  });
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
