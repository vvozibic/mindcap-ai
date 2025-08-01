import { ArrowDown, ArrowUp, Info } from "lucide-react";
import React, { useState } from "react";
import { KOL } from "../../types";
import { daysBetween } from "../../utils/daysBetween";
import { formatNumber } from "../../utils/formatNumber";
import Pagination from "../Pagination";
import { TableSkeleton } from "../TableSkeleton";
import { usePaginatedData } from "../usePaginatedData";
import KOLDetailOverlay from "./KOLDetailOverlay";

interface KOLLeaderboardProps {}

// "mindoMetric", // из KOLToProject
//   "proofOfWork",
//   "qualityScore",
//   "totalPosts",
//   "totalComments",
//   "kolScore", // из KOL
//   "engagementRate",
//   "smartFollowersCount",
//   "twitterFollowersCount",
//   "tweetsCountNumeric",

type SortField =
  | "mindoMetric"
  | "smartFollowersCount"
  | "twitterFollowersCount"
  | "engagementRate"
  | "kolScore";
// | "postingFrequency"

const fetchKOLs = async ({
  page,
  limit,
  sortField,
  sortDirection,
}: {
  page: number;
  limit: number;
  sortField: string;
  sortDirection: "asc" | "desc";
}) => {
  const res = await fetch(
    `/api/influencers/paginate?page=${page}&limit=${limit}&sortField=${sortField}&sortDirection=${sortDirection}`
  );
  if (!res.ok) throw new Error("Failed to fetch influencers");
  return await res.json();
};

