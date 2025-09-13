import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store";
import { Calendar, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Orders.css";

function Orders() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleToggle = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const handleReorder = (items) => {
    items.forEach((item) => {
      dispatch(addToCart({ ...item, quantity: item.quantity || 1 }));
    });
    alert("Items added back to cart ✅");
  };

  const groupOrdersByMonth = (orders) => {
    return orders.reduce((groups, order, index) => {
      const date = new Date(order.date);
      const monthYear = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push({ ...order, id: index });
      return groups;
    }, {});
  };

  const groupedOrders = groupOrdersByMonth(orders);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold text-primary">
        🧾 Orders History
      </h2>

      {orders.length > 0 ? (
        Object.keys(groupedOrders).map((monthYear, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            {/* Month-Year Header */}
            <h5 className="month-header">{monthYear}</h5>

            {groupedOrders[monthYear].map((purchase) => (
              <div key={purchase.id} className="order-card shadow-sm">
                {/* Order Header */}
                <div
                  className="order-header"
                  onClick={() => handleToggle(purchase.id)}
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="icon-text">
                      <Calendar size={16} className="me-1" />
                      {new Date(purchase.date).toLocaleDateString("en-GB")}
                    </span>
                    <span className="icon-text text-primary fw-semibold">
                      💰 ₹{purchase.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  {expandedOrder === purchase.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>

                {/* Expandable Items */}
                {expandedOrder === purchase.id && (
                  <div className="order-items">
                    {purchase.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="order-item">
                        <img
                          src={item.imageurl || "https://via.placeholder.com/100"}
                          alt={item.name}
                          className="order-img"
                        />
                        <div className="order-info">
                          <span className="fw-bold small">{item.name}</span>
                          <span className="text-muted small">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-success small fw-semibold">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Reorder Icon Button */}
                    <div className="text-end mt-2">
                      <button
                        className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                        onClick={() => handleReorder(purchase.items)}
                      >
                        <ShoppingCart size={16} /> Reorder
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="alert alert-info text-center">No orders placed yet.</p>
      )}
    </div>
  );
}

export default Orders;
