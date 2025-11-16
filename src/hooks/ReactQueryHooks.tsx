import axiosInstance from "@/lib/axiosInstance";
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

export const useProfile = async () => {
  const response = await axiosInstance.get(`/api/users/me/`);
  return response.data?.data;
};

// export const adminList = async (role: string) => {
//   const res = await axiosInstance.get(`/public/api/${role}/adminacc`);
//   return res.data?.data;
// };

// export const statusUpdate = async ({
//   statusData,
//   role,
//   id,
// }: {
//   statusData: any;
//   role: string;
//   id: string | number;
// }) => {
//   return axiosInstance.put(`/public/api/${role}/statusup/${id}`, statusData);
// };
