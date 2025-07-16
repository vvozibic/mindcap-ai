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
