// src/api/authService.ts
import api from "./axios";

export const login = async (email: string, password: string) => {
    console.log("email: ", email);
  const response = await api.post("/login", { email, password });
  console.log("response: ", response);
  return response.data;
};

export const register = async (userData: { email: string; password: string }) => {
  const response = await api.post("/register", userData);
  return response.data;
};
