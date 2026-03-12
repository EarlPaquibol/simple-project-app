import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  const payload: any = verifyAccessToken(token);
  if (!payload) return res.sendStatus(403);

  req.user = payload;
  next();
};

export const authorize =
  (...allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user)
      return res.sendStatus(401).json({ message: "Unauthenticated!" });

    if (!allowedRoles.includes(req.user.role))
      return res.sendStatus(403).json({ message: "Unauthorized!" });

    next();
  };
