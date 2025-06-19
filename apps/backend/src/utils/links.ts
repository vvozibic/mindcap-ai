export const parseLinks = (links: string | null | undefined): string[] => {
  if (!links) return [];
  return links
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

export const serializeLinks = (links: string[] | undefined): string => {
  return Array.isArray(links) ? links.join(",") : "";
};
