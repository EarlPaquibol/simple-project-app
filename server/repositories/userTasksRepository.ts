import pool from "../db.js";

export const checkUserTask = async (user_id: string, task_id: string) => {
  const existing = await pool.query(
    "SELECT * FROM user_tasks WHERE user_id = $1 AND task_id = $2",
    [user_id, task_id],
  );
  return existing.rows[0];
};

export const assignTask = async (fields: any) => {
  const columns = Object.keys(fields);
  const values = Object.values(fields);
  const mapValues = values.map((_, i) => `$${i + 1}`);
  const query = `INSERT INTO user_tasks (${columns.join(", ")}) VALUES (${mapValues.join(", ")}) 
  ON CONFLICT (user_id, task_id) DO NOTHING
  RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const removeTask = async (user_id: string, task_id: string) => {
  const result = await pool.query(
    "DELETE FROM user_tasks WHERE user_id = $1 AND task_id = $2 RETURNING *",
    [user_id, task_id],
  );
  return result.rows[0];
};
