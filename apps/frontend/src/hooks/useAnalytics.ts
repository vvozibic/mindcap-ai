// frontend/utils/useAnalytics.ts
import { useMemo } from "react";
import { analytics } from "../analytics";

export function useAnalytics() {
  return useMemo(() => analytics, []);
}
