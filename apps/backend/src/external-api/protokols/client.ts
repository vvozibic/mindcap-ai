import { prisma } from "../../prisma";

type LOG_LEVEL = "SUCCESS" | "SKIP" | "ERROR" | "FATAL" | "FAIL" | "RETRY";

export async function logToDb(level: LOG_LEVEL, message: string, url?: string) {
  try {
    await prisma.log.create({
      data: { level, message, url },
    });
  } catch (err) {
    console.error("Failed to write log to DB:", err);
  }
}

export const fetchFromProtokols = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PROTOKOLS_API_KEY}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    const errorMsg = `Protokols API error: ${res.status} - ${errorBody}`;
    await logToDb("ERROR", errorMsg, url);
    throw new Error(errorMsg);
  }

  const json = await res.json();
  // await logToDb("SUCCESS", "Request succeeded", url);
  return json;
};

export async function retry<T>(
  url: string,
  fn: () => Promise<T>,
  attempts = 3
): Promise<T> {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      if (i > 0) await logToDb("RETRY", `Attempt ${i + 1}`, url);
      return await fn();
    } catch (err: any) {
      lastError = err;
      await logToDb("FAIL", `Attempt ${i + 1}: ${err.message}`, url);
    }
  }
  await logToDb("FATAL", `All ${attempts} attempts failed`, url);
  throw lastError;
}
