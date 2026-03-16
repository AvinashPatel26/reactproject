import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, setOrders } from "./store";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Receipt,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

function Orders() {
  const orders = useSelector((state) => state.orders) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const BACKEND_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:8080/api"
  ).replace("/api", "");

  useEffect(() => {
    // Fetch orders from backend
    axios
      .get("/orders")
      .then((res) => {
        dispatch(setOrders(res.data));
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleToggle = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const handleReorder = (items) => {
    items.forEach((item) => {
      dispatch(
        addToCart({
          ...item,
          quantity: item.quantity || 1,
        }),
      );
    });
    toast.success("Items added back to cart! 🛒");
    navigate("/cart"); // Redirect user to cart so they can checkout
  };

  // Helper to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
        <Receipt className="w-8 h-8 text-orange-500" />
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">Your Orders</h2>
          <p className="text-gray-500">
            Track and manage your past delicious bites.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <div className="text-center py-20 text-gray-400 font-medium animate-pulse">
          Loading your order history... ⏳
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No orders placed yet.
          </h3>
          <p className="text-gray-500 mb-6">
            Looks like you haven't tasted our amazing food yet!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/40"
          >
            Start Ordering
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* MAP OVER ORDERS */}
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
            >
              {/* ACCORDION HEADER */}
              <div
                className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer bg-gray-50 hover:bg-orange-50 transition-colors gap-4"
                onClick={() => handleToggle(order._id || index)}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Order #{order._id ? order._id.slice(-6) : "Unknown"}
                  </span>
                  <div className="flex items-center text-gray-700 font-medium gap-2 text-sm sm:text-base">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    {formatDate(order.createdAt || order.date)}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  <div className="text-right">
                    <span className="text-sm text-gray-500 block">
                      Total Amount
                    </span>
                    <span className="font-extrabold text-lg text-green-600">
                      ₹
                      {order.totalAmount
                        ? order.totalAmount.toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {expandedOrder === (order._id || index) ? (
                      <ChevronUp className="text-gray-600" />
                    ) : (
                      <ChevronDown className="text-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* ACCORDION BODY (EXPANDED CONTENT) */}
              {expandedOrder === (order._id || index) && (
                <div className="p-5 border-t border-gray-100 bg-white animate-in slide-in-from-top-2 duration-300">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-gray-400" />
                    Items in this order:
                  </h4>

                  <div className="space-y-3 mb-6">
                    {order.items?.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100"
                      >
                        <img
                          src={`${BACKEND_URL}${item.imageurl || ""}`}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg bg-white border border-gray-200"
                          onError={(e) => {
                            e.target.src = "/images/default.png";
                          }}
                        />
                        <div className="flex-grow">
                          <p className="font-semibold text-gray-800 text-sm md:text-base">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-bold text-gray-700">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-4">
                    <div className="text-sm text-gray-500">
                      Payment Method:{" "}
                      <span className="font-semibold uppercase text-gray-700">
                        {order.paymentMethod || "QR"}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent closing the accordion
                        handleReorder(order.items);
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-100 text-orange-600 font-bold px-6 py-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reorder Items
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
