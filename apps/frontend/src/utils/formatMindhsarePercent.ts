export function formatMindsharePercent(value: number): string {
  if (value === 0) return "0%";

  const percent = value * 100;

  if (percent >= 1) return `${percent.toFixed(2)}%`;

  // Считаем количество нулей после точки до первой значимой цифры
  const percentStr = percent.toExponential(); // например: "1.23e-3"
  const match = percentStr.match(/e-(\d+)/);
  const zeros = match ? parseInt(match[1]) : 0;

  const decimals = Math.min(zeros + 1, 5); // максимум 5 знаков

  return `${percent.toFixed(decimals)}%`;
}
