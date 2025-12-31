import axiosInstance from "./axios-instance";

export const signup = async (name: string, email: string, password: string) => {
  const res = await axiosInstance.post("user/register", {
    name,
    email,
    password,
  });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await axiosInstance.post("user/login", {
    email,
    password,
  });
  return res.data;
};

export const fetchUserData = async () => {
  const res = await axiosInstance.get("user/my-profile");
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("user/logout");
  return res.data;
};

export const submitQuery = async (query: string) => {
  const res = await axiosInstance.post("ai-assist/research", {
    query,
  });
  return res.data;
}

export const healthCheck = async () => {
  return await axiosInstance.get("ai-assist/health");
}