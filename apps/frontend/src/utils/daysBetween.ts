export function daysBetween(date1: string, date2: Date): number {
  const d1 = new Date(date1);
  const d2 = date2;
  const diffInMs = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}
