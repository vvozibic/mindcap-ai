import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Project } from "../../types";

interface ProjectFormProps {
  projectId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  projectId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Project>({
    id: "",
    name: "",
    slug: "",
    avatarUrl: "",
    category: "",
    website: "",
    description: "",
    marketCap: "",
    launchDate: "",
    mindshare: "",
    kolAttention: "",
    engagement: "",
    trustScore: "",
    rewardPoolUsd: "",
    rewardRank: "",
    twitter: "",
  });

  useEffect(() => {
    const fetchProjectById = async (id: string) => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    if (projectId) {
      fetchProjectById(projectId);
    } else {
      setFormData((prev) => ({ ...prev, id: crypto.randomUUID() }));
    }
  }, [projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = projectId ? "PUT" : "POST";
    const url = projectId ? `/api/projects/${projectId}` : "/api/projects";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      onSuccess();
    } else {
      console.error("Failed to save project");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {projectId ? "Edit Project" : "Add New Project"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
      >
        {Object.entries(formData).map(([key, value]) =>
          key === "id" ? null : (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                name={key}
                value={value || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              />
            </div>
          )
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {projectId ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