const KOLLeaderboard: React.FC<KOLLeaderboardProps> = () => {
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [selectedKOL, setSelectedKOL] = useState<KOL | null>(null);
  const [isDetailOverlayOpen, setIsDetailOverlayOpen] = useState(false);

  const {
    data: kols,
    total,
    page,
    limit,
    sortField,
    sortDirection,
    setPage,
    loading,
    setSortField,
    setSortDirection,
  } = usePaginatedData<KOL>(fetchKOLs, 1, 20, "mindoMetric", "desc");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const kolsWithAdditionalFields = kols.map((i) => {
    const realPostingFrequency = Number(
      (i?.totalPosts || 0) / daysBetween(i.twitterCreatedAt, new Date())
    );

    const postingFrequency =
      realPostingFrequency > 0 && realPostingFrequency < 1
        ? 1
        : Math.round(realPostingFrequency)?.toFixed(0);

    return {
      ...i,
      mindshare: i?.kolScorePercentFromTotal?.toFixed(2),
      postingFrequency: postingFrequency,
    };
  });

  const showTooltip = (id: string) => setTooltipVisible(id);
  const hideTooltip = () => setTooltipVisible(null);

  const handleKOLClick = (kol: KOL) => {
    setSelectedKOL(kol);
    setIsDetailOverlayOpen(true);
  };

  const closeDetailOverlay = () => {
    setIsDetailOverlayOpen(false);
  };

  const tooltips = {
    mindoMetric: "Overall mindo score based on AI",
    engagementRate: "Engagement rate",
    postingFrequency: "Posts by day",
    smartFollowersCount:
      "Weighted followercount based on quality and engagement",
    twitterFollowersCount: "Raw follower count",
    moneyScore: "Financial reputation score",
  };

  return (
    <>
      <div
        id="leaderboard"
        className={`relative z-10 overflow-hidden rounded-xl border border-primary-700/40 bg-primary-800/30 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(0,255,174,0.05),0_8px_20px_rgba(0,255,174,0.05)] transition-opacity duration-300 ${
          loading ? "opacity-80 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="p-6 border-b border-primary-700/30 bg-[radial-gradient(ellipse_60%_80%_at_50%_-10%,rgba(0,255,174,0.08),transparent)] backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-accent-500/75">
            Mindo AI Leaderboard
          </h2>
          <p className="text-gray-300 mt-2">
            Ranking the most influential voices in Web3 based on attention
            metrics
          </p>
        </div>

        {Boolean(!kolsWithAdditionalFields.length) ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-primary-700">
              <thead className="bg-primary-700/80">
                <tr>
                  <th
                    scope="col"
                    className="pt-3 pr-0 pb-3 pl-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("twitterFollowersCount")}
                  >
                    <div className="flex items-center">
                      Rank
                      {sortField === "twitterFollowersCount" &&
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
                    KOL
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("mindoMetric")}
                  >
                    <div className="flex items-center relative">
                      Mindo score
                      {sortField === "mindoMetric" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 ml-1" />
                        ))}
                      <Info
                        className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                        onMouseEnter={() => showTooltip("mindoMetric")}
                        onMouseLeave={hideTooltip}
                      />
                      {tooltipVisible === "mindoMetric" && (
                        <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 border-primary-700/40 text-white rounded shadow-lg">
                          {tooltips.mindoMetric}
                        </div>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("smartFollowersCount")}
                  >
                    <div className="flex items-center relative">
                      Smart Followers
                      {sortField === "smartFollowersCount" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 ml-1" />
                        ))}
                      <Info
                        className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                        onMouseEnter={() => showTooltip("smartFollowersCount")}
                        onMouseLeave={hideTooltip}
                      />
                      {tooltipVisible === "smartFollowersCount" && (
                        <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 border-primary-700/40 text-white rounded shadow-lg">
                          {tooltips.smartFollowersCount}
                        </div>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("twitterFollowersCount")}
                  >
                    <div className="flex items-center relative">
                      Followers
                      {sortField === "twitterFollowersCount" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 ml-1" />
                        ))}
                      <Info
                        className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                        onMouseEnter={() =>
                          showTooltip("twitterFollowersCount")
                        }
                        onMouseLeave={hideTooltip}
                      />
                      {tooltipVisible === "twitterFollowersCount" && (
                        <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 border-primary-700/40 text-white rounded shadow-lg">
                          {tooltips.twitterFollowersCount}
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
                        <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 border-primary-700/40 text-white rounded shadow-lg">
                          {tooltips.moneyScore}
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
                        <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 border-primary-700/40 text-white rounded shadow-lg">
                          {tooltips.engagementRate || "Soon"}
                        </div>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                    // onClick={() => handleSort("postingFrequency")}
                  >
                    <div className="flex items-center relative">
                      Posting Frequency
                      {/* {sortField === "postingFrequency" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 ml-1" />
                        ))} */}
                      <Info
                        className="h-4 w-4 ml-1 text-gray-500 cursor-help"
                        onMouseEnter={() => showTooltip("postingFrequency")}
                        onMouseLeave={hideTooltip}
                      />
                      {tooltipVisible === "postingFrequency" && (
                        <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 border-primary-700/40 text-white rounded shadow-lg">
                          {tooltips.postingFrequency || "Soon"}
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-800/50 backdrop-blur-sm divide-y divide-primary-700/30">
                {kolsWithAdditionalFields.map((kol, index) => (
                  <tr
                    key={kol.id}
                    className={`group cursor-pointer transition-colors duration-200 hover:bg-primary-900/35 hover:ring-1 hover:ring-accent-500/20 ${
                      index % 2 === 0
                        ? "bg-primary-800/40"
                        : "bg-primary-700/60"
                    }`}
                    onClick={() => handleKOLClick(kol)}
                  >
                    <td className="pt-3 pr-0 pb-3 pl-6 whitespace-nowrap">
                      <div className="text-sm text-accent-500">
                        #{(page - 1) * limit + index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={kol.twitterAvatarUrl || "/default-avatar.png"}
                            alt={kol.twitterDisplayName || kol.twitterUsername}
                          />
                        </div>
                        <div className="ml-4 max-w-[300px] text-wrap">
                          <div className="text-sm font-medium text-gray-200 group-hover:text-accent-500 transition-colors duration-300">
                            {kol.twitterDisplayName}
                          </div>
                          <div className="text-sm text-gray-400">
                            {kol.twitterUsername}
                          </div>
                          {/* <div className="flex mt-1 space-x-1">
                            {kol?.badges?.split(",")?.map((badge, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-600 text-accent-500"
                              >
                                {badge}
                              </span>
                            ))}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200 font-medium">
                        {`${formatNumber(Number(kol.mindoMetric?.toFixed(2)) || 0)}`}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">
                        {kol.smartFollowersCount?.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">
                        {kol.twitterFollowersCount?.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">
                        {kol.kolScore?.toLocaleString()}
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
                      <div className="text-sm text-gray-200">
                        {kol?.postingFrequency
                          ? `~${kol?.postingFrequency}/day`
                          : "-"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {Boolean(kolsWithAdditionalFields.length) && (
        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
        />
      )}

      {selectedKOL && (
        <KOLDetailOverlay
          isOpen={isDetailOverlayOpen}
          onClose={closeDetailOverlay}
          kol={selectedKOL}
          allKOLs={kols.filter((k) => k && k.id)}
        />
      )}
    </>
  );
};

export default KOLLeaderboard;
