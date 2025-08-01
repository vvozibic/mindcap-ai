export function shortAddress(
  addr: string,
  start: number = 6,
  end: number = 4
): string {
  if (!addr) return "";
  return `${addr.slice(0, start)}…${addr.slice(-end)}`;
}
