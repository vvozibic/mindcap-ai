import { Response } from "express";
/**
 * Безопасно отправляет JSON-ответ, преобразуя BigInt в Number
 */
export function sendJson(res: Response, payload: any, status = 200) {
  const sanitized = JSON.parse(
    JSON.stringify(payload, (_, v) => (typeof v === "bigint" ? Number(v) : v))
  );
  return res.status(status).json(sanitized);
}
