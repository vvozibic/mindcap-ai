import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import z from "zod";
import { KOL } from "../../types";
import { KOLSchema } from "../../zod";

const partialKOLSchema = KOLSchema.omit({
  createdAt: true,
  updatedAt: true,
  fetchedAt: true,
});

type KOLFormData = z.infer<typeof partialKOLSchema>;

interface KOLFormProps {
  influencerId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

async function fetchKOLById(id: string): Promise<KOL | null> {
  try {
    const response = await fetch(`/api/influencers/${id}`);
    if (!response.ok) throw new Error("Failed to fetch influencer");
    const data: KOL = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching influencer:", error);
    return null;
  }
}

const KOLForm: React.FC<KOLFormProps> = ({
  influencerId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<KOL>({
    id: crypto.randomUUID(),
    twitterUsername: "",
    twitterDisplayName: "",
    twitterAvatarUrl: "",
    twitterFollowersCount: 0,
    twitterDescription: "",
    kolScorePercentFromTotal: 0,
    smartFollowersCount: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof KOLFormData, string>>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      if (influencerId) {
        const kol = await fetchKOLById(influencerId);
        if (kol) setFormData(kol);
      } else {
        setFormData({
          id: crypto.randomUUID(),
          twitterUsername: "",
          twitterDisplayName: "",
          twitterAvatarUrl: "",
          twitterFollowersCount: 0,
          twitterDescription: "",
          kolScorePercentFromTotal: 0,
          smartFollowersCount: 0,
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

    const result = kolSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof KOLFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof KOLFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({}); // очистить ошибки

    const method = influencerId ? "PUT" : "POST";
    const url = influencerId
      ? `/api/influencers/${influencerId}`
      : "/api/influencers";

    const token = localStorage.getItem("token");

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
          {influencerId ? "Edit KOL" : "Add New KOL"}
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
                  <>
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
                    {errors[key as keyof KOLFormData] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[key as keyof KOLFormData]}
                      </p>
                    )}
                  </>
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
            {influencerId ? "Update KOL" : "Add KOL"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KOLForm;
