import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
  addOrder,
} from "./store";

import { toast } from "react-toastify";
import { calculateTotal, calculateCombinedDiscount } from "./discountUtils";

import emailjs from "@emailjs/browser";

import "./Cart.css";

import { useNavigate } from "react-router-dom";

import QRCode from "react-qr-code";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

import api from "./api/axios";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [slabDiscount, setSlabDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [loading, setLoading] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = calculateTotal(cartItems);
  const taxAmount = totalPrice * 0.18;

  const {
    slabDiscountAmount,
    couponDiscountAmount,
    finalAmount,
    couponResult,
  } = calculateCombinedDiscount(totalPrice, slabDiscount, couponCode);

  const codCharge = paymentMethod === "cod" ? 50 : 0;
  const grandTotal = finalAmount + taxAmount + codCharge;

  const BACKEND_URL =
    (import.meta.env.VITE_API_URL || "http://localhost:8080/api").replace(
      "/api",
      ""
    );

  const itemIncreaser = (item) => {
    dispatch(increaseItem(item));
    toast.success(`${item.name} quantity increased!`);
  };

  const itemDecreaser = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItem(item));
      toast.info(`${item.name} quantity decreased!`);
    } else {
      removeItem(item);
    }
  };

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
    toast.error(`${item.name} removed from cart.`);
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code");
      return;
    }

    if (couponResult?.valid) {
      toast.success(`Coupon Applied! You saved ₹${couponDiscountAmount}`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login or signup before placing an order.",
        confirmButtonText: "Go to Login",
      }).then(() => navigate("/signup"));
      return;
    }

    if (!customerEmail || !customerEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (loading) return;
    setLoading(true);

    const orderPayload = {
      email: customerEmail,
      items: cartItems,
      subtotal: totalPrice,
      tax: taxAmount,
      discount: slabDiscountAmount + couponDiscountAmount,
      paymentMethod,
      totalAmount: grandTotal,
    };

    try {
      await api.post("/orders", orderPayload);

      if (paymentMethod !== "cod") {
        await emailjs.send(
          "service_l2ivhgn",
          "template_8y4uufm",
          {
            order_id: Date.now(),
            email: customerEmail,
            total: grandTotal.toFixed(2),
          },
          "M9xufayNxc_Gn-BvB"
        );
      }

      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
      });

      Swal.fire({
        icon: "success",
        title: "Order Placed 🎉",
        text: "Your order has been placed successfully.",
        timer: 2500,
        showConfirmButton: false,
      });

      dispatch(addOrder(orderPayload));
      dispatch(clearCart());

      navigate("/orders");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page py-5">

      <div className="container cart-main-container">

        <div className="cart-header-box">
          <h2 className="cart-title">🛒 Your Cart</h2>
          <span className="cart-count-label">{totalItems} items</span>
        </div>

        {cartItems.length === 0 ? (

          <div className="cart-empty-box text-center">
            <h4>Your cart is empty</h4>

            <button
              className="btn continue-btn mt-3"
              onClick={() => navigate("/home")}
            >
              Browse Food
            </button>
          </div>

        ) : (

          <div className="row g-4">

            <div className="col-lg-8">

              {cartItems.map((item) => (

                <div key={item._id} className="cart-item-card">

                  <img
                    src={`${BACKEND_URL}${item.imageurl || ""}`}
                    alt={item.name}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <h5>{item.name}</h5>

                    <p className="cart-desc">
                      {item.description}
                    </p>

                    <span className="cart-price">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="cart-controls">

                    <button onClick={() => itemDecreaser(item)}>−</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => itemIncreaser(item)}>+</button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item)}
                  >
                    🗑️
                  </button>

                </div>

              ))}

            </div>

            <div className="col-lg-4">

              <div className="summary-card">

                <h4 className="summary-title text-center mb-4">
                  📄 Bill Summary
                </h4>

                <div className="d-flex justify-content-between">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>GST (18%)</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold">
                  <span>Net Amount</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>

                <input
                  type="email"
                  placeholder="Enter Email for receipt"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="form-control mt-3"
                />

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn btn-primary w-100 mt-3"
                >
                  {loading ? "Processing..." : "Checkout"}
                </button>

                <button
                  onClick={() =>
                    setPaymentMethod(
                      paymentMethod === "qr" ? "cod" : "qr"
                    )
                  }
                  className="btn btn-outline-primary w-100 mt-2"
                >
                  {paymentMethod === "qr"
                    ? "Switch to COD"
                    : "Show UPI QR"}
                </button>

                {paymentMethod === "qr" && (

                  <div className="text-center mt-3">

                    <QRCode
                      value={`upi://pay?pa=avinash7346patel-5@okaxis&am=${grandTotal}`}
                      size={120}
                    />

                    <p className="text-muted mt-1">
                      Scan to pay via UPI
                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Cart;