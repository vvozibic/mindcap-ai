import { ArrowDown, ArrowUp, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Influencer } from "../types";
import { daysBetween } from "../utils/daysBetween";
import InfluencerDetailOverlay from "./InfluencerDetailOverlay";
import { TableSkeleton } from "./TableSkeleton";

interface KOLLeaderboardProps {}

function withMindshare(influencers: Influencer[]) {
  const totalScore = influencers.reduce((sum, i) => sum + i.kolScore, 0);

  return influencers.map((i) => ({
    ...i,
    mindshare:
      totalScore > 0 ? +((i.kolScore / totalScore) * 100).toFixed(2) : 0,
  }));
}

type SortField =
  | "followersCountNumeric"
  | "mindshare"
  | "pow"
  | "poi"
  | "poe"
  | "smartFollowers"
  | "followers"
  | "engagementRate"
  | "avgLikes"
  | "postingFrequency"
  | "kolScore";

const KOLLeaderboard: React.FC<KOLLeaderboardProps> = () => {
  const [sortField, setSortField] = useState<SortField>("kolScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
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

  const influencers = withMindshare(kols);

  const sortedKOLs = [...influencers]
    .map((i) => ({
      ...i,
      postingFrequency: Number(
        i?.tweetsCountNumeric / daysBetween(i.twitterRegisterDate, new Date())
      )?.toFixed(0),
    }))
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Сначала обработка null/undefined
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1; // null идёт в конец
      if (bValue == null) return -1;

      // Теперь сравнение по значению
      if (sortDirection === "asc") {
        return +aValue > +bValue ? 1 : +aValue < +bValue ? -1 : 0;
      } else {
        return +aValue < +bValue ? 1 : +aValue > +bValue ? -1 : 0;
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
    mindshare: "Overall mindshare based on AI",
    avgLikes: "Average likes",
    engagementRate: "Engagement rate",
    postingFrequency: "Posts by day",
    smartFollowers: "Weighted followercount based on quality and engagement",
    followers: "Raw follower count",
    moneyScore: "Financial reputation score",
  };

  return (
    <div
      id="leaderboard"
      className="bg-primary-800 rounded-lg shadow-lg overflow-hidden border border-primary-700 relative z-10"
    >
      <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-600">
        <h2 className="text-2xl font-bold text-white">Minds Leaderboard</h2>
        <p className="text-gray-300 mt-2">
          Ranking the most influential voices in Web3 based on attention metrics
        </p>
      </div>

      {!sortedKOLs?.length && <TableSkeleton />}

      {Boolean(sortedKOLs?.length) && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary-700">
            <thead className="bg-primary-700">
              <tr>
                <th
                  scope="col"
                  className="pt-3 pr-0 pb-3 pl-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("followersCountNumeric")}
                >
                  <div className="flex items-center">
                    Rank
                    {sortField === "followersCountNumeric" &&
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
                  onClick={() => handleSort("followersCountNumeric")}
                >
                  <div className="flex items-center relative">
                    Followers
                    {sortField === "followersCountNumeric" &&
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
                  onClick={() => handleSort("kolScore")}
                >
                  <div className="flex items-center relative">
                    Kol Score
                    {sortField === "kolScore" &&
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("mindshare")}
                >
                  <div className="flex items-center relative">
                    AI score
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
                  onClick={() => handleSort("engagementRate")}
                >
                  <div className="flex items-center relative">
                    Engagement
                    {sortField === "engagementRate" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 ml-1" />
                      ))}
                    <Info
                      className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                      onMouseEnter={() => showTooltip("engagementRate")}
                      onMouseLeave={hideTooltip}
                    />
                    {tooltipVisible === "engagementRate" && (
                      <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                        {tooltips.engagementRate || "Soon"}
                      </div>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("avgLikes")}
                >
                  <div className="flex items-center relative">
                    Avg. likes
                    {sortField === "avgLikes" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 ml-1" />
                      ))}
                    <Info
                      className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                      onMouseEnter={() => showTooltip("avgLikes")}
                      onMouseLeave={hideTooltip}
                    />
                    {tooltipVisible === "avgLikes" && (
                      <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                        {tooltips.avgLikes || "Soon"}
                      </div>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("postingFrequency")}
                >
                  <div className="flex items-center relative">
                    Posting Frequency
                    {sortField === "postingFrequency" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 ml-1" />
                      ))}
                    <Info
                      className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                      onMouseEnter={() => showTooltip("postingFrequency")}
                      onMouseLeave={hideTooltip}
                    />
                    {tooltipVisible === "postingFrequency" && (
                      <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                        {tooltips.postingFrequency || "Soon"}
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
                  <td className="pt-3 pr-0 pb-3 pl-6 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-200">
                      #{index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={kol.avatarUrl || "/default-avatar.png"}
                          alt={kol.name}
                        />
                      </div>
                      <div className="ml-4 max-w-[300px] text-wrap">
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
                    <div className="text-sm text-gray-200">
                      {kol.smartFollowers}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">
                      {kol.followersCountNumeric}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">{kol.kolScore}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200 font-medium">
                      {`${kol.mindshare}%`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">
                      {kol?.engagementRate
                        ? `${kol?.engagementRate?.toFixed(2)}%`
                        : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">{kol?.avgLikes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-200">
                      {kol?.postingFrequency
                        ? `${kol?.postingFrequency}/day`
                        : "-"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
