import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    console.log(user);

    if (err) return res.status(403).json({ error: "Invalid token" });
    // @ts-ignore
    req.user = user; // @ts-ignore
    next();
  });
};
