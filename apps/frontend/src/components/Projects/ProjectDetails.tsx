import {
  Clock,
  DollarSign,
  ExternalLink,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { KOL, Project, RewardPool } from "../../types";
import { formatNumber } from "../../utils/formatNumber";
import InfluencerDetailOverlay from "../KOL/KOLDetailOverlay";
import { Skeleton } from "../Skeleton";
import { TableSkeleton } from "../TableSkeleton";
import XLogo from "../XLogo";

interface ProjectDetailOverlayProps {
  isOpen: boolean;
  isModal?: boolean;
  onClose: () => void;
  project: Project | null;
  activeTab: "overview" | "pools";
  setActiveTab: (t: "overview" | "pools") => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  projectPools: RewardPool[];
  topKOLs: KOL[];
  handleBackToList: () => void;
  selectedPool: RewardPool | null;
  handlePoolSelect: (p: RewardPool) => void;
  setSelectedPool: (p: RewardPool | null) => void;
}

const ProjectDetails: React.FC<ProjectDetailOverlayProps> = ({
  isOpen,
  onClose,
  isModal = true,
  project,
  activeTab,
  setActiveTab,
  isAuthenticated,
  onLogin,
  projectPools,
  topKOLs,
  setSelectedPool,
  handleBackToList,
  handlePoolSelect,
  selectedPool,
}) => {
  const [selectedKOL, setSelectedKOL] = useState<KOL | null>(null);
  const [isDetailOverlayOpen, setIsDetailOverlayOpen] = useState(false);

  const handleInfluencerClick = (kol: KOL) => {
    setSelectedKOL(kol);
    setIsDetailOverlayOpen(true);
  };

  const closeDetailOverlay = () => {
    setIsDetailOverlayOpen(false);
  };

  if (!project)
    return (
      <div>
        <Skeleton /> <TableSkeleton />
      </div>
    );

  return (
    <>
      <div className="flex items-center mb-1 pb-4 border-b border-primary-700">
        <img
          src={project?.twitterAvatarUrl || "/default-project-avatar.png"}
          alt={project.twitterUsername}
          className="h-16 w-16 rounded-full border-2 border-accent-500"
        />
        <div className="ml-4">
          <h3 className="text-xl font-bold text-white">
            {project.twitterDisplayName}
          </h3>
          <p className="text-gray-300">{project.twitterDescription}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-primary-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`${
              activeTab === "overview"
                ? "border-accent-500 text-accent-500"
                : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Project Overview
          </button>
          {Boolean(projectPools.length) && (
            <button
              onClick={() => setActiveTab("pools")}
              className={`${
                activeTab === "pools"
                  ? "border-accent-500 text-accent-500"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              Project Pools
              <span className="ml-2 bg-primary-600 text-accent-500 py-0.5 px-2 rounded-full text-xs">
                {projectPools.filter((p) => p.status === "active").length}
              </span>
            </button>
          )}
        </nav>
      </div>

      {/* Project Information and Reward Pool - Now below the KOL leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Project Information */}
        {activeTab === "overview" && (
          <div>
            <h4 className="text-lg font-medium text-gray-200 mb-4">
              Project Information
            </h4>

            <div className="bg-primary-700 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-accent-500" />
                  <div className="ml-3">
                    <h6 className="text-xs font-medium text-gray-400">
                      Mindshare
                    </h6>
                    <p className="text-lg font-bold text-gray-200">
                      {project?.mindshare?.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 text-accent-500" />
                  <div className="ml-3">
                    <h6 className="text-xs font-medium text-gray-400">
                      Followers
                    </h6>
                    <p className="text-lg font-bold text-gray-200">
                      {project?.twitterFollowersCount?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-center">
                  <Eye className="h-5 w-5 text-accent-500" />
                  <div className="ml-3">
                    <h6 className="text-xs font-medium text-gray-400">Views</h6>
                    <p className="text-lg font-bold text-gray-200">
                      {project?.totalViews?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Newspaper className="h-5 w-5 text-accent-500" />
                  <div className="ml-3">
                    <h6 className="text-xs font-medium text-gray-400">Posts</h6>
                    <p className="text-lg font-bold text-gray-200">
                      {project?.totalPosts?.toLocaleString()}
                    </p>
                  </div>
                </div> */}
              </div>

              <div className="flex items-center">
                <div className="mt-3">
                  <h6 className="text-xs font-medium text-gray-400">
                    Narratives
                  </h6>
                  <div className="flex gap-2 mt-2">
                    {project?.narrativeLinks?.map((link, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-600 text-gray-100 text-xs px-2 py-0.5 rounded-full"
                      >
                        {link.narrative.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <h5 className="text-md font-medium text-gray-300 mb-3">
                          About the Project
                        </h5>
                        <div className="bg-primary-700 rounded-lg p-4 mb-6">
                          <p className="text-gray-300">{project.twitterDescription}</p>
                          <div className="mt-4 pt-4 border-t border-primary-700">
                            <h6 className="text-sm font-medium text-gray-300 mb-2">
                              Categories
                            </h6>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                              {project?.categories?.map((c: string) => (
                                <li>{c}</li>
                              ))}
                            </ul>
                          </div>
                        </div> */}

            <h5 className="text-md font-medium text-gray-300 mb-3">
              Social Channels
            </h5>
            <div className="bg-primary-700 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`https://x.com/${project.twitterUsername}` || "/"}
                  target="_blank"
                  className="flex items-center text-gray-300 hover:text-accent-500"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </a>
                {/* <a
                              href="#"
                              className="flex items-center text-gray-300 hover:text-accent-500"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Twitter
                            </a>
                            <a
                              href="#"
                              className="flex items-center text-gray-300 hover:text-accent-500"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Discord
                            </a>
                            <a
                              href="#"
                              className="flex items-center text-gray-300 hover:text-accent-500"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Telegram
                            </a> */}
              </div>
            </div>
          </div>
        )}

        {/* Right Column - Reward Pool */}
        {(project.rewardPools.length > 0 || project.featured) &&
          activeTab === "overview" && (
            <div>
              <h4 className="text-lg font-medium text-gray-200 mb-4">
                Reward Pool
              </h4>

              <div className="bg-primary-700 rounded-lg p-6 mb-6 border border-primary-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-accent-500" />
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-gray-300">
                        Total Reward Pool
                      </h5>
                      <p className="text-3xl font-bold text-white">
                        {" "}
                        {project.rewardPools?.reduce(
                          (acc, pool) => acc + pool.totalAmountUsd,
                          0
                        )}
                      </p>
                    </div>
                  </div>
                  {/* <div className="bg-primary-800 rounded-lg p-3">
                              <p className="text-xs text-gray-400">Rank</p>
                              <p className="text-xl font-bold text-white">
                                #{project.rewardRank}
                              </p>
                            </div> */}
                </div>

                {!!projectPools?.length && (
                  <div className="mt-6">
                    <h6 className="text-sm font-medium text-gray-300 mb-3">
                      Active Campaigns
                    </h6>
                    <div className="space-y-3">
                      {projectPools
                        .filter((pool) => pool.status === "active")
                        .map((pool) => (
                          <div
                            key={pool.id}
                            className="bg-primary-600 rounded-lg p-3 flex justify-between items-center"
                          >
                            <div>
                              <p className="text-sm font-medium text-white">
                                {pool.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                {pool.reward}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setActiveTab("pools");
                                setSelectedPool(pool);
                              }}
                              className="bg-accent-500 hover:bg-accent-600 text-primary-900 text-xs px-3 py-1 rounded"
                            >
                              View Details
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-primary-700">
                  <h6 className="text-sm font-medium text-gray-300 mb-2">
                    How It Works
                  </h6>
                  <ol className="list-decimal list-inside text-gray-400 space-y-2">
                    <li>Browse available project pools</li>
                    <li>Select a campaign that matches your skills</li>
                    <li>Create and submit your content</li>
                    <li>Get rewarded based on performance</li>
                  </ol>

                  {!!projectPools.length && (
                    <button
                      onClick={() => setActiveTab("pools")}
                      className="mt-4 w-full bg-accent-500 hover:bg-accent-600 text-primary-900 py-2 rounded-md text-sm font-medium"
                    >
                      View All Project Pools
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
      </div>

      {activeTab === "overview" ? (
        <div className="space-y-8">
          {/* Top KOLs for this project - Now at the top and spanning full width */}
          {Boolean(topKOLs?.length) ? (
            <div className="col-span-2">
              <h5 className="text-lg font-medium text-gray-300 mb-3 mt-6">
                Top KOLs Engaging with {project.twitterUsername}
              </h5>
              <div className="bg-primary-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <div
                    className={`${
                      isModal ? "max-h-[300px]" : ""
                    } overflow-auto`}
                  >
                    <table className="min-w-full divide-y divide-primary-700">
                      <thead className="bg-primary-700 sticky top-0 z-10">
                        <tr>
                          <th className="pt-3 pr-0 pb-3 pl-6 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Rank
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            KOL
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Mindo score
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Smart Followers
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Followers
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Kol Score
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Engagement
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Posting Frequency
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-primary-800 divide-y divide-primary-700">
                        {topKOLs.map((kol, index) => (
                          <tr
                            onClick={() => handleInfluencerClick(kol)}
                            key={kol.id}
                            className={`hover:bg-primary-600 cursor-pointer transition-colors duration-150 ${
                              index % 2 === 0
                                ? "bg-primary-800"
                                : "bg-primary-700"
                            }`}
                          >
                            <td className="pt-3 pr-0 pb-3 pl-6 whitespace-nowrap text-sm font-medium text-white">
                              #{index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
                              <div className="flex items-center">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={
                                    kol.twitterAvatarUrl ||
                                    "/default-avatar.png"
                                  }
                                  alt={kol.twitterDisplayName}
                                />
                                <div className="ml-4 max-w-[300px]">
                                  <div className="text-sm font-medium text-white">
                                    {kol.twitterUsername}
                                  </div>
                                  <div className="text-sm text-text-muted">
                                    {kol.twitterDisplayName}
                                  </div>
                                  {/* <div className="flex mt-1 space-x-1">
                                    {kol.badges?.split(",").map((badge, i) => (
                                      <span
                                        key={i}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-600 text-accent-500"
                                      >
                                        {badge}
                                      </span>
                                    ))}
                                  </div> */}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                              {formatNumber(
                                Number(kol?.mindoMetric?.toFixed(2)) || 0
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {kol.smartFollowersCount?.toLocaleString() || "0"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {kol.twitterFollowersCount?.toLocaleString() ||
                                "0"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {kol.kolScore?.toLocaleString() || "0"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {kol?.engagementRate
                                ? `${kol.engagementRate.toFixed(2)}%`
                                : "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {kol?.postingFrequency
                                ? `~${kol.postingFrequency}/day`
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <TableSkeleton />
          )}
        </div>
      ) : (
        <div>
          {selectedPool ? (
            <div>
              <button
                onClick={handleBackToList}
                className="flex items-center text-gray-400 hover:text-gray-300 mb-4"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to all pools
              </button>

              <div className="bg-primary-700 rounded-lg p-6 mb-6 border border-primary-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedPool.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedPool.status === "active"
                            ? "bg-green-900 text-green-200"
                            : selectedPool.status === "upcoming"
                              ? "bg-blue-900 text-blue-200"
                              : "bg-gray-700 text-gray-200"
                        }`}
                      >
                        {selectedPool.status === "active"
                          ? "Active"
                          : selectedPool.status === "upcoming"
                            ? "Upcoming"
                            : "Completed"}
                      </span>
                      <span className="ml-2 text-gray-400 text-sm">
                        <Clock className="inline-block h-4 w-4 mr-1" />
                        Deadline:{" "}
                        {new Date(selectedPool.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {/* <div className="text-right">
                              {selectedPool.rewardType === "cpm" ? (
                                <div>
                                  <p className="text-sm text-gray-400">
                                    Reward Rate
                                  </p>
                                  <p className="text-2xl font-bold text-white">
                                    ${selectedPool.rewardAmount}/1K views
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-sm text-gray-400">
                                    Reward per submission
                                  </p>
                                  <p className="text-2xl font-bold text-white">
                                    ${selectedPool.rewardAmount}
                                  </p>
                                </div>
                              )}
                            </div> */}
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-300 mb-2">
                    Description
                  </h4>
                  <p className="text-gray-300">{selectedPool.description}</p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-300 mb-2">
                      Requirements
                    </h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {selectedPool.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>

                    {/* {selectedPool.rewardType === "cpm" && (
                                <div className="mt-4 p-3 bg-primary-600 rounded-lg">
                                  <h5 className="text-sm font-medium text-gray-300 mb-2">
                                    Earnings Calculator
                                  </h5>
                                  <div className="flex items-center mb-2">
                                    <Eye className="h-4 w-4 text-gray-400 mr-2" />
                                    <input
                                      type="text"
                                      placeholder="Estimated views"
                                      value={estimatedViews}
                                      onChange={handleEstimatedViewsChange}
                                      className="bg-primary-700 border border-primary-500 rounded px-3 py-1 text-sm text-gray-200 w-full"
                                    />
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                      Estimated earnings:
                                    </span>
                                    <span className="text-accent-500 font-medium">
                                      $
                                      {calculateEstimatedEarnings(
                                        estimatedViews,
                                        selectedPool.rewardAmount
                                      ).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                    </span>
                                  </div>
                                </div>
                              )} */}
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-300 mb-2">
                      Platforms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPool.platforms.map((platform, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-gray-200"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <h4 className="text-md font-medium text-gray-300 mb-2">
                        Pool Status
                      </h4>
                      <div className="bg-primary-600 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Total Pool</span>
                          <span className="text-white">
                            ${selectedPool.totalAmountUsd.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Remaining</span>
                          <span className="text-white">
                            ${" "}
                            {selectedPool.totalAmountUsd -
                              selectedPool.paidOutUsd}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Participants</span>
                          <span className="text-white">
                            {selectedPool.participantsCount} (
                            {selectedPool.completedCount} completed)
                          </span>
                        </div>

                        <div className="mt-3 w-full bg-primary-800 rounded-full h-2.5">
                          <div
                            className="bg-accent-500 h-2.5 rounded-full"
                            style={{
                              width: `${
                                (selectedPool.paidOutUsd /
                                  selectedPool.totalAmountUsd) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* {selectedPool.rewardType === "cpm" &&
                                  selectedPool.estimatedViews && (
                                    <div className="mt-3">
                                      <div className="flex justify-between text-xs text-gray-400">
                                        <span>Campaign Target</span>
                                        <span>
                                          {selectedPool.estimatedViews.toLocaleString()}{" "}
                                          views
                                        </span>
                                      </div>
                                    </div>
                                  )} */}
                    </div>
                  </div>
                </div>

                {/* {isAuthenticated ? (
                  isSubmitting ? (
                    <div className="mt-6 pt-6 border-t border-primary-700">
                      <h4 className="text-md font-medium text-gray-300 mb-4">
                        Submit Your Content
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="contentUrl"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            Content URL <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="contentUrl"
                            className="w-full bg-primary-600 border border-primary-500 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
                            placeholder="https://..."
                            value={submissionUrl}
                            onChange={(e) => setSubmissionUrl(e.target.value)}
                          />
                          <p className="mt-1 text-xs text-gray-400">
                            Paste the URL to your content (YouTube video,
                            Twitter thread, etc.)
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="notes"
                            className="block text-sm font-medium text-gray-300 mb-1"
                          >
                            Additional Notes
                          </label>
                          <textarea
                            id="notes"
                            rows={3}
                            className="w-full bg-primary-600 border border-primary-500 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
                            placeholder="Any additional information about your submission..."
                            value={submissionNotes}
                            onChange={(e) => setSubmissionNotes(e.target.value)}
                          ></textarea>
                        </div>

                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setIsSubmitting(false)}
                            className="px-4 py-2 border border-primary-500 rounded-md text-gray-300 hover:bg-primary-600"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSubmit}
                            disabled={!submissionUrl.trim()}
                            className={`px-4 py-2 rounded-md text-primary-900 ${
                              submissionUrl.trim()
                                ? "bg-accent-500 hover:bg-accent-600"
                                : "bg-accent-500 opacity-50 cursor-not-allowed"
                            }`}
                          >
                            Submit Content
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 pt-6 border-t border-primary-700 flex justify-between items-center">
                      <div>
                        <h4 className="text-md font-medium text-gray-300">
                          Ready to participate?
                        </h4>
                        <p className="text-sm text-gray-400">
                          Submit your content and earn rewards
                        </p>
                      </div>
                      <button
                        onClick={() => setIsSubmitting(true)}
                        className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium flex items-center"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Content
                      </button>
                    </div>
                  )
                ) : (
                  <div className="mt-6 pt-6 border-t border-primary-700">
                    <div className="bg-primary-600 p-4 rounded-lg text-center">
                      <h4 className="text-md font-medium text-gray-300 mb-2">
                        Sign in to participate
                      </h4>
                      <p className="text-sm text-gray-400 mb-4">
                        You need to sign in to submit content and earn rewards
                        from this project pool.
                      </p>
                      <button
                        onClick={onLogin}
                        className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Login with <XLogo className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  Available Project Pools
                </h3>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Reward Pool</p>
                  <p className="text-2xl font-bold text-white">
                    $
                    {project.rewardPools?.reduce(
                      (acc, pool) => acc + pool.totalAmountUsd,
                      0
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectPools.map((pool) => (
                  <div
                    key={pool.id}
                    className="bg-primary-700 rounded-lg p-5 border border-primary-700 hover:border-accent-500 transition-colors cursor-pointer"
                    onClick={() => handlePoolSelect(pool)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-white">
                        {pool.title}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          pool.status === "active"
                            ? "bg-green-900 text-green-200"
                            : pool.status === "upcoming"
                              ? "bg-blue-900 text-blue-200"
                              : "bg-gray-700 text-gray-200"
                        }`}
                      >
                        {pool.status === "active"
                          ? "Active"
                          : pool.status === "upcoming"
                            ? "Upcoming"
                            : "Completed"}
                      </span>
                    </div>

                    <p className="mt-2 text-gray-400 text-sm line-clamp-2">
                      {pool.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Reward</p>
                        <p className="text-lg font-bold text-white">
                          {pool.reward}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Deadline</p>
                        <p className="text-sm text-gray-300">
                          {new Date(pool.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Platforms</p>
                        <div className="flex space-x-1 mt-1">
                          {pool.platforms.slice(0, 2).map((platform, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-0.5 bg-primary-600 rounded text-xs text-gray-300"
                            >
                              {platform}
                            </span>
                          ))}
                          {pool.platforms.length > 2 && (
                            <span className="inline-block px-2 py-0.5 bg-primary-600 rounded text-xs text-gray-300">
                              +{pool.platforms.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Pool Progress</span>
                        <span>
                          ${pool.totalAmountUsd - pool.paidOutUsd} remaining
                        </span>
                      </div>
                      <div className="w-full bg-primary-800 rounded-full h-2">
                        <div
                          className="bg-accent-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (pool.paidOutUsd / pool.totalAmountUsd) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!isAuthenticated && (
                <div className="mt-8 bg-primary-700 p-5 rounded-lg border border-primary-700 text-center">
                  <h4 className="text-lg font-medium text-white mb-2">
                    Want to participate and earn rewards?
                  </h4>
                  <p className="text-gray-400 mb-4">
                    Sign in to submit content and earn rewards from project
                    pools.
                  </p>
                  <button
                    onClick={onLogin}
                    className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-6 py-2 rounded-md text-sm font-medium"
                  >
                    Login with <XLogo /> to Participate
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <InfluencerDetailOverlay
        isOpen={isDetailOverlayOpen}
        onClose={closeDetailOverlay}
        kol={selectedKOL}
        allKOLs={topKOLs.filter((k) => k && k.id)}
      />
    </>
  );
};

export default ProjectDetails;
