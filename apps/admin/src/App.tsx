import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProjectsTable from './components/ProjectsTable';
import KOLsTable from './components/KOLsTable';
import { mockProjects, mockKOLs } from './data/mockData';
import { Project, KOL } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [kols, setKOLs] = useState<KOL[]>(mockKOLs);

  // Project CRUD operations
  const handleAddProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  // KOL CRUD operations
  const handleAddKOL = (kol: KOL) => {
    setKOLs([...kols, kol]);
  };

  const handleUpdateKOL = (updatedKOL: KOL) => {
    setKOLs(
      kols.map((kol) => (kol.id === updatedKOL.id ? updatedKOL : kol))
    );
  };

  const handleDeleteKOL = (id: string) => {
    if (window.confirm('Are you sure you want to delete this KOL?')) {
      setKOLs(kols.filter((kol) => kol.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {activeTab === 'projects' ? 'Crypto Projects Management' : 'Influencers Management'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {activeTab === 'projects'
              ? 'Manage your crypto projects database with detailed information.'
              : 'Track and manage key opinion leaders in the crypto space.'}
          </p>
        </div>

        {activeTab === 'projects' ? (
          <ProjectsTable
            projects={projects}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
          />
        ) : (
          <KOLsTable
            kols={kols}
            onAddKOL={handleAddKOL}
            onUpdateKOL={handleUpdateKOL}
            onDeleteKOL={handleDeleteKOL}
          />
        )}
      </main>

      <footer className="bg-white border-t mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Crypto Admin Panel © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
