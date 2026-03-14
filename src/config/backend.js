const RAW_URL =
    import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8080" : "");

/* Ensure /api always exists */

export const API_BASE =
    "https://reactproject-backend-qzch.onrender.com"

/* Backend root (for images) */

export const BACKEND_URL = API_BASE.replace("/api", "");