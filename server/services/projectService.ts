import * as projectRepo from "../repositories/projectRepository.js";

export const getProjects = () => projectRepo.getProjects();

export const createProject = async ({ project }: { project: string }) => {
  if (!project) throw new Error("Project name is required!");

  const existing = await projectRepo.findProject(project);
  if (existing) throw new Error("Project is existing!");

  return projectRepo.createProject(project);
};

export const editProject = (id: string, fields: { project: string }) => {
  if (!id) throw new Error("Project must exist!");
  const { project } = fields;
  if (!project) throw new Error("Project name must be provided");
  return projectRepo.editProject(id, project);
};

export const deleteProject = (id: string) => {
  if (!id) throw new Error("Project must exist!");
  return projectRepo.deleteProject(id);
};

export const getProjectUsers = (project_id: string) => {
  if (!project_id) throw new Error("Project must exist!");
  return projectRepo.getProjectUsers(project_id);
};
