// frontend/utils/analytics.ts
import { v4 as uuid } from "uuid";

function ensureSessionCookie(): string {
  const name = "sid=";
  const existing = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name));
  if (existing) return existing.split("=")[1];

  const sid = uuid();
  document.cookie = `sid=${sid}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  return sid;
}

ensureSessionCookie(); // ✅ создаём при первом визите

let userId: string | undefined =
  typeof window !== "undefined"
    ? (localStorage.getItem("userId") ?? undefined)
    : undefined;

async function send(event: string, props: Record<string, any> = {}) {
  await fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, props, userId }),
    credentials: "include", // ✅ чтобы cookie ушла
  });
}

export const analytics = {
  track: send,
  identify(traits: Record<string, any>) {
    send("user_logged_in", { _identifyTraits: traits });
  },
  setUser(id: string) {
    userId = id;
    localStorage.setItem("userId", id);
  },
};
