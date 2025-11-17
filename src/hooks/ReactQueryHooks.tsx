import axiosInstance from "@/lib/axios.config";
import axios from "axios";

// ============ TYPES ============
export interface LoginData {
  email: string;
  password: string;
}

// ============ AUTH ============

export const loginUser = async (userData: LoginData) => {
  const response = await axios.post(
    "https://todo-app.pioneeralpha.com/api/auth/login/",
    userData
  );
  return response;
};

export const signUpUser = async (usersData: LoginData) => {
  const response = await axios.post(
    "https://todo-app.pioneeralpha.com/api/users/signup/",
    usersData
  );
  return response;
};

export const userProfile = async () => {
  const response = await axiosInstance.get(`/users/me/`);
  return response?.data;
};

export const todosList = async () => {
  const response = await axiosInstance.get(`/todos/`);
  return response?.data?.results;
};
