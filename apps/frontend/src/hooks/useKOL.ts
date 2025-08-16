import { useMemo } from "react";
import { useFetch } from "./useFetch";

export type KOLDetail = any;

export function useKol(id: string | null | undefined, baseUrl = "/api") {
  const url = useMemo(
    () => (id ? `${baseUrl}/influencers/kol/${encodeURIComponent(id)}` : ""),
    [id, baseUrl]
  );

  // 👇 опции — мемоизированы, чтобы их ссылка не менялась на каждом рендере
  const fetchOptions = useMemo(() => ({ enabled: !!id }) as const, [id]);

  return useFetch<KOLDetail>(url, fetchOptions);
}
