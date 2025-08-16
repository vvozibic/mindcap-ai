import { useCallback, useEffect, useRef, useState } from "react";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

type FetchOptions = RequestInit & { enabled?: boolean };

export function useFetch<T>(
  url: string,
  options?: FetchOptions
): FetchState<T> {
  const { enabled = true, ...init } = options ?? {};
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!enabled);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(() => {
    if (!enabled || !url) {
      // 👈 защита
      setLoading(false);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    setError(null);

    fetch(url, { ...init, signal: ac.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.text()) || "Request failed");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err?.name !== "AbortError") setError(err.message ?? String(err));
      })
      .finally(() => setLoading(false));
  }, [enabled, url /* ВАЖНО: init не кладём сюда! */]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
