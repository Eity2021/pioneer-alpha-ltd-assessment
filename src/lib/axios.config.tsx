import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://todo-app.pioneeralpha.com/api/",
  // withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       Cookies.remove("access");
//       Cookies.remove("refresh");
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
