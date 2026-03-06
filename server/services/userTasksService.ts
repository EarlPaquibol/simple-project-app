import * as userTasksRepository from "../repositories/userTasksRepository.js";

export const assignTask = (fields: {
  user_id: string;
  task_id: string;
  due_date?: string;
}) => {
  const { user_id, task_id } = fields;
  if (!user_id || !task_id) throw new Error("UserId and TaskId required!");

  return userTasksRepository.assignTask(fields);
};

export const removeTask = (params: { user_id: string; task_id: string }) => {
  const { user_id, task_id } = params;
  if (!user_id || !task_id) throw new Error("UserId and TaskId required!");

  return userTasksRepository.removeTask(user_id, task_id);
};
