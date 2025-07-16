import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { Influencer, ProtokolsProject, RewardPool } from "../../types";
import { daysBetween } from "../../utils/daysBetween";
import ProjectDetails from "./ProjectDetails";

interface ProjectDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProtokolsProject | null;
  activeTab: "overview" | "pools";
  setActiveTab: (t: "overview" | "pools") => void;
  isAuthenticated: boolean;
  onLogin: () => void;
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

export function useProjectInfluencers(projectId: string | null | undefined) {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    fetch(`/api/p-projects/${projectId}/influencers`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load influencers");
        return res.json();
      })
      .then(setInfluencers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [projectId]);

  return { influencers, loading, error };
}

const ProjectDetailOverlay: React.FC<ProjectDetailOverlayProps> = ({
  isOpen,
  onClose,
  project,
  activeTab,
  setActiveTab,
  isAuthenticated,
  onLogin,
}) => {
  const [selectedPool, setSelectedPool] = useState<RewardPool | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionUrl, setSubmissionUrl] = useState<string>("");
  const [submissionNotes, setSubmissionNotes] = useState<string>("");
  const [estimatedViews, setEstimatedViews] = useState<string>("");
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  const { influencers, loading, error } = useProjectInfluencers(project?.id);

  if (!project) return null;

  const projectPools = project.rewardPools || [];
  const topKOLs = influencers.map((i) => ({
    ...i,
    postingFrequency: Number(
      i?.tweetsCountNumeric / daysBetween(i.twitterRegisterDate, new Date())
    )?.toFixed(0),
  }));

  const handlePoolSelect = (pool: RewardPool) => {
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
    mindshare: "Overall mindshare based on AI",
    avgLikes: "Average likes",
    engagementRate: "Engagement rate",
    postingFrequency: "Posts by day",
    smartFollowers: "Weighted followercount based on quality and engagement",
    followers: "Raw follower count",
    moneyScore: "Financial reputation score",
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

                <ProjectDetails
                  isOpen={isOpen}
                  onClose={onClose}
                  onLogin={onLogin}
                  isAuthenticated={true}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  projectPools={projectPools}
                  project={project}
                  topKOLs={topKOLs}
                  selectedPool={selectedPool}
                  handleBackToList={handleBackToList}
                  handlePoolSelect={handlePoolSelect}
                  setSelectedPool={setSelectedPool}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectDetailOverlay;
