// src/authService.ts
import api from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  console.log("response: ", response);
  return response.data;
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/register", {
    ...userData,
    // age: userData.age.toString(),
  });
  return response.data;
};

export const forgetPassword = async (email: string, newPassword: string) => {
  const response = await api.post("/forgetPassword", { email, newPassword });
  return response.data;
};
