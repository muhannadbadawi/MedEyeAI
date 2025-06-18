// src/authService.ts
import toast from "react-hot-toast";
import api from "./axios";
import { UserRole } from "../enums/userRole";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // add other user fields as needed
};

type LoginResponse = {
  message: string;
  user: User;
  status: string;
};

// Accept a navigate function as a parameter
export const login = async (
  email: string,
  password: string,
  navigate: (path: string) => void
) => {
  const response = await api.post<LoginResponse>("/login", { email, password });
  if (response.data.status === "success") {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate(`${response.data.user.role}/home`);
  } else {
    toast.error(response.data.message);
  }
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
