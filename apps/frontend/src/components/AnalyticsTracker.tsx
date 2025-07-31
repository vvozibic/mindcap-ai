import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analytics } from "../analytics";

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    analytics.track("page_view", { path: location.pathname });
  }, [location]);

  return null;
}
