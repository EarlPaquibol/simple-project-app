import pool from "../db.js";

export const getProjects = async () => {
  const projects = await pool.query("SELECT * FROM projects ORDER BY id ASC");
  return projects.rows;
};

export const findProject = async (project: string) => {
  const existing = await pool.query(
    "SELECT * FROM projects WHERE LOWER(project) = LOWER($1)",
    [project],
  );
  return existing.rows[0];
};

export const createProject = async (project: string) => {
  const result = await pool.query(
    "INSERT INTO projects (project) VALUES ($1) RETURNING *",
    [project],
  );
  return result.rows[0];
};

export const editProject = async (id: string, project: string) => {
  const result = await pool.query(
    "UPDATE projects SET project = $1 WHERE id = $2 RETURNING *",
    [project, id],
  );
  return result.rows[0];
};

export const deleteProject = async (id: string) => {
  const result = await pool.query(
    "DELETE FROM projects WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
