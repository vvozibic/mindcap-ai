import { KOL } from "../../types";
import { daysBetween } from "../../utils/daysBetween";

export interface KOLDetailData {
  biography: string;
  followers: number;
  following: number;
  isBusinessAccount: boolean;
  accountStatus: "Active" | "Inactive" | "Suspended";
  syncStatus: "Idle" | "Syncing" | "Failed";
  lastSync: string | null;
  nextSync: string | null;
  lastUpdated: string;
  totalPosts: number;
  engagement: number;
  engagementTrend: "up" | "down" | "neutral";
  averageLikes: number;
  averageLikesTrend: "up" | "down" | "neutral";
  postingFrequency: string;
  likes: number;
  views: number;
  kolScore?: number;
  mindshare?: number;
  mindoMetric?: number | null;
  proofOfWork: number | null;
  qualityScore: number | null;
  comments: number;
  retwets: number;
  smartFollowersPercent: number;
  smartFollowers: number;
  profileUrl: string;
  twitterRegisterDate: string;
  aiGeneratedContent: number;
  avgCommentsPerPost: string;
  avgRetweetsPerPost: string;
  avgEngagementPerPost: string;
  engagementRate: number;
}

export const getKOLDetailData = (kol: KOL | null): KOLDetailData | null => {
  if (!kol) return null;

  const totalPosts = kol.totalPosts || 0;
  const realPostingFrequency = Number(
    (kol?.totalPosts || 0) / daysBetween(kol.twitterCreatedAt, new Date())
  );

  const postingFrequency =
    realPostingFrequency > 0 && realPostingFrequency < 1
      ? "~1/day"
      : `~${Math.round(realPostingFrequency)?.toFixed(0)}/day`;

  return {
    biography: kol?.twitterDescription || "No biography available",
    followers: Number(kol?.twitterFollowersCount || 1000),
    following: Number(kol?.twitterFollowingCount || 100),
    isBusinessAccount: false,
    accountStatus: "Active",
    syncStatus: "Idle",
    lastSync: kol?.updatedAt ? new Date(kol?.updatedAt).toLocaleString() : "",
    nextSync: "",
    lastUpdated: kol?.updatedAt
      ? new Date(kol?.updatedAt).toLocaleString()
      : "",
    totalPosts: totalPosts,
    engagement: kol?.engagementRate || 0,
    engagementTrend: kol?.engagementRate || 0 > 0 ? "up" : "down",
    averageLikes: kol?.avgLikes || 0,
    averageLikesTrend: "up",
    kolScore: kol?.kolScore || 0,
    mindshare: kol?.kolScorePercentFromTotal,
    mindoMetric: kol?.mindoMetric,
    proofOfWork: kol?.proofOfWork,
    qualityScore: kol?.qualityScore,
    postingFrequency: postingFrequency || "0",
    likes: kol?.totalAccountLikes || 0,
    views: kol?.totalAccountViews || 0,
    comments: kol?.totalAccountComments || 0,
    retwets: kol?.totalAccountRetweets || 0,
    aiGeneratedContent: 0,
    smartFollowers: +(kol?.smartFollowersCount || 0),
    smartFollowersPercent: +(
      (+(kol?.smartFollowersCount || 0) / kol?.twitterFollowersCount) *
      100
    ).toFixed(2),
    avgCommentsPerPost: Number(
      kol?.totalAccountComments || 0 / totalPosts
    )?.toFixed(4),
    avgRetweetsPerPost: Number(
      (kol?.totalAccountRetweets || 0) / totalPosts
    )?.toFixed(4),
    avgEngagementPerPost: Number(
      (kol?.engagementRate || 0) / totalPosts
    )?.toFixed(4),
    engagementRate: kol?.engagementRate || 0,
    twitterRegisterDate: new Date(kol.twitterCreatedAt).toLocaleDateString(),
    profileUrl: `https://x.com/${kol?.twitterUsername}`,
  };
};
