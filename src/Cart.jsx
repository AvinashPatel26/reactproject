import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseItem,
  decreaseItem,
  clearCart,
  addOrder,
} from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { calculateTotal, calculateCombinedDiscount } from "./discountUtils";
import emailjs from "@emailjs/browser";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import axios from "./api/axios";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [slabDiscount, setSlabDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [blast, setBlast] = useState(false);
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

  const templateParams = {
    order_id: Date.now(),
    orders: cartItems.map((item) => ({
      name: item.name,
      price: (item.price * item.quantity).toFixed(2),
      units: item.quantity,
    })),
    cost: {
      shipping: codCharge,
      tax: taxAmount.toFixed(2),
      total: grandTotal.toFixed(2),
    },
    email: customerEmail,
  };

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

  // ADDED: Apply coupon handler
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

    if (!customerEmail) {
      toast.error("Please enter a valid email address");
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
      await axios.post("/orders", orderPayload);

      if (paymentMethod !== "cod") {
        await emailjs.send(
          "service_l2ivhgn",
          "template_8y4uufm",
          templateParams,
          "M9xufayNxc_Gn-BvB"
        );
      }

      // ADDED: Bigger confetti celebration
      confetti({
        particleCount: 250,
        spread: 120,
        origin: { y: 0.6 },
      });

      Swal.fire({
        icon: "success",
        title: "Order Placed! 🎉",
        text: "Your order has been placed successfully.",
        timer: 3000,
        showConfirmButton: false,
      });

      dispatch(addOrder(orderPayload));
      dispatch(clearCart());

      navigate("/orders");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  
    // Only UI improvements added – logic untouched

return (
  <div className="cart-page py-5">
    <ToastContainer />

    <div className="container cart-main-container">

      {/* CART HEADER */}

      <div className="cart-header-box">

        <h2 className="cart-title">
          🛒 Your Cart
        </h2>

        <span className="cart-count-label">
          {totalItems} items
        </span>

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

          {/* CART ITEMS */}

          <div className="col-lg-8">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="cart-item-card"
              >

                <img
                  src={`${BACKEND_URL}${item.imageurl}`}
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

                  <button
                    onClick={() => itemDecreaser(item)}
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => itemIncreaser(item)}
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item)}
                >
                  ✖
                </button>

              </div>

            ))}

          </div>

          {/* ORDER SUMMARY */}

          <div className="col-lg-4">

            <div className="summary-card">

              <h4 className="summary-title">
                Order Summary
              </h4>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              {couponDiscountAmount > 0 && (
                <div className="summary-row discount">
                  <span>Coupon</span>
                  <span>-₹{couponDiscountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Tax</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>

              {paymentMethod === "cod" && (
                <div className="summary-row">
                  <span>COD Fee</span>
                  <span>₹50</span>
                </div>
              )}

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>

              {/* COUPON */}

              <div className="coupon-box">

                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                <button onClick={handleApplyCoupon}>
                  Apply
                </button>

              </div>

              {/* EMAIL */}

              <input
                type="email"
                placeholder="Enter email"
                className="email-input"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />

              {/* PAYMENT METHOD */}

              <div className="payment-methods">

                <button
                  className={
                    paymentMethod === "qr"
                      ? "active"
                      : ""
                  }
                  onClick={() => setPaymentMethod("qr")}
                >
                  QR Pay
                </button>

                <button
                  className={
                    paymentMethod === "cod"
                      ? "active"
                      : ""
                  }
                  onClick={() => setPaymentMethod("cod")}
                >
                  Cash
                </button>

              </div>

              {paymentMethod === "qr" && (

                <div className="qr-box">

                  <QRCode
                    value={`upi://pay?pa=avinash7346patel-5@okaxis&am=${grandTotal}`}
                    size={140}
                  />

                </div>

              )}

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Place Order"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  </div>
);
};


export default Cart;