import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types";
import { formatNumber } from "../../utils/formatNumber";
import Pagination from "../Pagination";
import { TableSkeleton } from "../TableSkeleton";
import { usePaginatedData } from "../usePaginatedData";
import { FeaturedProjects } from "./FeaturedProjects";
import ProjectDetailOverlay from "./ProjectDetailOverlay";

const fetchPaginatedProjects = async ({
  page,
  limit,
  sortField,
  sortDirection,
}: {
  page: number;
  limit: number;
  sortField: string;
  sortDirection: string;
}) => {
  const res = await fetch(
    `/api/p-projects/paginate?page=${page}&limit=${limit}&sortField=${sortField}&sortDirection=${sortDirection}`
  );
  if (!res.ok) throw new Error("Failed to fetch projects");
  return await res.json();
};

type SortField =
  | "mindsharePercent"
  | "followersCount"
  | "totalViews"
  | "marketCap"
  | "price";

const ProjectsTable: React.FC = () => {
  const [activeOverlayTab, setActiveOverlayTab] = useState<
    "overview" | "pools"
  >("overview");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  console.log(activeOverlayTab);

  const {
    data: projects,
    total,
    page,
    limit,
    sortField,
    sortDirection,
    loading,
    setPage,
    setSortField,
    setSortDirection,
  } = usePaginatedData<Project>(
    fetchPaginatedProjects,
    1,
    20,
    "mindsharePercent",
    "desc"
  );

  const handleProjectClick = (project: Project, tab?: "overview" | "pools") => {
    console.log(tab);

    if (tab === "pools") {
      navigate(`/projects/${project.twitterUsername}?tab=pools`);
    } else {
      navigate(`/projects/${project.twitterUsername}`);
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  // const handleSort = (field: keyof Project) => {
  //   if (field === sortField) {
  //     setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  //   } else {
  //     setSortField(field);
  //     setSortDirection("asc");
  //   }
  // };

  useEffect(() => {
    fetch("/api/p-projects/featured")
      .then((res) => res.json())
      .then(setFeaturedProjects)
      .catch(console.error);
  }, []);

  return (
    <>
      <FeaturedProjects
        projects={featuredProjects}
        handleOpenProject={handleProjectClick}
      />

      <div className="text-center pt-10 mb-8 ">
        <h1 className="text-3xl font-extrabold text-gray-100 sm:text-4xl">
          Top Global Mindshare
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">
          Explore top Web3 projects and their attention metrics
        </p>
      </div>

      {Boolean(!projects.length) ? (
        <TableSkeleton />
      ) : (
        <div
          className={`max-w-7xl mx-auto rounded-xl overflow-hidden border border-primary-700/20 bg-primary-700/80 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(0,255,174,0.09),transparent)] backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(0,255,174,0.05),0_8px_20px_rgba(0,255,174,0.05)] relative z-10 transition-opacity duration-300  ${
            loading ? "opacity-80 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="overflow-x-auto relative">
            <table className="min-w-full divide-y  divide-primary-700">
              <thead className="bg-primary-700/70 backdrop-blur-sm  top-0 border-b border-primary-700/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Project
                  </th>
                  <th
                    onClick={() => handleSort("mindsharePercent")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer"
                  >
                    Mindshare{" "}
                    {sortField === "mindsharePercent" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="inline h-4 w-4" />
                      ) : (
                        <ArrowDown className="inline h-4 w-4" />
                      ))}
                  </th>
                  <th
                    onClick={() => handleSort("followersCount")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer"
                  >
                    Followers{" "}
                    {sortField === "followersCount" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="inline h-4 w-4" />
                      ) : (
                        <ArrowDown className="inline h-4 w-4" />
                      ))}
                  </th>
                  <th
                    onClick={() => handleSort("totalViews")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer"
                  >
                    Views{" "}
                    {sortField === "totalViews" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="inline h-4 w-4" />
                      ) : (
                        <ArrowDown className="inline h-4 w-4" />
                      ))}
                  </th>
                  <th
                    onClick={() => handleSort("marketCap")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer"
                  >
                    Market Cap{" "}
                    {sortField === "marketCap" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="inline h-4 w-4" />
                      ) : (
                        <ArrowDown className="inline h-4 w-4" />
                      ))}
                  </th>
                  <th
                    onClick={() => handleSort("price")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer"
                  >
                    Price{" "}
                    {sortField === "price" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp className="inline h-4 w-4" />
                      ) : (
                        <ArrowDown className="inline h-4 w-4" />
                      ))}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-800/50 backdrop-blur-sm divide-y divide-primary-700/30">
                {projects.map((proj) => (
                  <tr
                    key={proj.id}
                    className="transition-colors cursor-pointer group hover:bg-primary-700/30 hover:ring-1 hover:ring-accent-500/20"
                    onClick={() => handleProjectClick(proj)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start gap-3">
                        <img
                          src={proj.twitterAvatarUrl || "/default-avatar.png"}
                          className="h-10 w-10 rounded-full"
                          alt={proj.twitterDisplayName}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-200 group-hover:text-accent-500 transition-colors duration-150">
                            {proj.twitterDisplayName}
                          </div>
                          <div className="flex gap-2 flex-wrap align-center">
                            <div className="text-sm text-gray-400">
                              @{proj.twitterUsername}
                            </div>
                            <div className="flex flex-wrap">
                              {proj.narrativeLinks
                                ?.sort(
                                  (a, b) =>
                                    (b.projectMindsharePercent || 0) -
                                    (a.projectMindsharePercent || 0)
                                )
                                .slice(0, 1)
                                .map((link, idx) => (
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
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      {proj.mindshare?.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      {proj.twitterFollowersCount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      {proj.totalViews?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      {proj.coinMarketCap
                        ? `$${formatNumber(proj.coinMarketCap)}`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      {proj.coinPrice ? `$${proj.coinPrice.toFixed(2)}` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ProjectDetailOverlay
        isOpen={isModalOpen}
        activeTab={activeOverlayTab}
        setActiveTab={setActiveOverlayTab}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        isAuthenticated={true}
        onLogin={() => {}}
      />

      {Boolean(projects.length) && (
        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default ProjectsTable;
