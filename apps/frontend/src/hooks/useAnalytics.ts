// frontend/utils/useAnalytics.ts
import { useCallback } from "react";

export function useAnalytics(userId?: string) {
  /** Отправка события на бэк */
  const track = useCallback(
    async (event: string, props: Record<string, any> = {}) => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event, props, userId }),
        });
      } catch (err) {
        console.warn("Analytics track failed:", err);
      }
    },
    [userId]
  );

  /** Идентификация пользователя (через _identifyTraits) */
  const identify = useCallback(
    async (traits: Record<string, any>) => {
      await track("user_logged_in", { _identifyTraits: traits });
    },
    [track]
  );

  return { track, identify };
}
