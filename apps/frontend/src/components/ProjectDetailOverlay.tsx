import { Dialog, Transition } from "@headlessui/react";
import {
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  Info,
  Newspaper,
  TrendingUp,
  Upload,
  Users,
  X,
} from "lucide-react";
import React, { Fragment, useState } from "react";
import { Influencer } from "../types";
import { ProtokolsProject } from "./ProtokolsProject/types";

interface ProjectDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProtokolsProject | null;
  isAuthenticated: boolean;
  onLogin: () => void;
}

interface ProjectPool {
  id: string;
  title: string;
  description: string;
  rewardType: "fixed" | "cpm";
  rewardAmount: number; // Fixed amount or CPM rate
  totalReward: number;
  remainingReward: number;
  deadline: string;
  requirements: string[];
  platforms: string[];
  status: "active" | "completed" | "upcoming";
  participantsCount: number;
  completedCount: number;
  estimatedViews?: number; // For CPM pools
}

// Mock project pools data
const getProjectPools = (projectId: string): ProjectPool[] => {
  return [
    {
      id: "1",
      title: "Create a Video Review",
      description:
        "Create a comprehensive video review of our platform highlighting key features and benefits. You will earn $2 for every 1000 views your content receives.",
      rewardType: "cpm",
      rewardAmount: 2, // $2 per 1000 views (CPM)
      totalReward: 10000,
      remainingReward: 7500,
      deadline: "2025-07-15",
      requirements: [
        "Minimum 5 minutes video length",
        "Must cover core features",
        "Include personal experience",
        "Mention pros and cons",
      ],
      platforms: ["YouTube", "TikTok"],
      status: "active",
      participantsCount: 12,
      completedCount: 5,
      estimatedViews: 250000, // Estimated total views for the campaign
    },
    {
      id: "2",
      title: "Twitter Thread Campaign",
      description:
        "Create an educational Twitter thread explaining how our technology works and its advantages.",
      rewardType: "fixed",
      rewardAmount: 250,
      totalReward: 5000,
      remainingReward: 3750,
      deadline: "2025-07-10",
      requirements: [
        "Minimum 10 tweets in thread",
        "Include relevant hashtags",
        "Explain technical concepts simply",
        "Include at least one diagram or visual",
      ],
      platforms: ["Twitter"],
      status: "active",
      participantsCount: 8,
      completedCount: 5,
    },
    {
      id: "3",
      title: "Community AMA Hosting",
      description:
        "Host an AMA session with your community about our project and its ecosystem.",
      rewardType: "fixed",
      rewardAmount: 750,
      totalReward: 3000,
      remainingReward: 1500,
      deadline: "2025-07-20",
      requirements: [
        "Minimum 45 minutes session",
        "At least 50 participants",
        "Cover prepared questions",
        "Record and share the session",
      ],
      platforms: ["Twitter Spaces", "Discord"],
      status: "upcoming",
      participantsCount: 2,
      completedCount: 0,
    },
  ];
};

// Get top KOLs for a project (mock data)
const getTopKOLsForProject = (projectId: string): Influencer[] => {
  // In a real app, this would filter KOLs based on their engagement with this specific project
  // For now, we'll just return the top 5 KOLs from our mock data
  return [];
  // return mockKOLs.slice(0, 5);
};

