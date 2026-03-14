import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Product from "../models/Product.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

/* ---------------- ENSURE UPLOAD FOLDER EXISTS ---------------- */

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* ---------------- MULTER CONFIG ---------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* ---------------- GET ALL PRODUCTS ---------------- */

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- GET PRODUCTS BY CATEGORY ---------------- */

router.get("/category/:category", async (req, res) => {
  try {
    let category = req.params.category;

    if (category === "nonVeg") category = "nonveg";

    const products = await Product.find({ category });

    res.json(products);
  } catch (err) {
    console.error("Category products error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- CREATE PRODUCT ---------------- */

router.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, category, price, description, rating } = req.body;

      const imageurl = req.file
        ? `/uploads/${req.file.filename}`
        : req.body.imageurl;

      if (!name || !category || !price || !imageurl) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const product = await Product.create({
        name,
        category,
        price,
        description,
        rating,
        imageurl,
      });

      res.status(201).json(product);
    } catch (err) {
      console.error("Create product error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ---------------- BULK INSERT ---------------- */

router.post("/bulk", requireAuth, requireAdmin, async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Products array required" });
    }

    const inserted = await Product.insertMany(products);

    res.json({
      message: "Products inserted successfully",
      count: inserted.length,
    });
  } catch (err) {
    console.error("Bulk insert error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- DELETE PRODUCT ---------------- */

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;