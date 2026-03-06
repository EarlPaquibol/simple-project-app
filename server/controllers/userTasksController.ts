import { Request, Response } from "express";
import * as userTasksService from "../services/userTasksService.js";

export const assignTask = async (req: Request, res: Response) => {
  const result = await userTasksService.assignTask(req.body);
  return res
    .status(201)
    .json({ message: "Successfully assigned task to user" });
};

export const removeTask = async (req: Request, res: Response) => {
  const result = await userTasksService.removeTask(
    req.params as { user_id: string; task_id: string },
  );
  return res
    .status(200)
    .json({ message: "Successfully removed user from task" });
};
