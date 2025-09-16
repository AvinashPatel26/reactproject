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
    if (!customerEmail) {
      toast.error("Please enter your email address");
      return;
    }

    emailjs
      .send(
        "service_l2ivhgn",
        "template_8y4uufm",
        templateParams,
        "M9xufayNxc_Gn-BvB"
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Order Placed! 🎉",
          html: `<p>Your order <b>#${templateParams.order_id}</b> has been placed successfully.</p>
                 <p>A confirmation email has been sent to <b>${customerEmail}</b>.</p>`,
          confirmButtonText: "Awesome 🚀",
          confirmButtonColor: "#28a745",
        }).then(() => {
          const purchaseDetails = {
            date: new Date().toLocaleString(),
            items: [...cartItems],
            totalPrice: grandTotal,
          };

          dispatch(addOrder(purchaseDetails));
          dispatch(clearCart());
          navigate("/orders");
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send order confirmation. Please try again.",
        });
      });
  };

  return (
    <div className="cart-page bg-light py-5">
      <ToastContainer />
      <div className="container cart-container shadow-lg bg-white rounded">
        <h2 className="mb-4 text-center fw-bold text-primary cart-title">
          🛒 Your Cart ({totalItems} items)
        </h2>

        {cartItems.length === 0 ? (
          <div className="alert alert-info text-center">Your cart is empty</div>
        ) : (
          <div className="row g-4">
            {/* Cart Items Section */}
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card mb-3 border-0 shadow-sm cart-item-card"
                >
                  <div className="row g-0 align-items-center">
                    <div className="col-md-2">
                      <img
                        src={item.imageurl}
                        alt={item.name}
                        className="img-fluid rounded-start cart-item-image"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h6 className="card-title fw-bold text-primary">
                          {item.name}
                        </h6>
                        <p className="card-text text-muted small">
                          {item.description}
                        </p>
                        <p className="fw-semibold text-success small">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => itemDecreaser(item)}
                          >
                            −
                          </button>
                          <span className="px-2 align-self-center small">
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
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(item)}
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="col-lg-4">
              <div className="p-4 rounded shadow-lg bg-light summary-card">
                <h4 className="fw-bold mb-3 text-center text-primary">
                  Order Summary
                </h4>
                <p className="d-flex justify-content-between">
                  <span>Subtotal:</span> <span>₹{totalPrice.toFixed(2)}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <span>Sales Tax (18%):</span>{" "}
                  <span>₹{taxAmount.toFixed(2)}</span>
                </p>
                <p className="d-flex justify-content-between text-danger">
                  <span>Manual Discount:</span>
                  <span>- ₹{slabDiscountAmount.toFixed(2)}</span>
                </p>
                <p className="d-flex justify-content-between text-success">
                  <span>Coupon Discount:</span>
                  <span>- ₹{couponDiscountAmount.toFixed(2)}</span>
                </p>
                {paymentMethod === "cod" && (
                  <p className="d-flex justify-content-between text-warning">
                    <span>Cash on Delivery:</span> <span>+ ₹50.00</span>
                  </p>
                )}
                <hr />
                <p className="d-flex justify-content-between fw-bold text-dark">
                  <span>Grand Total:</span>{" "}
                  <span>₹{grandTotal.toFixed(2)}</span>
                </p>

                {/* Manual Discounts */}
                <div className="mb-3">
                  <label className="fw-semibold">Manual Discounts</label>
                  <div>
                    {[10, 20, 30].map((value) => (
                      <button
                        key={value}
                        className={`btn me-2 mb-2 ${
                          slabDiscount === value
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => handleApplySlabDiscount(value)}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coupon Code */}
                <div className={`coupon-box ${blast ? "blast" : ""}`}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="form-control"
                    />
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim()}
                    >
                      Apply
                    </button>
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={handleResetCoupon}
                      disabled={!couponCode.trim()}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="fw-semibold">Email for Confirmation</label>
                  <input
                    type="email"
                    placeholder="youremail@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="form-control"
                  />
                </div>

                {/* Payment Options */}
                <div className="payment-method mb-3 text-center">
                  <h6 className="fw-semibold">Select Payment Method</h6>
                  <div className="d-flex justify-content-center gap-2 mb-3">
                    <button
                      className={`btn ${
                        paymentMethod === "qr"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setPaymentMethod("qr")}
                    >
                      QR Code
                    </button>
                    <button
                      className={`btn ${
                        paymentMethod === "cod"
                          ? "btn-warning"
                          : "btn-outline-warning"
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      Cash on Delivery (+₹50)
                    </button>
                  </div>

                  {paymentMethod === "qr" && (
                    <>
                      <h6 className="fw-semibold">Scan the QR code to pay</h6>
                      <QRCode
                        value={`upi://pay?pa=avinash7346patel@oksbi&pn=FoodSensation&am=${grandTotal.toFixed(
                          2
                        )}&cu=INR`}
                        size={150}
                      />
                      <p className="small mt-2 text-muted">
                        UPI ID: avinash7346patel@oksbi
                      </p>
                    </>
                  )}
                </div>

                {/* Checkout */}
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

        {/* Continue Shopping */}
        <div className="text-center mt-5">
          <button
            className="btn btn-outline-primary rounded-pill px-4 py-2 continue-shopping-btn"
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
