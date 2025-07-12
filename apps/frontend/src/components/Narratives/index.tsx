import React, { useEffect, useState } from "react";
import { TableSkeleton } from "../TableSkeleton";
import FilterControls from "./FilterControls";
import NarrativeList from "./NarrativeList";
import TreemapSvg from "./TreemapSvg";
import { Narrative } from "./types";

const NarrativesTreemap: React.FC = () => {
  const [narratives, setNarratives] = useState<Narrative[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<"7D" | "30D" | "90D">(
    "90D"
  );
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Gainers" | "Losers"
  >("All");
  const [sortField, setSortField] = useState<"mindshare" | "change" | "views">(
    "mindshare"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNarratives = async () => {
      try {
        const res = await fetch("/api/narratives");
        const data = await res.json();
        setNarratives(data);
      } catch (error) {
        console.error("Failed to fetch narratives", error);
      }
    };
    fetchNarratives();
  }, []);

  const getChange = (narrative: Narrative) => {
    switch (selectedPeriod) {
      case "7D":
        return narrative.mindshareChange7d;
      case "30D":
        return narrative.mindshareChange30d;
      case "90D":
      default:
        return narrative.mindshareChange90d;
    }
  };

  const filteredNarratives = narratives
    .filter((narrative) => {
      const change = getChange(narrative);
      if (selectedFilter === "Gainers") return change > 0;
      if (selectedFilter === "Losers") return change < 0;
      return true;
    })
    .sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortField) {
        case "views":
          aValue = a.totalViews;
          bValue = b.totalViews;
          break;
        case "change":
          aValue = getChange(a);
          bValue = getChange(b);
          break;
        case "mindshare":
        default:
          aValue = a.mindsharePercent;
          bValue = b.mindsharePercent;
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    });

  return (
    <div className="relative z-10 overflow-hidden rounded-xl border border-primary-700/40 bg-primary-800/30 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(0,255,174,0.05),0_8px_20px_rgba(0,255,174,0.05)] p-4 mb-6">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-2xl font-bold text-white">Narratives</h2>
        <div className="space-x-2">
          <FilterControls
            selectedPeriod={selectedPeriod}
            onSelect={setSelectedPeriod}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-2 mt-4">
        <div className="lg:w-1/2 w-full">
          {!narratives.length && <TableSkeleton />}
          {Boolean(narratives.length) && (
            <NarrativeList
              data={filteredNarratives}
              selectedFilter={selectedFilter}
              selectedPeriod={selectedPeriod}
              onFilterChange={(f) => {
                setSelectedId(null);
                setSelectedFilter(f);
              }}
              getChange={getChange}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              selectedId={selectedId}
              onSelect={(id) => {
                if (id === selectedId) {
                  setSelectedId(null);
                } else {
                  setSelectedId(id);
                }
              }}
            />
          )}
        </div>
        <div className="lg:w-1/2 w-full">
          <TreemapSvg
            data={filteredNarratives}
            getChange={getChange}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            selectedId={selectedId}
            onSelect={(id) => {
              if (id === selectedId) {
                setSelectedId(null);
              } else {
                setSelectedId(id);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NarrativesTreemap;
