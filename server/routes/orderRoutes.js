import express from "express";
import Order from "../models/Order.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

/* CREATE ORDER */

router.post("/", requireAuth, async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.user.id,
      items: req.body.items,
      totalAmount: req.body.totalAmount
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
  }
});

/* GET USER ORDER HISTORY */

router.get("/myorders", requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default router;