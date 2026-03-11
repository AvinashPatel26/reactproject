import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "dev-access-secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";
const ADMIN_USERNAMES = (process.env.ADMIN_USERNAMES || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const signTokens = (user) => {
  const payload = {
    sub: user._id.toString(),
    username: user.username,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1d" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

router.post("/register", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const role = ADMIN_USERNAMES.includes(username) ? "admin" : "user";
    const user = await User.create({ name, username, passwordHash, role });

    return res.status(201).json({
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = signTokens(user);

    return res.json({
      accessToken,
      refreshToken,
      name: user.name,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

