import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { enrichInfluencer } from "../components/kols/_enrichInfluencer";
import { getProfile } from "../external-api/protokols/methods/kols";
import { sendJson } from "../utils/sendJson";

const prisma = new PrismaClient();

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
    "kolScorePercent",
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
    prisma.kOL.count({
      where: {
        kolScore: {
          gte: 0,
        },
        hidden: false,
      },
    }),
    prisma.kOL.findMany({
      where: {
        kolScore: {
          gte: 0,
        },
        hidden: false,
      },
      include: {
        projects: {
          include: {
            project: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        [safeSortField]: sortDirection,
      },
    }),
  ]);

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
  const proj = await prisma.kOL.findUnique({
    where: { twitterUsername: username },
  });
  if (!proj) return res.status(404).json({ error: "Not found" });
  res.json(proj);
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
    await enrichInfluencer(username);
    // await recalculateMindshareForInfluencers();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to enrich kol" });
  }
};
