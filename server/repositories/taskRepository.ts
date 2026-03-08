import pool from "../db.js";

export const getTasks = async () => {
  const tasks = await pool.query("SELECT * FROM tasks");
  return tasks.rows;
};

export const createTask = async (fields: {
  title: string;
  description?: string;
}) => {
  const columns = Object.keys(fields);
  const values = Object.values(fields);

  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
  const query = `INSERT INTO tasks (${columns.join(", ")}) VALUES (${placeholders}) RETURNING *`;

  const createdTask = await pool.query(query, values);
  return createdTask.rows[0];
};

export const updateTask = async (
  id: string,
  fields: { title?: string; description?: string; project_id?: string },
) => {
  const entries = Object.entries(fields);
  const setClause = entries.map(([key], i) => `${key} = $${i + 1}`).join(", ");
  const values = entries.map(([, value]) => value);
  values.push(id);

  const query = `
    UPDATE tasks
    SET ${setClause}
    WHERE id = $${values.length}
    RETURNING *
  `;

  const editedTask = await pool.query(query, values);
  return editedTask.rows[0];
};

export const deleteTask = async (id: string) => {
  const deletedTask = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id],
  );
  return deletedTask.rows[0];
};

export const getTaskUsers = async (task_id: string) => {
  const result = await pool.query(
    "SELECT u.* FROM users AS u JOIN user_tasks AS ut ON ut.user_id = u.id WHERE ut.task_id = $1",
    [task_id],
  );
  return result.rows;
};
