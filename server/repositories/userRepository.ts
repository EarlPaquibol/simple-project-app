import pool from "../db.js";
import UserType from "../types/userType.js";

export const getUsers = async () => {
  const users = await pool.query("SELECT * FROM users;");
  return users.rows;
};

export const findByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

export const createUser = async (name: string, email: string) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
  );
  return result.rows[0];
};

export const updateUser = async (id: string, fields: UserType) => {
  const queryBuilder = [];
  const values = [];
  let i = 1;

  for (let key in fields) {
    const typedKey = key as keyof typeof fields;
    queryBuilder.push(`${typedKey} = $${i}`);
    values.push(fields[typedKey]);
    i++;
  }

  const qq = `UPDATE users SET ${queryBuilder.join(", ")} WHERE id = $${id} RETURNING *`;
  values.push(id);

  const result = await pool.query(qq, values);
  return result.rows[0];
};

export const deleteUser = async (id: string) => {
  const idNumber = Number(id);
  if (!Number.isInteger(idNumber)) throw new Error("Invalid ID");
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

//I want to get all that users tasks
export const getUserTasks = async (user_id: string) => {
  const userTasks = await pool.query(
    "SELECT * FROM tasks AS t JOIN user_tasks AS ut ON t.id = ut.task_id WHERE ut.user_id = $1",
    [user_id],
  );

  return userTasks.rows;
};

export const getUserProjects = async (user_id: string) => {
  const userProjects = await pool.query(
    `SELECT u.id, u.name, 
    json_agg(json_build_object(
      'id', p.id,
      'project', p.project
    )) as projects 
    FROM users u 
    JOIN user_projects ut 
    ON ut.user_id = u.id
    JOIN projects p 
    ON ut.project_id = p.id
    WHERE ut.user_id = $1
    GROUP BY u.id, u.name`,
    [user_id],
  );

  return userProjects.rows;
};
