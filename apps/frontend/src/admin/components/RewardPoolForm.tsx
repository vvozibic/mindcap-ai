import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Project, RewardPool } from "../../types";

interface RewardPoolFormProps {
  rewardPoolId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
  allProjects: Project[];
}

const defaultPool: Partial<RewardPool> = {
  title: "",
  description: "",
  reward: "",
  deadline: new Date().toISOString().slice(0, 10),
  platforms: [],
  status: "active",
  totalAmountUsd: 0,
  paidOutUsd: 0,
  rewardRate: 0,
  rewardUnit: "",
  campaignTargetViews: 0,
  participantsCount: 0,
  completedCount: 0,
  requirements: [],
};

const RewardPoolForm: React.FC<RewardPoolFormProps> = ({
  rewardPoolId,
  onSuccess,
  onCancel,
  allProjects,
}) => {
  const [formData, setFormData] = useState<Partial<RewardPool>>(defaultPool);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (rewardPoolId) {
      setLoading(true);
      fetch(`/api/reward-pools/${rewardPoolId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch project");
          return res.json();
        })
        .then((data) => {
          const filtered = Object.keys(defaultPool).reduce((acc, key) => {
            acc[key as keyof RewardPool] = data[key as keyof RewardPool];
            return acc;
          }, {} as Partial<RewardPool>);
          setFormData(filtered);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching project:", err);
          setError("Failed to load project data.");
        })
        .finally(() => setLoading(false));
    } else {
      setFormData({ ...defaultPool, id: crypto.randomUUID() });
    }
  }, [rewardPoolId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = rewardPoolId ? "PUT" : "POST";
    const url = rewardPoolId
      ? `/api/reward-pools/${rewardPoolId}`
      : "/api/reward-pools";

    setLoadingUpdate(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          deadline: new Date(formData.deadline || "").toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit the form.");
      }

      onSuccess();
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit the form.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {rewardPoolId ? "Edit Reward Pool" : "Add New Reward Pool"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {(loading || loadingUpdate) && (
        <div className="text-sm text-blue-500 mb-2">
          {loading ? "Loading data..." : "Submitting..."}
        </div>
      )}

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  text-gray-900"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reward
          </label>
          <input
            name="reward"
            value={formData.reward || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total USD
          </label>
          <input
            type="number"
            name="totalAmountUsd"
            value={formData.totalAmountUsd || 0}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paid Out USD
          </label>
          <input
            type="number"
            name="paidOutUsd"
            value={formData.paidOutUsd || 0}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  text-gray-900"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reward Rate
          </label>
          <input
            type="number"
            name="rewardRate"
            value={formData.rewardRate || 0}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reward Unit
          </label>
          <input
            name="rewardUnit"
            value={formData.rewardUnit || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Views
          </label>
          <input
            type="number"
            name="campaignTargetViews"
            value={formData.campaignTargetViews || 0}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Participants Count
          </label>
          <input
            type="number"
            name="participantsCount"
            value={formData.participantsCount || 0}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Completed Participants Count
          </label>
          <input
            type="number"
            name="completedCount"
            value={formData.completedCount || 0}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requirements
          </label>
          <textarea
            name="requirements"
            className="w-full px-3 py-2 border rounded-md text-gray-900"
            value={formData.requirements?.join("\n") || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                requirements: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status || "active"}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  text-gray-900"
          >
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platforms
          </label>
          <textarea
            name="platforms"
            className="w-full px-3 py-2 border rounded-md  text-gray-900"
            value={formData.platforms?.join("\n") || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                platforms: e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <select
            name="projectId"
            value={formData.projectId || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, projectId: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded-md text-gray-900"
            required
          >
            <option value="" disabled>
              Select a project
            </option>
            {allProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.twitterDisplayName || project.twitterUsername}
              </option>
            ))}
          </select>
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
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {rewardPoolId ? "Update Pool" : "Add Pool"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RewardPoolForm;
