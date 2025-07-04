import { useEffect, useState } from "react";

interface UsePaginatedDataResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  sortField: string;
  sortDirection: "asc" | "desc";
  loading: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSortField: (field: string) => void;
  setSortDirection: (dir: "asc" | "desc") => void;
}

export function usePaginatedData<T>(
  fetcher: (params: {
    page: number;
    limit: number;
    sortField: string;
    sortDirection: "asc" | "desc";
  }) => Promise<{
    data: T[];
    total: number;
  }>,
  initialPage = 1,
  initialLimit = 10,
  initialSortField = "kolScore",
  initialSortDirection: "asc" | "desc" = "desc"
): UsePaginatedDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setLoading(true);
    fetcher({ page, limit, sortField, sortDirection })
      .then((res) => {
        if (!isCancelled) {
          setData(res.data);
          setTotal(res.total);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error("Pagination fetch failed:", err);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [page, limit, sortField, sortDirection]);

  return {
    data,
    total,
    page,
    limit,
    sortField,
    sortDirection,
    loading,
    setPage,
    setLimit,
    setSortField,
    setSortDirection,
  };
}
