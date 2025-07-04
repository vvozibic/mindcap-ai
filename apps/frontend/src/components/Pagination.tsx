import React from "react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  total,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const handleClick = (p: number | "...") => {
    if (typeof p === "number" && p !== page) onPageChange(p);
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-6 text-sm">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`px-3 py-1 rounded-md font-medium transition ${
          page === 1
            ? "text-gray-500 cursor-not-allowed"
            : "text-white hover:text-white hover:bg-primary-700"
        }`}
      >
        Previous
      </button>

      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500 select-none">
            …
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => handleClick(p)}
            className={`px-3 py-1 rounded-md font-medium transition ${
              p === page
                ? "border border-white text-white bg-primary-600"
                : "text-white/70 hover:text-white hover:bg-primary-700"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-md font-medium transition ${
          page === totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "text-white hover:text-white hover:bg-primary-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
