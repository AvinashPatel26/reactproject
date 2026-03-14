import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, setOrders } from "./store";
import { Calendar, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import "./Orders.css";
import axios from "./api/axios";

function Orders() {

  const orders = useSelector((state) => state.orders) || [];
  const dispatch = useDispatch();
  const [expandedOrder,setExpandedOrder] = useState(null);

  useEffect(()=>{

    axios.get("/orders")
      .then((res)=> dispatch(setOrders(res.data)))
      .catch((err)=> console.error(err));

  },[dispatch]);

  const handleToggle=(id)=>{
    setExpandedOrder(expandedOrder===id ? null : id);
  };

  const handleReorder=(items)=>{

    items.forEach((item)=>{
      dispatch(addToCart({
        ...item,
        quantity:item.quantity || 1
      }));
    });

    alert("Items added back to cart ✅");

  };

  return (
    <div className="orders-page">
      <div className="container">
        <h2 className="orders-title">🧾 Orders History</h2>

        {orders.length === 0 && (
          <p>No orders placed yet.</p>
        )}

      </div>
    </div>
  );
}

export default Orders;