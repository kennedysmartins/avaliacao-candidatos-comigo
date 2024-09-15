import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.BACKEND_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL,
});

const addAuthToken = async (config: InternalAxiosRequestConfig) => {
  const token = cookies().get("token")?.value;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(addAuthToken, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
