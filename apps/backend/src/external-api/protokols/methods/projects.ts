import { fetchFromProtokols } from "../client";
import { endpoints } from "../endpoints";
import { ListProjectsInNarativeResponse } from "../types"; // твой тип

export const getProjectsInNarrative = async (
  slug: string,
  limit = 20
): Promise<ListProjectsInNarativeResponse> => {
  let all: ListProjectsInNarativeResponse = { data: [], pagination: null };
  let cursor: string | null = null;
  let prevCursor: string | null = null;
  let page = 1;

  while (page <= 5) {
    const url = `${endpoints.projectsListInNarrative(slug)}?limit=${limit}${
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
