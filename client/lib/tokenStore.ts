let ACCESS_TOKEN: string | null = null;

export const setAccessToken = (token: string) => {
  ACCESS_TOKEN = token;
};

export const getAccessToken = () => {
  return ACCESS_TOKEN;
};

export const clearAccessToken = () => {
  ACCESS_TOKEN = null;
};
