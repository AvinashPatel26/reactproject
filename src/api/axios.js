import axios from "axios";
import { API_BASE } from "../config/backend";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Attach JWT */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* Global error handler */

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (!error.response) {
      console.error("Network error:", error);
      alert("Backend server is starting. Try again in 10 seconds.");
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;