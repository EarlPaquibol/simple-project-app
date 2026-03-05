import { Request, Response } from "express";
import * as taskService from "../services/taskService.js";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.getTasks();
  return res.status(200).json({ tasks });
};

export const createTask = async (req: Request, res: Response) => {
  const result = await taskService.createTask(req.body);
  return res.status(201).json({ result });
};

export const updateTask = async (req: Request, res: Response) => {
  const result = await taskService.updateTask(
    req.params.id as string,
    req.body,
  );
  return res.status(200).json({ result });
};

export const deleteTask = async (req: Request, res: Response) => {
  const result = await taskService.deleteTask(req.params.id as string);
  return res.status(200).json({ result });
};
