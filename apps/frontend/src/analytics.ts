import { v4 as uuid } from "uuid";

let userId: string | undefined =
  typeof window !== "undefined"
    ? (localStorage.getItem("userId") ?? undefined)
    : undefined;

const sessionId =
  typeof window !== "undefined"
    ? localStorage.getItem("sessionId") ||
      (() => {
        const id = uuid();
        localStorage.setItem("sessionId", id);
        return id;
      })()
    : uuid();

async function send(event: string, props: Record<string, any> = {}) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        props: { ...props, sessionId },
        userId: userId || sessionId, // ✅ если нет userId, шлём sessionId
      }),
    });
  } catch (err) {
    console.warn("Analytics track failed:", err);
  }
}

export const analytics = {
  /** Отправка любого события */
  track: send,

  /** Идентификация юзера (мерджит анонимные и залогиненные профили) */
  identify(traits: Record<string, any>) {
    send("user_logged_in", { _identifyTraits: traits });
  },

  /** Устанавливаем userId глобально */
  setUser(id: string) {
    userId = id;
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", id);
    }
  },
};
