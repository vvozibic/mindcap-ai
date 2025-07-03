import React, { useState } from "react";
import ProjectDetailOverlay from "../components/ProjectDetailOverlay";
import ProtokolsProjectsTable from "../components/ProtokolsProject/ProtokolsProjects";
import { Project } from "../types";

interface ProjectsPageProps {
  isAuthenticated: boolean;
  onLogin: () => void;
}

const ProtokolsProjectsPage: React.FC<ProjectsPageProps> = ({
  isAuthenticated,
  onLogin,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOverlayOpen, setIsDetailOverlayOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOverlayOpen(true);
  };

  const closeDetailOverlay = () => {
    setIsDetailOverlayOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProtokolsProjectsTable />

      <div className="mt-12 bg-primary-800 rounded-lg shadow-lg p-6 border border-primary-700">
        <h2 className="text-xl font-bold text-gray-100 mb-4">For Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-200">Gain KOL Attention</h3>
            <p className="mt-2 text-sm text-gray-400">
              Connect with the most influential voices in Web3 and increase your
              project's visibility.
            </p>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-200">Stimulate Engagement</h3>
            <p className="mt-2 text-sm text-gray-400">
              Create incentives for consistent, high-quality engagement from the
              community.
            </p>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-200">Performance Analytics</h3>
            <p className="mt-2 text-sm text-gray-400">
              Access detailed metrics on your project's attention performance
              and community reach.
            </p>
          </div>

          <div className="bg-primary-700 p-4 rounded-lg">
            <h3 className="font-medium text-gray-200">Build Trust</h3>
            <p className="mt-2 text-sm text-gray-400">
              Establish credibility through transparent leaderboard rankings and
              verified metrics.
            </p>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailOverlay
          isOpen={isDetailOverlayOpen}
          onClose={closeDetailOverlay}
          project={selectedProject}
          isAuthenticated={isAuthenticated}
          onLogin={onLogin}
        />
      )}
    </div>
  );
};

export default ProtokolsProjectsPage;
