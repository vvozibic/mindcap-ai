export async function retryWithDelay<T>(
  fn: () => Promise<T>,
  retries = 5,
  delayMs = 1000
): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      console.warn(`Retry ${i + 1}/${retries}`, err?.message || err);
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
  throw lastError;
}
