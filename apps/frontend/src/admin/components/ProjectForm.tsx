import { Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ProtokolsProject } from "../../types";

interface ProjectFormProps {
  projectId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const defaultProject: Partial<ProtokolsProject> = {
  id: "",
  name: "",
  slug: "",
  symbol: "",
  avatarUrl: "",
  description: "",
  twitterUsername: "",
  followersCount: 0,
  totalViews: 0,
  totalPosts: 0,
  mindsharePercent: 0,
  marketCap: 0,
  price: 0,
  featured: false,
};

const ProjectForm: React.FC<ProjectFormProps> = ({
  projectId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] =
    useState<Partial<ProtokolsProject>>(defaultProject);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      fetch(`/api/p-projects/${projectId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch project");
          return res.json();
        })
        .then((data) => {
          const filtered = Object.keys(defaultProject).reduce((acc, key) => {
            acc[key as keyof ProtokolsProject] =
              data[key as keyof ProtokolsProject];
            return acc;
          }, {} as Partial<ProtokolsProject>);
          setFormData(filtered);
        })
        .catch((err) => {
          console.error("Error fetching project:", err);
          setError("Failed to load project data.");
        })
        .finally(() => setLoading(false));
    } else {
      setFormData({ ...defaultProject, id: crypto.randomUUID() });
    }
  }, [projectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? parseFloat(value)
          : name === "featured" || name === "hidden"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    const method = projectId ? "PUT" : "POST";
    const url = projectId ? `/api/p-projects/${projectId}` : "/api/p-projects";

    delete formData?.narrativeLinks;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      onSuccess();
      setLoadingUpdate(false);
    } else {
      setError("Failed to save project");
      setLoadingUpdate(false);
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

      {loading ? (
        <div className="flex justify-center items-center py-6 text-gray-700">
          <Loader className="h-5 w-5 animate-spin mr-2" />
          Loading project...
        </div>
      ) : error ? (
        <div className="text-red-600 text-sm mb-4">{error}</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        >
          {/* Пример одного поля */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              name="slug"
              value={formData.slug || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symbol
            </label>
            <input
              name="symbol"
              value={formData.symbol || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          {/* Twitter Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter Username
            </label>
            <input
              name="twitterUsername"
              value={formData.twitterUsername || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          {/* Website */}
          {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
          />
        </div> */}

          {/* Avatar URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              name="avatarUrl"
              value={formData.avatarUrl || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          {/* Numeric Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Followers Count
            </label>
            <input
              type="number"
              name="followersCount"
              value={formData.followersCount || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Views
            </label>
            <input
              type="number"
              name="totalViews"
              value={formData.totalViews || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Posts
            </label>
            <input
              type="number"
              name="totalPosts"
              value={formData.totalPosts || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Market Cap
            </label>
            <input
              type="number"
              name="marketCap"
              value={formData.marketCap || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              step="0.0001"
              value={formData.price || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mindshare %
            </label>
            <input
              type="number"
              name="mindsharePercent"
              step="0.01"
              value={formData.mindsharePercent || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            />
          </div>

          {/* Featured / Hidden */}
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="featured"
              checked={!!formData.featured}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-700">Featured</label>
            <input
              type="checkbox"
              name="hidden"
              checked={!!formData.hidden}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-700">Hidden</label>
          </div>

          <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loadingUpdate}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <div className="flex">
                {loadingUpdate ? (
                  <Loader className="h-5 w-5 animate-spin mr-2" />
                ) : projectId ? (
                  "Update Project"
                ) : (
                  "Add Project"
                )}
              </div>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectForm;
