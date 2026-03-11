export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Backend root URL (without /api)
export const BACKEND_URL = API_BASE.replace("/api", "");