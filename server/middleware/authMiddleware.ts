import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token.js";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  const payload = verifyAccessToken(token);
  if (!payload) return res.sendStatus(403);

  req.user = payload;
  next();
};
