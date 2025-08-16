import { Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Project } from "../../types";

interface ProjectFormProps {
  projectId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const MAP_SNAKE_TO_CAMEL = {
  username: "twitterUsername",
  avatar_url: "twitterAvatarUrl",
  description: "twitterDescription",
  id: "twitterId",
  display_name: "twitterDisplayName",
  followers_count: "twitterFollowersCount",
  lang: "twitterLang",
  following_count: "twitterFollowingCount",
  is_verified: "twitterIsVerified",
  profile_created_at: "twitterCreatedAt",
  description_link: "twitterDescriptionLink",
  gold_badge: "twitterGoldBadge",
  smart_followers_count: "smartFollowersCount",
};

const defaultProject: Partial<Project> = {
  id: "",
  stage: "",
  featured: false,
  hidden: false,
  mindshare: 0,
  twitterUsername: "",
  twitterId: "",
  twitterDisplayName: "",
  twitterAvatarUrl: "",
  twitterDescription: "",
  twitterDescriptionLink: "",
  twitterFollowersCount: 0,
  twitterFollowingCount: 0,
  twitterIsVerified: false,
  twitterGoldBadge: false,
  twitterLang: "en",
  twitterCreatedAt: new Date().toISOString(),
  coinSymbol: "",
  coinMarketCap: 0,
  coinPrice: 0,
  coinContractAddress: "",
  coinName: "",
  coinImageUrl: "",
};

const ProjectForm: React.FC<ProjectFormProps> = ({
  projectId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Project>>(defaultProject);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      fetch(`/api/projects/${projectId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch project");
          return res.json();
        })
        .then((data) => {
          const filtered = Object.keys(defaultProject).reduce((acc, key) => {
            // @ts-ignore
            acc[key] = data[key];
            return acc;
          }, {});

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
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? parseFloat(value)
          : type === "checkbox"
            ? checked
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    const method = projectId ? "PUT" : "POST";
    const url = projectId ? `/api/projects/${projectId}` : "/api/projects";

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

  const renderField = (key: string, value: any) => {
    const isCheckbox = typeof value === "boolean";
    const isTextarea = key.toLowerCase().includes("description");
    const isNumber =
      typeof value === "number" ||
      [
        "mindshare",
        "coinPrice",
        "coinMarketCap",
        "twitterFollowersCount",
        "twitterFollowingCount",
      ].includes(key);

    if (isCheckbox) {
      return (
        <div key={key} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={key}
            checked={!!formData[key as keyof Project]}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-700">{key}</label>
        </div>
      );
    }

    if (isTextarea) {
      return (
        <div key={key} className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {key}
          </label>
          <textarea
            name={key}
            // @ts-ignore
            value={
              typeof formData[key as keyof Project] === "string" ||
              typeof formData[key as keyof Project] === "number"
                ? formData[key as keyof Project]
                : ""
            }
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
          />
        </div>
      );
    }

    return (
      <div key={key} className="col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {key}
        </label>
        <input
          name={key}
          type={isNumber ? "number" : "text"}
          // @ts-ignore
          value={
            typeof formData[key as keyof Project] === "string" ||
            typeof formData[key as keyof Project] === "number"
              ? formData[key as keyof Project]
              : ""
          }
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md text-gray-900"
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {projectId ? "Edit Project" : "Add New Project"}
          {!projectId && (
            <>
              <div className="mt-4 flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Twitter username"
                  className="px-3 py-1 border rounded-md text-sm"
                  value={formData.twitterUsername || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      twitterUsername: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md"
                  onClick={async () => {
                    if (!formData.twitterUsername) return;
                    try {
                      const res = await fetch(
                        `/api/influencers/search-protokols/${formData.twitterUsername}`
                      );
                      if (!res.ok) throw new Error("not found");
                      const { data } = await res.json();

                      const filtered = Object.keys(defaultProject).reduce(
                        (acc, key) => {
                          const snakeKey = Object.entries(
                            MAP_SNAKE_TO_CAMEL
                          ).find(([, camel]) => camel === key)?.[0];
                          if (snakeKey && snakeKey in data)
                            acc[key] = data[snakeKey];
                          return acc;
                        },
                        {} as Partial<Project>
                      );

                      setFormData((prev) => ({ ...prev, ...filtered }));
                    } catch (err) {
                      console.error(err);
                      alert("Twitter profile not found");
                    }
                  }}
                >
                  Autofill
                </button>
              </div>
            </>
          )}
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
          {Object.entries(formData).map(([key, value]) =>
            renderField(key, value)
          )}

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
