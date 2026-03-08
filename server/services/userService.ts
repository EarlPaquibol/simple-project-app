import * as userRepo from "../repositories/userRepository.js";
import UserType from "../types/userType.js";

export const getUsers = () => userRepo.getUsers();

export const createUser = async ({ name, email }: UserType) => {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("Email already exists");

  return userRepo.createUser(name, email);
};

export const updateUser = async (id: string, fields: UserType) => {
  if (!id) throw new Error("Id must be given");

  if (!fields || Object.keys(fields).length === 0) {
    throw new Error("Fields must not be empty");
  }

  return userRepo.updateUser(id, fields);
};

export const deleteUser = async (id: string) => {
  if (!id) throw new Error("No id given");
  return userRepo.deleteUser(id);
};

export const getUserTasks = (user_id: string) => {
  if (!user_id) throw new Error("No user_id given!");
  return userRepo.getUserTasks(user_id);
};

export const getUserProjects = (user_id: string) => {
  if (!user_id) throw new Error("No user_id given!");
  return userRepo.getUserProjects(user_id);
};
