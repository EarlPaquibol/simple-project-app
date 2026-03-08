import * as taskRepo from "../repositories/taskRepository.js";

export const getTasks = () => taskRepo.getTasks();

export const createTask = (fields: { title: string; description?: string }) => {
  const { title, description } = fields;
  if (!title) throw new Error("Title is required!");

  return taskRepo.createTask(fields);
};

export const updateTask = (
  id: string,
  fields: { title: string; description: string },
) => {
  if (!id) throw new Error("Id is required");
  if (!fields || Object.keys(fields).length === 0)
    throw new Error("Fields must not be empty");

  return taskRepo.updateTask(id, fields);
};

export const deleteTask = (id: string) => {
  if (!id) throw new Error("Id is required");

  return taskRepo.deleteTask(id);
};

export const getTaskUsers = (task_id: string) => {
  if (!task_id) throw new Error("Task id required");

  return taskRepo.getTaskUsers(task_id);
};
