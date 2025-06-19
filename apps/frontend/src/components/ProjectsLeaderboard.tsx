import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import ProjectDetailOverlay from './ProjectDetailOverlay';

interface ProjectsLeaderboardProps {
  projects: Project[];
  isAuthenticated: boolean;
  onLogin: () => void;
}

type SortField = 'rank' | 'mindshare' | 'engagementRate' | 'kolAttention' | 'trustScore' | 'rewardPool';

const ProjectsLeaderboard: React.FC<ProjectsLeaderboardProps> = ({ 
  projects, 
  isAuthenticated, 
  onLogin 
}) => {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOverlayOpen, setIsDetailOverlayOpen] = useState(false);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const showTooltip = (id: string) => {
    setTooltipVisible(id);
  };

  const hideTooltip = () => {
    setTooltipVisible(null);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOverlayOpen(true);
  };

  const closeDetailOverlay = () => {
    setIsDetailOverlayOpen(false);
  };

  const tooltips = {
    mindshare: "Overall attention score based on multiple factors",
    engagementRate: "Quality and quantity of engagement with content",
    kolAttention: "Attention received from key opinion leaders",
    trustScore: "Measure of community trust and reputation",
    rewardPool: "Total rewards available for KOLs"
  };

  return (
    <div className="bg-primary-800 rounded-lg shadow-lg overflow-hidden border border-primary-700">
      <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-600">
        <h2 className="text-2xl font-bold text-white">Projects Leaderboard</h2>
        <p className="text-gray-300 mt-2">
          Top Web3 projects ranked by attention metrics and community engagement
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-primary-700">
          <thead className="bg-primary-700">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('rank')}
              >
                <div className="flex items-center">
                  Rank
                  {sortField === 'rank' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Project
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('mindshare')}
              >
                <div className="flex items-center relative">
                  Mindshare
                  {sortField === 'mindshare' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                  <Info 
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help" 
                    onMouseEnter={() => showTooltip('mindshare')}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === 'mindshare' && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.mindshare}
                    </div>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('engagementRate')}
              >
                <div className="flex items-center relative">
                  Engagement
                  {sortField === 'engagementRate' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                  <Info 
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help" 
                    onMouseEnter={() => showTooltip('engagementRate')}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === 'engagementRate' && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.engagementRate}</div>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('kolAttention')}
              >
                <div className="flex items-center relative">
                  KOL Attention
                  {sortField === 'kolAttention' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                  <Info 
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help" 
                    onMouseEnter={() => showTooltip('kolAttention')}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === 'kolAttention' && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.kolAttention}
                    </div>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('trustScore')}
              >
                <div className="flex items-center relative">
                  Trust Score
                  {sortField === 'trustScore' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                  <Info 
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help" 
                    onMouseEnter={() => showTooltip('trustScore')}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === 'trustScore' && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.trustScore}
                    </div>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('rewardPool')}
              >
                <div className="flex items-center relative">
                  Reward Pool
                  {sortField === 'rewardPool' && (
                    sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                  )}
                  <Info 
                    className="h-4 w-4 ml-1 text-gray-500 cursor-help" 
                    onMouseEnter={() => showTooltip('rewardPool')}
                    onMouseLeave={hideTooltip}
                  />
                  {tooltipVisible === 'rewardPool' && (
                    <div className="absolute top-6 left-0 z-10 w-48 p-2 text-xs bg-primary-600 text-white rounded shadow-lg">
                      {tooltips.rewardPool}
                    </div>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-800 divide-y divide-primary-700">
            {sortedProjects.map((project, index) => (
              <tr 
                key={project.id} 
                className={`hover:bg-primary-600 cursor-pointer transition-colors duration-150 ${index % 2 === 0 ? 'bg-primary-800' : 'bg-primary-700'}`}
                onClick={() => handleProjectClick(project)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-200">#{project.rank}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={project.logo} alt={project.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-200">{project.name}</div>
                      <div className="text-sm text-gray-400">{project.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200 font-medium">{project.mindshare}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{project.engagementRate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{project.kolAttention}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">{project.trustScore}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">${project.rewardPool.toLocaleString()}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default ProjectsLeaderboard;
