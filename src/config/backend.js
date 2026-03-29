// src/config/backend.js

const RAW_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV
        ? "http://localhost:8080/api"
        : "https://reactproject-backend-qzch.onrender.com/api");

// Ensure trailing /api
export const API_BASE = RAW_URL.endsWith("/api")
    ? RAW_URL
    : `${RAW_URL}/api`;

// Root URL (for images/videos)
export const BACKEND_URL = API_BASE.replace("/api", "");