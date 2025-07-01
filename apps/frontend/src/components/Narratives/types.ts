// types.ts

export interface Narrative {
  id: string;
  name: string;
  slug: string;
  description: string;
  projectCount: number;
  totalViews: number;
  totalPosts: number;

  marketCapUsd: number;
  marketCapChange90d: number;
  marketCapChange24h: number;
  marketCapChange30d: number;
  marketCapChange7d: number;

  mindsharePercent: number;
  mindshareChange90d: number;
  mindshareChange24h: number;
  mindshareChange30d: number;
  mindshareChange7d: number;
}
