export interface Project {
  id: string; // cuid (Prisma)
  name: string;
  slug: string; // уникальный идентификатор (равен id в Coingecko)
  avatarUrl?: string | null;
  category?: string | null;
  website?: string | null;
  description?: string | null;
  marketCap?: string | null;
  launchDate?: string | null; // DateTime → string
  twitter?: string | null;
  telegram?: string | null;
  discord?: string | null;
  rawJson?: string | null;

  // Поля анализа
  mindshare?: string | null;
  kolAttention?: string | null;
  engagement?: string | null;
  trustScore?: string | null;
  rewardPoolUsd?: string | null;
  rewardRank?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface Influencer {
  id: string; // cuid (Prisma)
  rank?: string; // ранг в списке
  name: string;
  username: string; // уникальный
  avatarUrl?: string | null;
  badges?: string | null;
  bio?: string | null;
  platform?: string | null; // "twitter" и т.п.
  businessAccount?: boolean;
  followers?: string | null;
  followings?: string | null;
  expertise?: string | null;
  profileUrl?: string | null;

  mindshare?: string | null;
  pow?: string | null;
  poi?: string | null;
  poe?: string | null;
  smartFollowers?: string | null;
  followersCount?: string | null;
  moneyScore?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: string;
  username?: string;
  email?: string;
  role?: "admin" | "user";
  twitterHandle?: string;
  avatarUrl?: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
  isAuthenticated?: boolean;
}
