import { Request } from "express";

export interface PaginationParams {
  limit: number;
  offset: number;
}

export function getPaginationParams(req: Request): PaginationParams {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
  const offset = (page - 1) * limit;
  return { limit, offset };
}

export function buildPaginationMeta(
  total: number,
  limit: number,
  offset: number
) {
  return {
    total,
    limit,
    offset,
    hasMore: offset + limit < total,
  };
}
