import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProjectDetails from "../components/Projects/ProjectDetails";
import { Skeleton } from "../components/Skeleton";
import { TableSkeleton } from "../components/TableSkeleton";
import { KOL, Project, RewardPool } from "../types";
import { daysBetween } from "../utils/daysBetween";

const fetchProject = async ({ slug }: { slug: string }) => {
  const res = await fetch(`/api/p-projects/slug/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return await res.json();
};

export function useProjectInfluencers(projectId: string | null | undefined) {
  const [influencers, setInfluencers] = useState<KOL[]>([]);
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

const ProjectPage = () => {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const initialTab = (params.get("tab") || "overview") as "pools" | "overview";

  const [project, setProject] = useState<Project | null>(null);
  const [activeOverlayTab, setActiveOverlayTab] = useState<
    "overview" | "pools"
  >(initialTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    fetch(`/api/p-projects/slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load influencers");
        return res.json();
      })
      .then(setProject)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const [selectedPool, setSelectedPool] = useState<RewardPool | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionUrl, setSubmissionUrl] = useState<string>("");
  const [submissionNotes, setSubmissionNotes] = useState<string>("");
  const [estimatedViews, setEstimatedViews] = useState<string>("");
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  const { influencers } = useProjectInfluencers(project?.id);

  if (!project)
    return (
      <div className="max-w-7xl py-6 px-4 sm:px-6 mx-auto mt-[50px] relative z-10 overflow-hidden rounded-xl border border-primary-700/40 bg-primary-800/30 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(0,255,174,0.05),0_8px_20px_rgba(0,255,174,0.05)]">
        <Skeleton /> <TableSkeleton />
      </div>
    );

  const projectPools = project.rewardPools || [];

  const topKOLs = influencers.map((i) => {
    const realPostingFrequency = Number(
      (i?.totalPosts || 0) / daysBetween(i.twitterCreatedAt, new Date())
    );

    const postingFrequency =
      realPostingFrequency > 0 && realPostingFrequency < 1
        ? 1
        : Math.round(realPostingFrequency)?.toFixed(0);

    return {
      ...i,
      mindshare: (+(i?.mindshare || 0) * 100).toFixed(2),
      postingFrequency: postingFrequency,
    };
  });

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
    <>
      <div className="max-w-7xl py-6 px-4 sm:px-6 mx-auto mt-[50px] relative z-10 overflow-hidden rounded-xl border border-primary-700/40 bg-primary-800/40 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(0,255,174,0.05),0_8px_20px_rgba(0,255,174,0.05)]">
        <button
          onClick={() => navigate("/projects")}
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
          Back to all projects
        </button>
        <ProjectDetails
          isOpen={true}
          isModal={false}
          onClose={() => {}}
          onLogin={() => {}}
          isAuthenticated={true}
          activeTab={activeOverlayTab}
          setActiveTab={setActiveOverlayTab}
          projectPools={projectPools}
          project={project}
          topKOLs={topKOLs}
          selectedPool={selectedPool}
          handleBackToList={handleBackToList}
          handlePoolSelect={handlePoolSelect}
          setSelectedPool={setSelectedPool}
        />
      </div>
    </>
  );
};

export default ProjectPage;
