import * as userRepo from "../repositories/userRepository.js";
import UserType from "../types/userType.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";

dotenv.config();

export const getUsers = () => userRepo.getUsers();

export const createUser = async ({ name, email, password }: UserType) => {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("Email already exists");

  if (password.length < 3) {
    throw new Error("Enter a stronger password!");
  }

  const encryptedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  );

  return userRepo.createUser(name, email, encryptedPassword);
};

export const updateUser = async (id: string, fields: UserType) => {
  if (!id) throw new Error("Id must be given");

  if (!fields || Object.keys(fields).length === 0) {
    throw new Error("Fields must not be empty");
  }

  return userRepo.updateUser(id, fields);
};

export const deleteUser = async (id: string) => {
  if (!id) throw new Error("No id given");
  return userRepo.deleteUser(id);
};

export const getUserTasks = (user_id: string) => {
  if (!user_id) throw new Error("No user_id given!");
  return userRepo.getUserTasks(user_id);
};

export const getUserProjects = (user_id: string) => {
  if (!user_id) throw new Error("No user_id given!");
  return userRepo.getUserProjects(user_id);
};

export const login = async (fields: { email: string; password: string }) => {
  const { email, password } = fields;

  if (!email || !password) throw new Error("Email and password is required!");

  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User does not exist!");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Wrong password!");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: user,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = (refreshToken: string) => {
  if (!refreshToken) throw new Error("Unauthorized!");

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) throw new Error("Forbidden");

  return generateAccessToken(payload);
};