const ProjectDetailOverlay: React.FC<ProjectDetailOverlayProps> = ({
  isOpen,
  onClose,
  project,
  isAuthenticated,
  onLogin,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "pools">("overview");
  const [selectedPool, setSelectedPool] = useState<ProjectPool | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionUrl, setSubmissionUrl] = useState<string>("");
  const [submissionNotes, setSubmissionNotes] = useState<string>("");
  const [estimatedViews, setEstimatedViews] = useState<string>("");
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  if (!project) return null;

  const projectPools = getProjectPools(project.id);
  const topKOLs = getTopKOLsForProject(project.id);

  const handlePoolSelect = (pool: ProjectPool) => {
    setSelectedPool(pool);
    setEstimatedViews("");
  };

  const handleBackToList = () => {
    setSelectedPool(null);
    setSubmissionUrl("");
    setSubmissionNotes("");
    setEstimatedViews("");
    setIsSubmitting(false);
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    alert("Submission received! It will be reviewed by the project team.");
    handleBackToList();
  };

  // Calculate estimated earnings for CPM model
  const calculateEstimatedEarnings = (views: string, cpmRate: number) => {
    const viewsNum = parseInt(views.replace(/,/g, ""), 10);
    if (isNaN(viewsNum)) return 0;
    return (viewsNum / 1000) * cpmRate;
  };

  const formatEstimatedViews = (input: string) => {
    // Remove non-numeric characters
    const numericValue = input.replace(/[^0-9]/g, "");

    // Format with commas
    if (numericValue) {
      const number = parseInt(numericValue, 10);
      return number.toLocaleString();
    }
    return "";
  };

  const handleEstimatedViewsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formattedValue = formatEstimatedViews(e.target.value);
    setEstimatedViews(formattedValue);
  };

  const showTooltip = (id: string) => {
    setTooltipVisible(id);
  };

  const hideTooltip = () => {
    setTooltipVisible(null);
  };

  const tooltips = {
    mindshare: "Overall attention score based on multiple factors",
    pow: "Quantity of relevant posts",
    poi: "Originality and depth of content",
    poe: "Engagement quality based on reputable influence",
    smartFollowers: "Weighted followercount based on quality and engagement",
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-primary-800 p-6 text-left align-middle shadow-xl transition-all border border-primary-700">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center mb-6 pb-4 border-b border-primary-700">
                  <img
                    src={project?.avatarUrl || "/default-project-avatar.png"}
                    alt={project.name}
                    className="h-16 w-16 rounded-full border-2 border-accent-500"
                  />
                  <div className="ml-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-white"
                    >
                      {project.name}
                    </Dialog.Title>
                    {/* <p className="text-gray-300">{project.description}</p> */}
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
                        {
                          projectPools.filter((p) => p.status === "active")
                            .length
                        }
                      </span>
                    </button>
                  </nav>
                </div>

                {activeTab === "overview" ? (
                  <div className="space-y-8">
                    {/* Top KOLs for this project - Now at the top and spanning full width */}
                    <div className="col-span-2">
                      <h5 className="text-lg font-medium text-gray-300 mb-3">
                        Top KOLs Engaging with {project.name}
                      </h5>
                      <div className="bg-primary-700 rounded-lg overflow-hidden">
                        <div className="p-4 bg-primary-600">
                          <h6 className="text-sm font-medium text-white">
                            KOL Leaderboard
                          </h6>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-primary-600">
                            <thead className="bg-primary-600">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                >
                                  Rank
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                >
                                  Influencer
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider relative"
                                >
                                  <div className="flex items-center">
                                    Mindshare
                                    <Info
                                      className="h-3 w-3 ml-1 text-gray-500 cursor-help"
                                      onMouseEnter={() =>
                                        showTooltip("mindshare")
                                      }
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
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider relative"
                                >
                                  <div className="flex items-center">
                                    PoW
                                    <Info
                                      className="h-3 w-3 ml-1 text-gray-500 cursor-help"
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
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider relative"
                                >
                                  <div className="flex items-center">
                                    PoI
                                    <Info
                                      className="h-3 w-3 ml-1 text-gray-500 cursor-help"
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
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider relative"
                                >
                                  <div className="flex items-center">
                                    PoE
                                    <Info
                                      className="h-3 w-3 ml-1 text-gray-500 cursor-help"
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
                                  className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                >
                                  <div className="flex items-center">
                                    Smart Followers
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-primary-600">
                              {topKOLs?.map((kol, index) => (
                                <tr
                                  key={kol.id}
                                  className={
                                    index % 2 === 0
                                      ? "bg-primary-700"
                                      : "bg-primary-600"
                                  }
                                >
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                    #{kol.rank}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <img
                                        className="h-6 w-6 rounded-full"
                                        src={
                                          kol?.avatarUrl ||
                                          "/default-avatar.png"
                                        }
                                        alt={kol.name}
                                      />
                                      <div className="ml-2">
                                        <div className="text-sm font-medium text-gray-200">
                                          {kol.name}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                          {kol.username}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                    {kol.mindshare}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                    {kol.pow}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                    {kol.poi}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                    {kol.poe}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                    {kol.smartFollowers?.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Project Information and Reward Pool - Now below the KOL leaderboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left Column - Project Information */}
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
                                  {project?.mindsharePercent?.toFixed(2)}
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
                                  {project?.followersCount?.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <Eye className="h-5 w-5 text-accent-500" />
                              <div className="ml-3">
                                <h6 className="text-xs font-medium text-gray-400">
                                  Views
                                </h6>
                                <p className="text-lg font-bold text-gray-200">
                                  {project?.totalViews?.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <Newspaper className="h-5 w-5 text-accent-500" />
                              <div className="ml-3">
                                <h6 className="text-xs font-medium text-gray-400">
                                  Posts
                                </h6>
                                <p className="text-lg font-bold text-gray-200">
                                  {project?.totalViews?.toLocaleString()}
                                </p>
                              </div>
                            </div>
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

                        <h5 className="text-md font-medium text-gray-300 mb-3">
                          About the Project
                        </h5>
                        <div className="bg-primary-700 rounded-lg p-4 mb-6">
                          <p className="text-gray-300">{project.description}</p>
                          <div className="mt-4 pt-4 border-t border-primary-600">
                            <h6 className="text-sm font-medium text-gray-300 mb-2">
                              Categories
                            </h6>
                            <ul className="list-disc list-inside text-gray-400 space-y-1">
                              {project?.categories?.map((c: string) => (
                                <li>{c}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <h5 className="text-md font-medium text-gray-300 mb-3">
                          Social Channels
                        </h5>
                        <div className="bg-primary-700 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <a
                              href={project?.website || "/"}
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

                      {/* Right Column - Reward Pool */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-200 mb-4">
                          Reward Pool
                        </h4>

                        <div className="bg-primary-700 rounded-lg p-6 mb-6 border border-primary-600">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <DollarSign className="h-8 w-8 text-accent-500" />
                              <div className="ml-3">
                                <h5 className="text-sm font-medium text-gray-300">
                                  Total Reward Pool
                                </h5>
                                <p className="text-3xl font-bold text-white">
                                  ${project?.rewardPoolUsd?.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="bg-primary-800 rounded-lg p-3">
                              <p className="text-xs text-gray-400">Rank</p>
                              <p className="text-xl font-bold text-white">
                                #{project.rewardRank}
                              </p>
                            </div>
                          </div>

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
                                        {pool.rewardType === "cpm"
                                          ? `Reward: $${pool.rewardAmount} per 1,000 views (CPM)`
                                          : `Reward: $${pool.rewardAmount} per submission`}
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

                          <div className="mt-6 pt-6 border-t border-primary-600">
                            <h6 className="text-sm font-medium text-gray-300 mb-2">
                              How It Works
                            </h6>
                            <ol className="list-decimal list-inside text-gray-400 space-y-2">
                              <li>Browse available project pools</li>
                              <li>
                                Select a campaign that matches your skills
                              </li>
                              <li>Create and submit your content</li>
                              <li>Get rewarded based on performance</li>
                            </ol>

                            <button
                              onClick={() => setActiveTab("pools")}
                              className="mt-4 w-full bg-accent-500 hover:bg-accent-600 text-primary-900 py-2 rounded-md text-sm font-medium"
                            >
                              View All Project Pools
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

                        <div className="bg-primary-700 rounded-lg p-6 mb-6 border border-primary-600">
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
                                  {new Date(
                                    selectedPool.deadline
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
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
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-md font-medium text-gray-300 mb-2">
                              Description
                            </h4>
                            <p className="text-gray-300">
                              {selectedPool.description}
                            </p>
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

                              {selectedPool.rewardType === "cpm" && (
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
                              )}
                            </div>

                            <div>
                              <h4 className="text-md font-medium text-gray-300 mb-2">
                                Platforms
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedPool.platforms.map(
                                  (platform, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-gray-200"
                                    >
                                      {platform}
                                    </span>
                                  )
                                )}
                              </div>

                              <div className="mt-4">
                                <h4 className="text-md font-medium text-gray-300 mb-2">
                                  Pool Status
                                </h4>
                                <div className="bg-primary-600 rounded-lg p-3">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">
                                      Total Pool
                                    </span>
                                    <span className="text-white">
                                      $
                                      {selectedPool.totalReward.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">
                                      Remaining
                                    </span>
                                    <span className="text-white">
                                      $
                                      {selectedPool.remainingReward.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                      Participants
                                    </span>
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
                                          (1 -
                                            selectedPool.remainingReward /
                                              selectedPool.totalReward) *
                                          100
                                        }%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>

                                {selectedPool.rewardType === "cpm" &&
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
                                  )}
                              </div>
                            </div>
                          </div>

                          {isAuthenticated ? (
                            isSubmitting ? (
                              <div className="mt-6 pt-6 border-t border-primary-600">
                                <h4 className="text-md font-medium text-gray-300 mb-4">
                                  Submit Your Content
                                </h4>

                                <div className="space-y-4">
                                  <div>
                                    <label
                                      htmlFor="contentUrl"
                                      className="block text-sm font-medium text-gray-300 mb-1"
                                    >
                                      Content URL{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      id="contentUrl"
                                      className="w-full bg-primary-600 border border-primary-500 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
                                      placeholder="https://..."
                                      value={submissionUrl}
                                      onChange={(e) =>
                                        setSubmissionUrl(e.target.value)
                                      }
                                    />
                                    <p className="mt-1 text-xs text-gray-400">
                                      Paste the URL to your content (YouTube
                                      video, Twitter thread, etc.)
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
                                      onChange={(e) =>
                                        setSubmissionNotes(e.target.value)
                                      }
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
                              <div className="mt-6 pt-6 border-t border-primary-600 flex justify-between items-center">
                                <div>
                                  <h4 className="text-md font-medium text-gray-300">
                                    Ready to participate?
                                  </h4>
                                  <p className="text-sm text-gray-400">
                                    {selectedPool.rewardType === "cpm"
                                      ? "Submit your content and earn based on views"
                                      : "Submit your content and earn rewards"}
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
                            <div className="mt-6 pt-6 border-t border-primary-600">
                              <div className="bg-primary-600 p-4 rounded-lg text-center">
                                <h4 className="text-md font-medium text-gray-300 mb-2">
                                  Sign in to participate
                                </h4>
                                <p className="text-sm text-gray-400 mb-4">
                                  You need to sign in to submit content and earn
                                  rewards from this project pool.
                                </p>
                                <button
                                  onClick={onLogin}
                                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium"
                                >
                                  Sign In
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-white">
                            Available Project Pools
                          </h3>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">
                              Total Reward Pool
                            </p>
                            <p className="text-2xl font-bold text-white">
                              ${project?.rewardPoolUsd?.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {projectPools.map((pool) => (
                            <div
                              key={pool.id}
                              className="bg-primary-700 rounded-lg p-5 border border-primary-600 hover:border-accent-500 transition-colors cursor-pointer"
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
                                  <p className="text-xs text-gray-400">
                                    Reward
                                  </p>
                                  <p className="text-lg font-bold text-white">
                                    {pool.rewardType === "cpm"
                                      ? `$${pool.rewardAmount}/1K views`
                                      : `$${pool.rewardAmount}`}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">
                                    Deadline
                                  </p>
                                  <p className="text-sm text-gray-300">
                                    {new Date(
                                      pool.deadline
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-400">
                                    Platforms
                                  </p>
                                  <div className="flex space-x-1 mt-1">
                                    {pool.platforms
                                      .slice(0, 2)
                                      .map((platform, index) => (
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
                                    ${pool.remainingReward.toLocaleString()}{" "}
                                    remaining
                                  </span>
                                </div>
                                <div className="w-full bg-primary-800 rounded-full h-2">
                                  <div
                                    className="bg-accent-500 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        (1 -
                                          pool.remainingReward /
                                            pool.totalReward) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {!isAuthenticated && (
                          <div className="mt-8 bg-primary-700 p-5 rounded-lg border border-primary-600 text-center">
                            <h4 className="text-lg font-medium text-white mb-2">
                              Want to participate and earn rewards?
                            </h4>
                            <p className="text-gray-400 mb-4">
                              Sign in to submit content and earn rewards from
                              project pools.
                            </p>
                            <button
                              onClick={onLogin}
                              className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-6 py-2 rounded-md text-sm font-medium"
                            >
                              Sign In to Participate
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectDetailOverlay;
