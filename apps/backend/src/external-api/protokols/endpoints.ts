export const BASE = "https://public-api.protokols.io/api/v1";

export const endpoints = {
  narrativeList: () => `${BASE}/narratives`,
  narrativeDetails: (narrative_id_or_slug: string) =>
    `${BASE}/narratives/${narrative_id_or_slug}`,
  projectsListInNarrative: (narrative_id_or_slug: string) =>
    `${BASE}/narratives/${narrative_id_or_slug}/projects`,

  topKolsListInProject: (username_or_id: string) =>
    `${BASE}/project/${username_or_id}/top-contributors`,

  profileStats: (username_or_id: string) =>
    `${BASE}/profile/${username_or_id}/stats`,

  profile: (username_or_id: string) => `${BASE}/profile/${username_or_id}`,
};
