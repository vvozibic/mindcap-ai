import { useEffect } from "react";

export function useReferralTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref) {
      sessionStorage.setItem("referral_code", ref);
      // также можно положить в cookie как fallback
      document.cookie = `referral_code=${ref}; path=/; max-age=604800; samesite=strict`;
    }
  }, []);
}

export function getReferralCode() {
  return sessionStorage.getItem("referral_code");
}
