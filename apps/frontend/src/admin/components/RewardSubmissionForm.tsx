import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RewardSubmission, RewardSubmissionStatus } from "../../types";

interface RewardSubmissionFormProps {
  rewardSubmissionId?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const RewardSubmissionForm: React.FC<RewardSubmissionFormProps> = ({
  rewardSubmissionId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<RewardSubmission> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rewardSubmissionId) return;
    setLoading(true);
    fetch(`/api/submissions/${rewardSubmissionId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch submission");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load submission");
      })
      .finally(() => setLoading(false));
  }, [rewardSubmissionId]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev!,
      status: e.target.value as RewardSubmissionStatus,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !rewardSubmissionId) return;

    setUpdating(true);
    setError(null);

    try {
      const res = await fetch(`/api/submissions/${rewardSubmissionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: formData.status }),
      });

      if (!res.ok) throw new Error("Failed to update submission");
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Review Submission
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {loading && <p className="text-sm text-blue-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {formData && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content URL
            </label>
            <input
              type="text"
              value={formData.contentUrl}
              disabled
              className="w-full px-3 py-2 border bg-gray-100 rounded-md text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes || ""}
              disabled
              rows={10}
              className="w-full px-3 py-2 border bg-gray-100 rounded-md text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border rounded-md text-gray-900"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {updating ? "Updating..." : "Update Status"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RewardSubmissionForm;
