import { fetchFromProtokols, retry } from "../client";
import { endpoints } from "../endpoints";
import { Narrative, NarrativeDetails } from "../types/narrative";

export const getNarrativeList = async (): Promise<Narrative[]> => {
  const url = endpoints.narrativeList();

  return retry(url, () => fetchFromProtokols<Narrative[]>(url));
};

export const getNarrativeDetails = async (
  slug_or_id
): Promise<NarrativeDetails> => {
  const url = endpoints.narrativeDetails(slug_or_id);

  return retry(url, () => fetchFromProtokols<NarrativeDetails>(url));
};
