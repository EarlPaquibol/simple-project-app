import { Request, Response } from "express";
import * as userService from "../services/userService.js";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const createdUser = await userService.createUser(req.body);
  return res.status(201).json(createdUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const editedUser = await userService.updateUser(
    req.params.id as string,
    req.body,
  );
  return res.status(200).json(editedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const deletedUser = await userService.deleteUser(req.params.id as string);
  return res.status(200).json(deletedUser);
};
