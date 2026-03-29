// Use env if provided, otherwise fallback to deployed backend
const RAW_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV
        ? "http://localhost:8080/api"
        : "https://reactproject-backend-qzch.onrender.com/api");

// Always ensure /api exists
export const API_BASE = RAW_URL.endsWith("/api")
    ? RAW_URL
    : `${RAW_URL}/api`;

// Backend root (for images)
export const BACKEND_URL = API_BASE.replace("/api", "");