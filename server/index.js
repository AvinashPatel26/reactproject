import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

/* Ensure uploads folder exists */
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

/* ==========================================
   FIXED CORS (Crucial for Vercel + Render)
========================================== */
const allowedOrigins = [
  "http://localhost:5173", // Your local Vite React server
  "http://localhost:5174",
  "https://delicious-bites-mauve.vercel.app" // Your deployed Vercel frontend!
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* Middlewares */
app.use(express.json());
app.use(morgan("dev"));

/* Static images */
app.use("/uploads", express.static(uploadsDir));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/images", uploadRoutes);

/* Health route */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is awake and running!" });
});

/* ==========================================
   FIXED MONGODB CONNECTION
========================================== */
// If MONGODB_URI is not in your .env, it safely falls back to local
const MONGO = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/food-sensations";

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });