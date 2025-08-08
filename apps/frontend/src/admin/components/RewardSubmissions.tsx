import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RewardSubmission } from "../../types";
import RewardSubmissionForm from "./RewardSubmissionForm";

const RewardSubmissions: React.FC<{ projectId?: null | string }> = ({
  projectId = null,
}) => {
  const [submissions, setSubmissions] = useState<RewardSubmission[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const load = () => {
    fetch("/api/submissions")
      .then((res) => res.json())
      .then(setSubmissions);
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (id: string) => {
    setCurrentId(id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/submissions/${id}`, { method: "DELETE" });
    load();
  };

  const handleSuccess = () => {
    load();
    // setIsFormOpen(false);
  };

  const filteredSubmissions = projectId
    ? submissions.filter((s) => s.rewardPool.projectId)
    : submissions;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Reward Submissions
        </h2>
        {/* <button
          onClick={() => {
            setCurrentId(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Pool
        </button> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content Url
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {submission.kol?.twitterUsername}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {submission.contentUrl}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {submission.notes}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                  {submission.status}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleEdit(submission.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-80h overflow-y-auto">
            <RewardSubmissionForm
              rewardSubmissionId={currentId}
              onSuccess={handleSuccess}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardSubmissions;
