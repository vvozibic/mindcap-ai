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
  const sortField = (req.query.sortField as string) || "marketCap";
  const sortDirection =
    (req.query.sortDirection as string) === "asc" ? "asc" : "desc";
  const skip = (page - 1) * limit;

  // Валидация допустимых полей сортировки
  const allowedSortFields = [
    "marketCap",
    "price",
    "mindshare",
    "followersCount",
    "totalViews",
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
                // marketCapUsd: true,
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
  const project = await prisma.project.findFirst({
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

export const getInfluencersByProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ error: "Missing projectId in params" });
  }

  try {
    const influencers = await prisma.kOL.findMany({
      where: {
        projects: {
          some: {
            projectId,
          },
        },
        kolScore: {
          gt: 0, // фильтруем KOL с нулевым весом
        },
      },
      orderBy: {
        kolScore: "desc", // сортировка по весу, если нужно
      },
    });

    sendJson(res, influencers);
  } catch (err) {
    console.error("Failed to fetch influencers for project:", err);
    res.status(500).json({ error: "Internal server error" });
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
