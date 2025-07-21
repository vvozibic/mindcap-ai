import { fetchFromProtokols, retry } from "../client";
import { endpoints } from "../endpoints";
import { ListKOLsInProjectsResponse, ProfileStateResponse } from "../types"; // твой тип

// Get first 100 KOLs
export const getKOLsInProjects = async (
  id: string,
  limit = 20
): Promise<ListKOLsInProjectsResponse> => {
  let all: ListKOLsInProjectsResponse = { data: [], pagination: null };
  let cursor: string | null = null;
  let prevCursor: string | null = null;
  let page = 1;

  while (page <= 5) {
    const url = `${endpoints.topKolsListInProject(id)}?limit=${limit}${
      cursor ? `&cursor=${cursor}` : ""
    }`;

    const result = await fetchFromProtokols<any>(url);
    const data = result.data || [];

    if (cursor && cursor === prevCursor) break;
    if (data.length === 0) break;

    all = {
      ...all,
      data: [...all.data, ...data],
    };
    prevCursor = cursor;
    cursor = result.pagination?.cursor ?? null;
    page++;
  }

  return all;
};

export const getProfileStats = async (
  slug_or_id
): Promise<ProfileStateResponse> => {
  const url = endpoints.profileStats(slug_or_id);

  return retry(url, () => fetchFromProtokols<ProfileStateResponse>(url));
};
