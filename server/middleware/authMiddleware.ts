import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    role: string;
    permissions?: string[];
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

//example of JWT payload
/*
 {
    userId: "1",
    roles: "Admin",
    permissions: [
      "edit_post",
      "delete_post"
    ]
 }
*/
export const authorizePermissionRoles =
  (...allowedPermissions: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user)
      return res.sendStatus(401).json({ message: "You must log in!" });

    const userPermissions = req.user.permissions;

    if (!userPermissions || userPermissions.length === 0)
      return res.sendStatus(403);

    //example allowed allowedPermission = delete_post, edit_post
    //userPermissions have = delete_post, edit_post, create_post
    const hasPermissions = allowedPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    if (!hasPermissions) return res.sendStatus(403);

    next();
  };
