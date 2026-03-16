import axios from "axios";
import { API_BASE } from "../config/backend";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 60000, // 🚀 INCREASED TO 60 SECONDS! (Crucial for Render free tier)
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
      // Wait for Render to wake up!
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");
      window.location.href = "/signup";
    }

    return Promise.reject(error);
  }
);

export default api;