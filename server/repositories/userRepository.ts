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
