import { Request, Response } from "express";
import * as projectService from "../services/projectService.js";

export const getProjects = async (req: Request, res: Response) => {
  const projects = await projectService.getProjects();
  return res.status(200).json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const createdProject = await projectService.createProject(req.body);
  return res.status(201).json(createdProject);
};

export const editProject = async (req: Request, res: Response) => {
  const editedProject = await projectService.editProject(
    req.params.id as string,
    req.body,
  );
  return res.status(200).json(editedProject);
};

export const deleteProject = async (req: Request, res: Response) => {
  const deletedProject = await projectService.deleteProject(
    req.params.id as string,
  );
  return res.status(200).json(deletedProject);
};

export const getProjectUsers = async (req: Request, res: Response) => {
  const result = await projectService.getProjectUsers(
    req.params.project_id as string,
  );
  return res.status(200).json(result);
};
