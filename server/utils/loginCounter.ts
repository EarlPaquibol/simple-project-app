import { redisClient } from "../redis.js";

export const loginCounter = async (user_id: string) => {
  const key = `login_count:user:${user_id}`;

  const count = await redisClient.incr(key);

  return count;
};

export const getLoginCount = async (user_id: string) => {
  const key = `login_count:user:${user_id}`;

  const count = await redisClient.get(key);

  return count ? parseInt(count) : 0;
};
