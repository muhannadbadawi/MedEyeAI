// src/authService.ts
import api from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data  ;
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const forgetPassword = async (email: string, newPassword: string) => {
  const response = await api.post("/forgetPassword", { email, newPassword });
  return response.data;
};
