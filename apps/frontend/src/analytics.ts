// frontend/utils/analytics.ts
import { v4 as uuid } from "uuid";

let userId: string | undefined =
  typeof window !== "undefined"
    ? (localStorage.getItem("userId") ?? undefined)
    : undefined;

const sessionId = (() => {
  if (typeof window !== "undefined") {
    const existing = localStorage.getItem("sessionId");
    if (existing) return existing;
    const id = uuid();
    localStorage.setItem("sessionId", id);
    return id;
  }
  return uuid();
})();

async function send(event: string, props: Record<string, any> = {}) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, props: { ...props, sessionId }, userId }),
    });
  } catch (err) {
    console.warn("Analytics track failed:", err);
  }
}

export const analytics = {
  track: send,
  identify(traits: Record<string, any>) {
    send("user_logged_in", { _identifyTraits: traits });
  },
  setUser(id: string) {
    userId = id;
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", id);
    }
  },
};
