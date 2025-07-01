import cookie from "cookie";
import { NextFunction, Request, Response } from "express";

export const authTwitter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.twitter_token;
  const user = cookies.twitter_user;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Можно также проверить токен через Twitter API, если нужно.
  // @ts-ignore
  req.twitterToken = token;
  // @ts-ignore
  req.twitterUser = user;
  next();
};
