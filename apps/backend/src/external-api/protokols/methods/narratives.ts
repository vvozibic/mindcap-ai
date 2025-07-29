import { fetchFromProtokols, retry } from "../client";
import { endpoints } from "../endpoints";
import { NarrativeDetailsResponse, NarrativeListResponse } from "../types";

export const getNarrativeList = async (): Promise<NarrativeListResponse> => {
  const url = endpoints.narrativeList();

  return retry(url, () => fetchFromProtokols<NarrativeListResponse>(url));
};

export const getNarrativeDetails = async (
  slug_or_id
): Promise<NarrativeDetailsResponse> => {
  const url = endpoints.narrativeDetails(slug_or_id);

  return retry(url, () => fetchFromProtokols<NarrativeDetailsResponse>(url));
};
