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

  const handleApplySlabDiscount = (value) => {
    setSlabDiscount(value);
    toast.success(`Discount of ${value}% applied!`);
  };

  const handleApplyCoupon = () => {
    if (couponResult.isValid) {
      setBlast(true);
      toast.success(`Coupon applied: ${couponResult.discountPercent}% off 🎉`);
      setTimeout(() => setBlast(false), 1200);
    } else {
      toast.error("Invalid coupon code ❌");
    }
  };

  const handleResetCoupon = () => {
    setCouponCode("");
    toast.info("Coupon reset.");
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login or signup before placing an order.",
        confirmButtonText: "Go to Login",
      }).then(() => navigate("/login"));
      return;
    }

    if (!customerEmail) {
      toast.error("Please enter your email address");
      return;
    }

    const orderPayload = {
      email: customerEmail,
      items: cartItems,
      subtotal: totalPrice,
      tax: taxAmount,
      discount: slabDiscountAmount + couponDiscountAmount,
      paymentMethod,
      totalAmount: grandTotal,
    };

    if (paymentMethod === "cod") {
      axios.post("/orders", orderPayload).then(() => {
        Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Cash on Delivery selected. Pay when the order arrives.",
        });

        dispatch(addOrder(orderPayload));
        dispatch(clearCart());
        navigate("/orders");
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "Checkout Failed",
          text: "Something went wrong.",
        });
      });
      return;
    }

    axios
      .post("/orders", orderPayload)
      .then(() => {
        return emailjs.send(
          "service_l2ivhgn",
          "template_8y4uufm",
          templateParams,
          "M9xufayNxc_Gn-BvB",
        );
      })
      .then(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const interval = setInterval(() => {
          if (Date.now() > animationEnd) return clearInterval(interval);
          confetti({
            particleCount: 50,
            spread: 360,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
          });
        }, 250);

        Swal.fire({
          icon: "success",
          title: "Order Placed! 🎉",
          html: `<p>Your order has been placed successfully.</p>
                 <p>A confirmation email has been sent to <b>${customerEmail}</b>.</p>
                 <p>Redirecting to your orders...</p>`,
          showConfirmButton: false,
          timer: 5000,
        });

        setTimeout(() => {
          dispatch(addOrder(orderPayload));
          dispatch(clearCart());
          navigate("/orders");
        }, 5000);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Checkout Failed",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="cart-page py-5">
      <ToastContainer />
      <div className="container cart-main-container p-4 rounded">
        <h2 className="mb-4 text-center fw-bold cart-title">
          🛒 YOUR CART ({totalItems} ITEMS)
        </h2>

        {cartItems.length === 0 ? (
          <div className="alert cart-empty text-center">Your cart is empty</div>
        ) : (
          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card mb-3 border-0 cart-item-card"
                >
                  <div className="row g-0 align-items-center h-100">
                    <div className="col-md-3 h-100">
                      <img
                        src={`http://localhost:8080${item.imageurl}`}
                        alt={item.name}
                        className="img-fluid rounded-start cart-item-image"
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <h6 className="card-title fw-bold">
                          {item.name}
                        </h6>
                        <p className="card-text small cart-desc">
                          {item.description}
                        </p>
                        <p className="fw-semibold small cart-price">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => itemDecreaser(item)}
                          >
                            −
                          </button>
                          <span className="px-3 align-self-center small fw-bold">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => itemIncreaser(item)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-end pe-3">
                      <button
                        className="btn btn-sm remove-btn"
                        onClick={() => removeItem(item)}
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="col-lg-4">
              <div className="p-4 rounded summary-card">
                <h4 className="fw-bold mb-3 text-center">
                  Order Summary
                </h4>

                <p className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </p>

                <p className="d-flex justify-content-between">
                  <span>Sales Tax (18%):</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </p>

                <p className="d-flex justify-content-between discount-text">
                  <span>Manual Discount:</span>
                  <span>- ₹{slabDiscountAmount.toFixed(2)}</span>
                </p>

                <p className="d-flex justify-content-between coupon-text">
                  <span>Coupon Discount:</span>
                  <span>- ₹{couponDiscountAmount.toFixed(2)}</span>
                </p>

                {paymentMethod === "cod" && (
                  <p className="d-flex justify-content-between cod-text">
                    <span>Cash on Delivery:</span>
                    <span>+ ₹50.00</span>
                  </p>
                )}

                <hr className="custom-hr" />

                <p className="d-flex justify-content-between fw-bold grand-total">
                  <span>Grand Total:</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </p>

                {/* Discounts */}
                <div className="mb-3 mt-4">
                  <label className="fw-semibold mb-2">Manual Discounts</label>
                  <div className="d-flex gap-2">
                    {[10, 20, 30].map((value) => (
                      <button
                        key={value}
                        className={`btn btn-slab ${
                          slabDiscount === value ? "active" : ""
                        }`}
                        onClick={() => handleApplySlabDiscount(value)}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coupon */}
                <div className={`coupon-box ${blast ? "blast" : ""} mb-3`}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="form-control"
                    />
                    <button
                      className="btn btn-success"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim()}
                    >
                      Apply
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={handleResetCoupon}
                      disabled={!couponCode.trim()}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="fw-semibold mb-2">Email for Confirmation</label>
                  <input
                    type="email"
                    className="form-control"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>

                {/* Payment */}
                <div className="payment-method text-center mb-4 mt-4">
                  <h6 className="fw-semibold mb-3">Select Payment Method</h6>
                  <div className="d-flex justify-content-center gap-2 mb-3">
                    <button
                      className={`btn btn-payment ${
                        paymentMethod === "qr" ? "active" : ""
                      }`}
                      onClick={() => setPaymentMethod("qr")}
                    >
                      QR Code
                    </button>
                    <button
                      className={`btn btn-payment ${
                        paymentMethod === "cod" ? "active" : ""
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      COD (+₹50)
                    </button>
                  </div>

                  {paymentMethod === "qr" && (
                    <div className="qr-wrapper mt-3 p-3 rounded">
                      <QRCode
                        value={`upi://pay?pa=avinash7346patel@oksbi&pn=FoodSensation&am=${grandTotal.toFixed(
                          2,
                        )}&cu=INR`}
                        size={150}
                        className="rounded"
                      />
                      <p className="small mt-2 text-muted">
                        UPI ID: avinash7346patel@oksbi
                      </p>
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-lg btn-success w-100 checkout-btn"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0 || !customerEmail}
                >
                  ✅ Place Order
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-5">
          <button
            className="btn continue-btn px-4 py-2"
            onClick={() => navigate("/home")}
          >
            🛍️ Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;