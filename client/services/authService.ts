import api from "@/lib/apiClient";
import { setAccessToken } from "@/lib/tokenStore";

export const login = async (email: string, password: string) => {
  const result = await api.post("/users/login", {
    email,
    password,
  });

  const { accessToken, user } = result.data;

  setAccessToken(accessToken);

  return user;
};
