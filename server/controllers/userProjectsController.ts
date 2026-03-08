import { Request, Response } from "express";
import * as userProjectsService from "../services/userProjectsService.js";

export const assignProject = async (req: Request, res: Response) => {
  const result = await userProjectsService.assignProject(
    req.params as { user_id: string; project_id: string },
  );
  return res.status(201).json(result);
};

export const removeProject = async (req: Request, res: Response) => {
  const result = await userProjectsService.removeProject(
    req.params as { user_id: string; project_id: string },
  );
  return res.status(204).json(result);
};
