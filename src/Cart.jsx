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
      <div className="cart-header-box reveal">
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
            {cartItems.map((item, index) => (
              <div
                key={item._id}
                className={`cart-item-card reveal-left delay-${(index % 5) * 100}`}
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
                    style={{color: "#ef4444"}}
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => itemIncreaser(item)}
                    style={{color: "#22c55e"}}
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item)}
                  title="Remove Item"
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>

          {/* ORDER SUMMARY */}
          <div className="col-lg-4">
            <div className="summary-card reveal-right delay-200">
              <h4 className="summary-title text-center mb-4" style={{fontSize: "1.25rem", color: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
                📄 Bill Summary
              </h4>

              {/* SLAB DISCOUNTS */}
              <div className="mb-3 text-center">
                <span className="d-block mb-2" style={{fontSize: "0.85rem", fontWeight: "600", color: "#334155"}}>Apply Discount</span>
                <div className="d-flex justify-content-center gap-2">
                  {[10, 20, 30].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => setSlabDiscount(percent)}
                      style={{
                        padding: "4px 12px", 
                        fontSize: "0.75rem", 
                        border: "1px solid #a855f7", 
                        background: slabDiscount === percent ? "#a855f7" : "transparent",
                        color: slabDiscount === percent ? "white" : "#a855f7",
                        borderRadius: "4px",
                        fontWeight: "600",
                        transition: "all 0.2s"
                      }}
                    >
                      {percent}% OFF
                    </button>
                  ))}
                </div>
              </div>

              {/* COUPON */}
              <div className="mb-4 text-center">
                 <span className="d-block mb-2" style={{fontSize: "0.85rem", fontWeight: "600", color: "#334155"}}>Apply Coupon</span>
                 <div style={{display: "flex", gap: "10px"}}>
                   <input
                     type="text"
                     placeholder="Enter Coupon Code"
                     value={couponCode}
                     onChange={(e) => setCouponCode(e.target.value)}
                     style={{flex: 1, padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.85rem", outline: "none"}}
                   />
                   <button onClick={handleApplyCoupon} style={{borderRadius: "6px", padding: "8px 20px", background: "#3b82f6", color: "white", border:"none", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer"}}>
                     Apply
                   </button>
                 </div>
              </div>

              {/* ROWS */}
              <div className="d-flex justify-content-between mb-1" style={{fontSize: "0.85rem"}}>
                <span style={{color: "#334155"}}>Total Amount</span>
                <span style={{fontWeight: "600", color: "#0f172a"}}>₹{totalPrice.toFixed(2)}</span>
              </div>

              {(slabDiscountAmount > 0 || couponDiscountAmount > 0) && (
                <div className="d-flex justify-content-between mb-1" style={{fontSize: "0.85rem"}}>
                  <span style={{color: "#ef4444"}}>
                    Discount {slabDiscount > 0 ? `(${slabDiscount}%)` : ""}
                  </span>
                  <span style={{fontWeight: "600", color: "#ef4444"}}>-₹{(slabDiscountAmount + couponDiscountAmount).toFixed(2)}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-1" style={{fontSize: "0.85rem"}}>
                <span style={{color: "#334155"}}>Price After Discount</span>
                <span style={{fontWeight: "600", color: "#0f172a"}}>₹{finalAmount.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3" style={{fontSize: "0.85rem"}}>
                <span style={{color: "#334155"}}>GST (18%)</span>
                <span style={{fontWeight: "600", color: "#0f172a"}}>₹{taxAmount.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 pt-2" style={{borderTop: "1px solid #e2e8f0"}}>
                <span style={{fontSize: "1rem", color: "#3b82f6", fontWeight: "700"}}>Net Amount</span>
                <span style={{fontSize: "1rem", color: "#3b82f6", fontWeight: "700"}}>₹{grandTotal.toFixed(2)}</span>
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter Email for receipt"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{width: "100%", fontSize: "0.85rem", padding: "10px", borderRadius: "4px", border: "1px solid #cbd5e1", outline: "none"}}
                />
              </div>

              {/* TOTAL AMOUNT INFO */}
              <div className="text-center mb-3">
                <h3 style={{color: "#0d9488", fontWeight: "700", fontSize: "1.25rem", margin: 0}}>
                  Total Amount: ₹{grandTotal.toFixed(2)}
                </h3>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={loading}
                style={{width: "100%", padding: "10px", borderRadius: "6px", background: "#3b82f6", color: "white", border: "none", fontWeight: "600", marginBottom: "12px", cursor: "pointer"}}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>

              <button
                onClick={() => setPaymentMethod(paymentMethod === "qr" ? "cod" : "qr")}
                style={{width: "100%", padding: "8px", borderRadius: "4px", fontWeight: "600", background: "transparent", border: "1px solid #93c5fd", color: "#3b82f6", cursor: "pointer", fontSize: "0.85rem"}}
              >
                {paymentMethod === "qr" ? "SHOW UPI QR" : "SHOW UPI QR"} {/* Toggle logic kept but text matches original exact image */}
              </button>

              {paymentMethod === "qr" && (
                <div className="text-center mt-3">
                  <QRCode
                    value={`upi://pay?pa=avinash7346patel-5@okaxis&am=${grandTotal}`}
                    size={100}
                  />
                  <p className="mt-1 mb-0 text-muted" style={{fontSize: "0.75rem"}}>Scan to pay via UPI</p>
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