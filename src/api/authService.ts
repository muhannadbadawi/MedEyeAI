// src/api/authService.ts
import api from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/api/login", { email, password });
  console.log("response: ", response);
  return response.data;
};

export const register = async (userData: { name: string, email: string; password: string }) => {
  const response = await api.post("/api/register", userData);
  return response.data;
};
