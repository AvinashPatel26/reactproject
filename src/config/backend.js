const RAW_URL =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8080" : "");

/* Ensure /api always exists */

export const API_BASE = RAW_URL.endsWith("/api")
  ? RAW_URL
  : `${RAW_URL}/api`;

/* Backend root (for images) */

export const BACKEND_URL = API_BASE.replace("/api", "");