import { Upload } from "lucide-react";
import { useState } from "react";
import { useAuthWithKOL } from "../../hooks/useAuthWithKOL";
import XLogo from "../XLogo";

interface SubmissionProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  rewardPoolId: string;
}

export const Submission = ({
  isAuthenticated,
  onLogin,
  rewardPoolId,
}: SubmissionProps) => {
  const { kol } = useAuthWithKOL();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rewardPoolId,
          kolId: kol?.id,
          contentUrl: submissionUrl,
          notes: submissionNotes,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mt-6 pt-6 border-t border-primary-700">
        <div className="bg-primary-600 p-4 rounded-lg text-center">
          <h4 className="text-md font-medium text-gray-300 mb-2">
            Sign in to participate
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            You need to sign in to submit content and earn rewards from this
            project pool.
          </p>
          <button
            onClick={onLogin}
            className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium"
          >
            Login with <XLogo className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mt-6 pt-6 border-t border-primary-700 text-green-400 text-sm">
        ✅ Submission received! We'll review it shortly.
      </div>
    );
  }

  return isSubmitting ? (
    <div className="mt-6 pt-6 border-t border-primary-700">
      <h4 className="text-md font-medium text-gray-300 mb-4">
        Submit Your Content
      </h4>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="contentUrl"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Content URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contentUrl"
            className="w-full bg-primary-600 border border-primary-500 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
            placeholder="https://twitter.com/..."
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-400">
            Paste the URL to your content (Twitter thread, YouTube, etc.)
          </p>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Additional Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            className="w-full bg-primary-600 border border-primary-500 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500"
            placeholder="Any additional context or info..."
            value={submissionNotes}
            onChange={(e) => setSubmissionNotes(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsSubmitting(false)}
            className="px-4 py-2 border border-primary-500 rounded-md text-gray-300 hover:bg-primary-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!submissionUrl.trim() || loading}
            className={`px-4 py-2 rounded-md text-primary-900 ${
              submissionUrl.trim() && !loading
                ? "bg-accent-500 hover:bg-accent-600"
                : "bg-accent-500 opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Submitting..." : "Submit Content"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-6 pt-6 border-t border-primary-700 flex justify-between items-center">
      <div>
        <h4 className="text-md font-medium text-gray-300">
          Ready to participate?
        </h4>
        <p className="text-sm text-gray-400">
          Submit your content and earn rewards
        </p>
      </div>
      <button
        onClick={() => setIsSubmitting(true)}
        className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium flex items-center"
      >
        <Upload className="h-4 w-4 mr-2" />
        Submit Content
      </button>
    </div>
  );
};
