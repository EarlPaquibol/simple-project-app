import pool from "../db.js";

export const checkAssigned = async (user_id: string, project_id: string) => {
  const result = await pool.query(
    "SELECT * from user_projects WHERE user_id = $1 AND project_id = $2",
    [user_id, project_id],
  );
  return result.rows[0];
};

export const assignProject = async (user_id: string, project_id: string) => {
  const result = await pool.query(
    "INSERT INTO user_projects (user_id, project_id) VALUES ($1, $2) RETURNING *",
    [user_id, project_id],
  );
  return result.rows[0];
};
export const removeProject = async (user_id: string, project_id: string) => {
  const result = await pool.query(
    "DELETE FROM user_projects WHERE user_id = $1 AND project_id = $2",
    [user_id, project_id],
  );

  return result.rows[0];
};
