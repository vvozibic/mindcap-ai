export async function fetchConfig() {
  try {
    const res = await fetch("/config");
    if (!res.ok) throw new Error("Failed to load config");
    return await res.json();
  } catch (err) {
    console.error("⚠️ Config load failed", err);
    return null;
  }
}
