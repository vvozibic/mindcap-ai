/**
 * List of Narratives
 */
export interface Narrative {
  description: string;
  displayName: string;
  id: number;
  name: string;
  slug: string;
}

export interface NarrativeListResponse {
  data: Narrative[];
}

/**
 * Narrative Details
 */
export interface NarrativeDetails {
  /**
   * Detailed description of the narrative.
   */
  description?: null | string;
  /**
   * Percentage change in total market cap over the last 24 hours.
   */
  market_cap?: MarketCap;
  /**
   * Current mindshare score (e.g., based on social mentions, sentiment).
   */
  mindshare: Mindshare;
  /**
   * Name of the narrative.
   */
  name: string;
  /**
   * Unique identifier for the narrative.
   */
  narrative_id: string;
  /**
   * Total number of projects associated with this narrative.
   */
  project_count: number;
  /**
   * URL-friendly slug for the narrative.
   */
  slug: string;
  total_posts: number;
  total_views: number;
}

export interface NarrativeDetailsResponse {
  data: NarrativeDetails;
}

/**
 * Percentage change in total market cap over the last 24 hours.
 */
export interface MarketCap {
  change_24h: number;
  change_30d: number;
  change_7d: number;
  change_90d: number;
  total_market_cap_usd: number;
}

/**
 * Current mindshare score (e.g., based on social mentions, sentiment).
 */
export interface Mindshare {
  change_24h: number;
  change_30d: number;
  change_7d: number;
  change_90d: number;
  mindshare_percent: number;
}

export interface ListProjectsInNarativeResponse {
  data: ProjectsInNarative[];
  pagination: PaginationMeta;
}

export interface ProjectsInNarative {
  coin: Coin;
  mindshare: Mindshare;
  total_posts: number;
  total_views: number;
  twitter_profile: TwitterProfile;
}

/**
 * Coin */
export interface Coin {
  contract_address?: null | string;
  image_url: null | string;
  market_cap: number;
  name: string;
  price: number;
  symbol: string;
}

/**
 * Twitter Profile
 */
export interface TwitterProfile {
  avatar_url: string;
  description: string;
  description_link?: null | string;
  display_name: string;
  followers_count: number;
  following_count: number;
  gold_badge: boolean | null;
  id: string;
  is_verified: boolean;
  lang: string;
  profile_created_at: string;
  username: string;
}

export interface ListKOLsInProjectsResponse {
  data: KOLInProject[];
  pagination: PaginationMeta;
}
export interface KOLInProject {
  avatar_url: string;
  description: string;
  description_link?: null | string;
  display_name: string;
  followers_count: number;
  following_count: number;
  gold_badge: boolean | null;
  id: string;
  is_verified: boolean;
  lang: string;
  profile_created_at: string;
  total_comments: number;
  total_interactions: number;
  total_posts: number;
  total_views: number;
  username: string;
}

export interface ProfileStatsResponse {
  data: ProfileStats;
}

/**
 * Profile Stats
 */
export interface ProfileStats {
  avg_likes: number;
  avg_views: number;
  engagement_rate: number;
  followers_change: number;
  followers_count: number;
  kol_score: number;
  smart_engagement: number;
  smart_engagement_change?: number;
  smart_followers_count: number;
  threads_count: number;
  total_account_comments: number;
  total_account_interactions: number;
  total_account_likes: number;
  total_account_posts: number;
  total_account_replies: number;
  total_account_retweets: number;
  total_account_views: number;
  total_interactions: number;
  total_interactions_change: number;
  total_organic_interactions: number;
  total_organic_posts: number;
  total_organic_views: number;
  total_posts: number;
  total_posts_change: number;
  total_views: number;
  total_views_change: number;
}

export interface TwitterFullProfileResponse {
  data: TwitterFullProfile;
}

/**
 * Twitter Full Profile
 */
export interface TwitterFullProfile {
  avatar_url: string;
  description: string;
  description_link?: null | string;
  display_name: string;
  followers_count: number;
  following_count: number;
  gold_badge: boolean | null;
  id: string;
  is_verified: boolean;
  kol_score: number;
  lang: string;
  profile_created_at: string;
  smart_followers_count: number;
  username: string;
}

/**
 * Pagination Meta
 */
export interface PaginationMeta {
  /**
   * Cursor for next page (null if no more pages)
   */
  cursor: null | string;
  /**
   * Number of items per page
   */
  limit: number;
  /**
   * Current page number
   */
  page: number;
}
