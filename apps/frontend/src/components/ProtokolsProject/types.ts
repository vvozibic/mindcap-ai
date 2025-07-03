export type Narrative = {
  projectMindsharePercent: number;
  narrative: {
    id: string;
    name: string;
    slug: string;
    mindsharePercent: number;
    marketCapUsd: number;
    totalViews: number;
  };
};

export interface ProtokolsProject {
  id: string;
  name: string;
  symbol: string;
  slug?: string;
  avatarUrl?: string;
  description?: string;
  twitterUsername: string;
  twitterId: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  twitterCreatedAt: string;
  coingeckoImageUrl?: string;
  marketCap?: number;
  price?: number;
  contractAddress?: string;
  totalViews: number;
  totalPosts: number;
  mindsharePercent: number;
  mindshareChange24h: number;
  mindshareChange7d: number;
  mindshareChange30d: number;
  mindshareChange90d: number;
  createdAt: string;
  updatedAt: string;
  narrativeLinks?: Narrative[]; // Новое поле
}
