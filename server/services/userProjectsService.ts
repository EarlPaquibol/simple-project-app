import * as userProjectsRepository from "../repositories/userProjectsRespository.js";

export const assignProject = async (params: {
  user_id: string;
  project_id: string;
}) => {
  const { user_id, project_id } = params;
  if (!user_id || !project_id)
    throw new Error("UserId and ProjectId required!");

  const existing = await userProjectsRepository.checkAssigned(
    user_id,
    project_id,
  );

  if (existing) throw new Error("User already assigned to this project!");

  return userProjectsRepository.assignProject(user_id, project_id);
};

export const removeProject = (params: {
  user_id: string;
  project_id: string;
}) => {
  const { user_id, project_id } = params;
  if (!user_id || !project_id)
    throw new Error("UserId and ProjectId required!");
  return userProjectsRepository.removeProject(user_id, project_id);
};
