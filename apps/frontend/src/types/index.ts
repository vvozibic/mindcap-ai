export interface Project {
  id: string;
  name: string;
  slug?: string;
  avatarUrl: string;
  category: string;
  website: string;
  description: string;
  marketCap?: string;
  launchDate?: string; // ISO string
  mindshare: string;
  kolAttention: string;
  engagement: string;
  trustScore: string;
  rewardPoolUsd: string;
  rewardRank: string;
  twitter?: string;
}
export interface Influencer {
  id: string;
  rank?: string;
  name: string;
  badges?: string;
  username: string;
  avatarUrl: string;
  platform: string;
  followers: string;
  expertise: string;
  bio: string;
  profileUrl: string;
  mindshare: string;
  pow: string;
  poi: string;
  poe: string;
  smartFollowers: string;
  followersCount: string;
  moneyScore: string;
}
