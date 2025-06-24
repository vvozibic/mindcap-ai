import { ArrowDown, ArrowUp, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Influencer } from "../types";
import InfluencerDetailOverlay from "./InfluencerDetailOverlay";

interface KOLLeaderboardProps {}

type SortField =
  | "rank"
  | "mindshare"
  | "pow"
  | "poi"
  | "poe"
  | "smartFollowers"
  | "followers"
  | "moneyScore";

const KOLLeaderboard: React.FC<KOLLeaderboardProps> = () => {
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);
  const [isDetailOverlayOpen, setIsDetailOverlayOpen] = useState(false);

  const [kols, setKols] = useState<Influencer[]>([]);

  useEffect(() => {
    fetch("/api/influencers")
      .then((res) => res.json())
      .then(setKols)
      .catch(console.error);
  }, []);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedKOLs = [...kols].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc" && aValue && bValue) {
      return aValue > bValue ? 1 : -1;
    } else {
      if (aValue && bValue) {
        return aValue < bValue ? 1 : -1;
      }

      return 1; // If one is null, place it at the end
    }
  });

  const showTooltip = (id: string) => {
    setTooltipVisible(id);
  };

  const hideTooltip = () => {
    setTooltipVisible(null);
  };

  const handleInfluencerClick = (kol: Influencer) => {
    setSelectedInfluencer(kol);
    setIsDetailOverlayOpen(true);
  };

  const closeDetailOverlay = () => {
    setIsDetailOverlayOpen(false);
  };

  const tooltips = {
    mindshare: "Overall attention score based on multiple factors",
    pow: "Quantity of relevant posts",
    poi: "Originality and depth of content",
    poe: "Engagement quality based on reputable influence",
    smartFollowers: "Weighted followercount based on quality and engagement",
    followers: "Raw follower count",
    moneyScore: "Financial reputation score",
  };

  return (
    <div className="bg-primary-800 rounded-lg shadow-lg overflow-hidden border border-primary-700">
      <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-600">
        <h2 className="text-2xl font-bold text-white">X.com KOL Leaderboard</h2>
        <p className="text-gray-300 mt-2">
          Ranking the most influential voices in Web3 based on attention metrics
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-primary-700">
          <thead className="bg-primary-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("rank")}
              >
                <div className="flex items-center">
                  Rank
                  {sortField === "rank" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Influencer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("mindshare")}
              >
                <div className="flex items-center relative">
                  Mindshare
                  {sortField === "mindshare" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    ))}
                  <Info
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                    onMouseEnter={() => showTooltip("mindshare")}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === "mindshare" && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.mindshare}
                    </div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("pow")}
              >
                <div className="flex items-center relative">
                  PoW
                  {sortField === "pow" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    ))}
                  <Info
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                    onMouseEnter={() => showTooltip("pow")}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === "pow" && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.pow}
                    </div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("poi")}
              >
                <div className="flex items-center relative">
                  PoI
                  {sortField === "poi" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    ))}
                  <Info
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                    onMouseEnter={() => showTooltip("poi")}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === "poi" && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.poi}
                    </div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("poe")}
              >
                <div className="flex items-center relative">
                  PoE
                  {sortField === "poe" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    ))}
                  <Info
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                    onMouseEnter={() => showTooltip("poe")}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === "poe" && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.poe}
                    </div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("smartFollowers")}
              >
                <div className="flex items-center relative">
                  Smart Followers
                  {sortField === "smartFollowers" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    ))}
                  <Info
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                    onMouseEnter={() => showTooltip("smartFollowers")}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === "smartFollowers" && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.smartFollowers}
                    </div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("followers")}
              >
                <div className="flex items-center relative">
                  Followers
                  {sortField === "followers" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    ))}
                  <Info
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                    onMouseEnter={() => showTooltip("followers")}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === "followers" && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.followers}
                    </div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("moneyScore")}
              >
                <div className="flex items-center relative">
                  Money Score
                  {sortField === "moneyScore" &&
                    (sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-1" />
                    ))}
                  <Info
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                    onMouseEnter={() => showTooltip("moneyScore")}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === "moneyScore" && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.moneyScore}
                    </div>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-800 divide-y divide-primary-700">
            {sortedKOLs.map((kol, index) => (
              <tr
                key={kol.id}
                className={`hover:bg-primary-600 cursor-pointer transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-primary-800" : "bg-primary-700"
                }`}
                onClick={() => handleInfluencerClick(kol)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-200">
                    #{kol.rank}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={kol.avatarUrl}
                        alt={kol.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-200">
                        {kol.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {kol.username}
                      </div>
                      <div className="flex mt-1 space-x-1">
                        {kol.badges?.split(",")?.map((badge, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-600 text-accent-500"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200 font-medium">
                    {kol.mindshare}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{kol.pow}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{kol.poi}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{kol.poe}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">
                    {kol.smartFollowers.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">
                    {kol.followers.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{kol.moneyScore}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInfluencer && (
        <InfluencerDetailOverlay
          isOpen={isDetailOverlayOpen}
          onClose={closeDetailOverlay}
          influencer={selectedInfluencer}
          allInfluencers={kols.filter((k) => k && k.id)}
        />
      )}
    </div>
  );
};

export default KOLLeaderboard;
