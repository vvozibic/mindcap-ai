import { Info } from "lucide-react";
import React from "react";
import { formatNumber } from "../../utils/formatNumber";
import { Narrative } from "./types";

interface NarrativeListProps {
  data: Narrative[];
  selectedFilter: "All" | "Gainers" | "Losers";
  selectedPeriod: "7D" | "30D" | "90D";
  onFilterChange: (f: "All" | "Gainers" | "Losers") => void;
  getChange: (n: Narrative) => number;
  sortField: "mindshare" | "change" | "views";
  setSortField: (field: "mindshare" | "change" | "views") => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (dir: "asc" | "desc") => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const NarrativeList: React.FC<NarrativeListProps> = ({
  data,
  selectedFilter,
  selectedPeriod,
  onFilterChange,
  getChange,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  hoveredId,
  onHover,
  selectedId,
  onSelect,
}) => {
  const handleSort = (field: "mindshare" | "change" | "views") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "▲" : "▼";
  };

  return (
    <>
      <div className="flex space-x-2 mb-4">
        {["All", "Gainers", "Losers"].map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f as any)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              selectedFilter === f
                ? "bg-primary-600 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {f === "All" ? "All narratives" : f}
          </button>
        ))}
      </div>

      <div className="bg-primary-700 rounded-lg overflow-hidden">
        <div className="p-3 bg-primary-600">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              Narrative <Info className="h-3 w-3 ml-1" />
            </div>
            <button
              onClick={() => handleSort("mindshare")}
              className="flex items-center focus:outline-none"
            >
              Mindshare %
              {getSortIcon("mindshare") && (
                <span className="ml-1">{getSortIcon("mindshare")}</span>
              )}
            </button>
            <button
              onClick={() => handleSort("change")}
              className="flex items-center focus:outline-none"
            >
              {selectedPeriod} Change
              {getSortIcon("change") && (
                <span className="ml-1">{getSortIcon("change")}</span>
              )}
            </button>
            <button
              onClick={() => handleSort("views")}
              className="flex items-end focus:outline-none hidden sm:block  text-right"
            >
              Total Views
              {getSortIcon("views") && (
                <span className="ml-1">{getSortIcon("views")}</span>
              )}
            </button>
          </div>
        </div>

        <div className="max-h-[535px] overflow-y-auto">
          {data.map((n, i) => {
            const change = getChange(n);
            const isHovered = hoveredId === n.id;
            const isSelected = selectedId === n.id;

            return (
              <div
                key={n.id}
                onMouseEnter={() => onHover(n.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(n.id)}
                className={`grid grid-cols-3 sm:grid-cols-4 gap-2 p-3 text-sm border-l-2 cursor-pointer transition-colors duration-150 ${
                  isHovered || isSelected
                    ? "bg-primary-500"
                    : i % 2 === 0
                    ? "bg-primary-700"
                    : "bg-primary-600"
                } ${change > 0 ? "border-green-500" : "border-red-500"}`}
              >
                <div className="text-gray-200 font-medium">{n.name}</div>
                <div className="text-gray-300">
                  {n.mindsharePercent.toFixed(2)}%
                </div>
                <div
                  className={`flex items-center ${
                    change > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <span className="mr-1">{change > 0 ? "▲" : "▼"}</span>
                  {change.toFixed(2)}%
                </div>
                <div className="text-gray-300 hidden sm:block text-right">
                  {formatNumber(n.totalViews)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NarrativeList;
