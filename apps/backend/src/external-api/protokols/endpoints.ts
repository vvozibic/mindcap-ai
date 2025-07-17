export const BASE = "https://public-api.protokols.io/api/v1";

export const endpoints = {
  narrativeList: () => `${BASE}/narratives`,
  narrativeDetails: (narrative_id_or_slug: string) =>
    `${BASE}/narratives/${narrative_id_or_slug}`,
  projectsListInNarrative: (narrative_id_or_slug: string) =>
    `${BASE}/narratives/${narrative_id_or_slug}/projects`,

  // projectStats: (slug: string, timeframe = "30d") =>
  //   `${BASE}/project/${slug}/stats?timeframe=${timeframe}`,
  // influencerStats: (handle: string, timeframe = "30d") =>
  //   `${BASE}/profile/${handle}/stats?timeframe=${timeframe}`,
};
