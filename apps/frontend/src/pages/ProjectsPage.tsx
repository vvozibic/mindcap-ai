import React, { useEffect, useState } from "react";
import { FeaturedProjects } from "../components/FeaturedProjects";
import ProjectDetailOverlay from "../components/ProjectDetailOverlay";
import { Skeleton } from "../components/Skeleton";
import { Project } from "../types";

interface ProjectsPageProps {
  isAuthenticated: boolean;
  onLogin: () => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  isAuthenticated,
  onLogin,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOverlayOpen, setIsDetailOverlayOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/api/projects/featured")
      .then((res) => res.json())
      .then(setFeaturedProjects)
      .catch(console.error);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOverlayOpen(true);
  };

  const closeDetailOverlay = () => {
    setIsDetailOverlayOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FeaturedProjects
        projects={featuredProjects}
        handleOpenProject={(p) => handleProjectClick(p)}
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-100 sm:text-4xl">
          Top Global Mindshare
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">
          Explore top Web3 projects and their attention metrics
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {!projects.length && (
          <>
            <Skeleton height="150px" />
            <Skeleton height="150px" />
            <Skeleton height="150px" />
            <Skeleton height="150px" />
            <Skeleton height="150px" />
            <Skeleton height="150px" />
          </>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="bg-primary-800 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-primary-700 transition-colors cursor-pointer border border-primary-700 hover:border-accent-500"
          >
            <img
              src={project.avatarUrl}
              alt={project.name}
              className="w-12 h-12 rounded-full mb-2"
            />
            <h3 className="text-sm font-medium text-center text-gray-200">
              {project.name}
            </h3>
          </div>
        ))}
      </div>

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

export default ProjectsPage;
