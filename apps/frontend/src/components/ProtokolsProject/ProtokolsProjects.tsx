import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatNumber";
import ProjectDetailOverlay from "../ProjectDetailOverlay";
import { ProtokolsProject } from "./types";

const ProtokolsProjectsTable: React.FC = () => {
  const [projects, setProjects] = useState<ProtokolsProject[]>([]);
  const [sortField, setSortField] =
    useState<keyof ProtokolsProject>("mindsharePercent");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [selectedProject, setSelectedProject] =
    useState<ProtokolsProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: ProtokolsProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch("/api/p-projects")
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const handleSort = (field: keyof ProtokolsProject) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (sortDirection === "asc") {
      return +aValue > +bValue ? 1 : -1;
    } else {
      return +aValue < +bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-primary-800 rounded-lg shadow-lg overflow-hidden border border-primary-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-primary-700">
          <thead className="bg-primary-700">
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
          <tbody className="bg-primary-800 divide-y divide-primary-700">
            {sortedProjects.map((proj) => (
              <tr
                key={proj.id}
                className="hover:bg-primary-600 transition-colors cursor-pointer"
                onClick={() => handleProjectClick(proj)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-start gap-3">
                    <img
                      src={proj.avatarUrl || "/default-avatar.png"}
                      className="h-10 w-10 rounded-full"
                      alt={proj.name}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-200">
                        {proj.name}
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
                  {proj.mindsharePercent?.toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-sm text-gray-200">
                  {proj.followersCount?.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-200">
                  {proj.totalViews?.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-200">
                  {proj.marketCap ? `$${formatNumber(proj.marketCap)}` : "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-200">
                  {proj.price ? `$${proj.price.toFixed(2)}` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProjectDetailOverlay
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        isAuthenticated={true} // или подключи авторизацию
        onLogin={() => {}}
      />
    </div>
  );
};

export default ProtokolsProjectsTable;
