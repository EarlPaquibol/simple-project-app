import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});

export const connectRedis = async () => {
  await redisClient.connect();
  console.log("Redis client connected");
};
