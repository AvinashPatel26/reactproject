import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

import {
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
  addOrder,
} from "./store";
import api from "./api/axios";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [loading, setLoading] = useState(false);
  const [activePromo, setActivePromo] = useState(0); // 0, 10, 20, or 30

  // Calculations
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Calculate Discount based on selected activePromo
  const discountAmount = subTotal * (activePromo / 100);
  const priceAfterDiscount = subTotal - discountAmount;

  const taxAmount = priceAfterDiscount * 0.18; // 18% GST on discounted price
  const codCharge = paymentMethod === "cod" ? 50 : 0;

  const grandTotal = priceAfterDiscount + taxAmount + codCharge;

  const BACKEND_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:8080/api"
  ).replace("/api", "");

  /* --- Handlers --- */

  const itemIncreaser = (item) => {
    dispatch(increaseItem(item));
  };

  const itemDecreaser = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItem(item));
    } else {
      removeItem(item);
    }
  };

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
    toast.error(`${item.name} removed from cart.`);
  };

  const applyPromo = (percentage) => {
    if (activePromo === percentage) {
      // Toggle off if clicking the same button
      setActivePromo(0);
      toast.info("Promo code removed.");
      return;
    }

    setActivePromo(percentage);
    toast.success(`${percentage}% Discount Applied!`);

    // Mini confetti burst for applying a discount
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#f97316", "#eab308", "#ef4444"], // Orange, Yellow, Red
    });
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login or signup before placing an order.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#f97316",
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
      subtotal: subTotal,
      tax: taxAmount,
      discount: discountAmount,
      paymentMethod,
      totalAmount: grandTotal,
    };

    try {
      // await api.post("/orders", orderPayload); // Uncomment when backend is ready

      if (paymentMethod !== "cod") {
        await emailjs.send(
          "service_l2ivhgn",
          "template_8y4uufm",
          {
            order_id: Date.now(),
            email: customerEmail,
            total: grandTotal.toFixed(2),
          },
          "M9xufayNxc_Gn-BvB",
        );
      }

      // Massive confetti for successful order
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 },
      });

      Swal.fire({
        icon: "success",
        title: "Order Placed! 🎉",
        text: "Your delicious food is on the way.",
        timer: 3000,
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
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex justify-between items-end border-b-2 border-gray-100 pb-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            🛒 Your Cart
          </h1>
          <p className="text-gray-500 mt-2">
            Review your items and proceed to checkout.
          </p>
        </div>
        <span className="bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full shadow-sm">
          {totalItems} Items
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Your cart is feeling light
          </h2>
          <p className="text-gray-500 mb-6">
            Add some delicious items from our menu to get started!
          </p>
          <button
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/40"
            onClick={() => navigate("/")}
          >
            Browse Food
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: CART ITEMS */}
          <div className="lg:w-2/3 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-4 relative"
              >
                <img
                  src={`${BACKEND_URL}${item.imageurl || ""}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = "/images/default.png";
                  }}
                />

                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-1">
                    {item.description}
                  </p>
                  <div className="text-orange-600 font-bold mt-1">
                    ₹{item.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <button
                    onClick={() => itemDecreaser(item)}
                    className="w-8 h-8 flex items-center justify-center bg-white text-gray-700 font-bold rounded shadow-sm hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => itemIncreaser(item)}
                    className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded shadow-sm hover:bg-orange-600 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  className="absolute top-4 right-4 sm:static sm:ml-4 text-red-400 hover:text-red-600 transition text-xl bg-red-50 hover:bg-red-100 w-10 h-10 flex items-center justify-center rounded-full"
                  onClick={() => removeItem(item)}
                  title="Remove Item"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY & CHECKOUT */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">
                📄 Bill Summary
              </h3>

              {/* Promo Codes */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  Apply Promo Code 🎁
                </p>
                <div className="flex gap-2">
                  {[10, 20, 30].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => applyPromo(percent)}
                      className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                        activePromo === percent
                          ? "bg-green-500 text-white shadow-md border-2 border-green-600"
                          : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {percent}% OFF
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-gray-600 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    ₹{subTotal.toFixed(2)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount ({activePromo}%)</span>
                    <span>- ₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>

                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-orange-600">
                    <span>COD Charge</span>
                    <span>+ ₹50.00</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6 flex justify-between items-center">
                <span className="font-bold text-lg text-gray-800">
                  Grand Total
                </span>
                <span className="font-extrabold text-2xl text-green-600">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Form */}
              <input
                type="email"
                placeholder="Enter Email for receipt"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4 transition"
              />

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setPaymentMethod("qr")}
                  className={`flex-1 py-2 rounded-xl font-medium transition ${paymentMethod === "qr" ? "bg-orange-100 text-orange-600 border-2 border-orange-500" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}
                >
                  UPI / QR
                </button>
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex-1 py-2 rounded-xl font-medium transition ${paymentMethod === "cod" ? "bg-orange-100 text-orange-600 border-2 border-orange-500" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}
                >
                  Cash on Delivery
                </button>
              </div>

              {paymentMethod === "qr" && (
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                    <QRCode
                      value={`upi://pay?pa=avinash7346patel-5@okaxis&am=${grandTotal.toFixed(2)}`}
                      size={140}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-3 font-medium">
                    Scan to pay exactly ₹{grandTotal.toFixed(2)}
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Place Order 🚀"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
