export function startTimer(name: string) {
  console.log(`🚀 Starting: ${name}`);
  const start = Date.now();
  return () => {
    const duration = Date.now() - start;
    console.log(`✅ Done: ${name} in ${duration}ms`);
  };
}
