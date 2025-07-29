import { Edit, Plus, RefreshCw, Trash2, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { KOL } from "../../types";
import KOLForm from "./KOLForm";
import { TableSkeleton } from "./TableSkeleton";

const KOLsTable: React.FC = () => {
  const [kols, setKols] = useState<KOL[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentKOLId, setCurrentKOLId] = useState<string | null>(null);
  const [enrichInProgress, setEnrichInProgress] = useState("");

  useEffect(() => {
    fetch("/api/influencers")
      .then((res) => res.json())
      .then(setKols)
      .catch(console.error);
  }, []);

  const handleAdd = () => {
    setCurrentKOLId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (kolId: string) => {
    setCurrentKOLId(kolId);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/influencers/${id}`, { method: "DELETE" });
    setKols((prev) => prev.filter((k) => k.id !== id));
  };

  const handleEnrich = async (username: string) => {
    const token = localStorage.getItem("token");
    setEnrichInProgress(username);
    const res = await fetch("/api/influencers/enrich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username }),
    });

    if (res.ok) {
      setEnrichInProgress("");
      alert("Successfully enrich" + username);
    } else {
      setEnrichInProgress("");
      const err = await res.json();
      alert("Failed to enrich:" + err);
      console.error("Failed to enrich:", err);
    }
  };

  const handleSuccess = () => {
    fetch("/api/influencers")
      .then((res) => res.json())
      .then(setKols)
      .finally(() => setIsFormOpen(false));
  };

  if (!kols?.length) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Key Opinion Leaders (KOLs)
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add KOL
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Influencer
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Handle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Followers
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expertise
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {kols.slice(0, 20).map((kol) => (
              <tr key={kol.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {kol?.twitterAvatarUrl || "" ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={kol.twitterAvatarUrl || ""}
                          alt={kol.twitterUsername}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {kol.twitterDisplayName}
                      </div>
                    </div>
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{kol.platform}</div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-indigo-600">
                    {kol.twitterDisplayName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {kol.twitterFollowersCount}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{kol.expertise}</div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    title="Enrich infl from APIs"
                    onClick={() => handleEnrich(kol.twitterUsername)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <RefreshCw
                      className={`h-5 w-5 ${
                        enrichInProgress === kol.twitterUsername &&
                        "animate-spin"
                      } ${enrichInProgress && "cursor-not-allowed"}`}
                    />
                  </button>

                  <button
                    onClick={() => handleEdit(kol.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(kol.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-full overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-full max-h-80h overflow-y-auto">
            <KOLForm
              influencerId={currentKOLId}
              onSuccess={handleSuccess}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KOLsTable;
