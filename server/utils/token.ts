import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = (process.env.ACCESS_TOKEN_EXPIRY ||
  "15m") as SignOptions["expiresIn"];

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = (process.env.REFRESH_TOKEN_EXPIRY ||
  "7d") as SignOptions["expiresIn"];

if (!ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not defined");
}

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

export const verifyAccessToken = (accessToken: string) => {
  try {
    return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!) as {
      userId: number;
    };
  } catch {
    return null;
  }
};
