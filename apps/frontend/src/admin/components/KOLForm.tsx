import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Influencer } from "../../types";

interface InfluencerFormProps {
  influencerId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

async function fetchInfluencerById(id: string): Promise<Influencer | null> {
  try {
    const response = await fetch(`/api/influencers/${id}`);
    if (!response.ok) throw new Error("Failed to fetch influencer");
    const data: Influencer = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching influencer:", error);
    return null;
  }
}

const InfluencerForm: React.FC<InfluencerFormProps> = ({
  influencerId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Influencer>({
    id: "",
    name: "",
    username: "",
    avatarUrl: "",
    badges: "",
    platform: "",
    followers: "",
    expertise: "",
    bio: "",
    profileUrl: "",
    mindshare: "",
    pow: "",
    poi: "",
    poe: "",
    smartFollowers: "",
    followersCount: "",
    moneyScore: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (influencerId) {
        const influencer = await fetchInfluencerById(influencerId);
        if (influencer) setFormData(influencer);
      } else {
        setFormData({
          id: crypto.randomUUID(),
          name: "",
          username: "",
          avatarUrl: "",
          platform: "",
          followers: "",
          badges: "",
          expertise: "",
          bio: "",
          profileUrl: "",
          mindshare: "",
          pow: "",
          poi: "",
          poe: "",
          smartFollowers: "",
          followersCount: "",
          moneyScore: "",
        });
      }
    };
    fetchData();
  }, [influencerId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = influencerId ? "PUT" : "POST";
    const url = influencerId
      ? `/api/influencers/${influencerId}`
      : "/api/influencers";

    const token = localStorage.getItem("accessToken");

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      onSuccess();
    } else {
      const err = await res.json();
      console.error("Failed to save:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {influencerId ? "Edit Influencer" : "Add New Influencer"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {Object.entries(formData)
            .filter(([key]) => key !== "createdAt" && key !== "updatedAt")
            .map(
              ([key, value = ""]) =>
                key !== "id" && (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      name={key}
                      disabled={typeof value === "object" && value !== null}
                      value={
                        typeof value === "object" && value !== null
                          ? JSON.stringify(value)
                          : value || ""
                      }
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    />
                  </div>
                )
            )}
        </div>

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
            {influencerId ? "Update Influencer" : "Add Influencer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfluencerForm;
