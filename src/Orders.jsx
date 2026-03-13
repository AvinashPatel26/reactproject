import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, setOrders } from "./store";

import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ShoppingCart
} from "lucide-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Orders.css";

import axios from "./api/axios";

function Orders() {

  const orders = useSelector((state) => state.orders) || [];
  const dispatch = useDispatch();

  const [expandedOrder,setExpandedOrder] = useState(null);

  /* FETCH ORDERS */

  useEffect(()=>{

    axios.get("/orders")

      .then((res)=>{
        dispatch(setOrders(res.data));
      })

      .catch((err)=>{
        console.error("Failed to fetch orders:",err);
      });

  },[dispatch]);

  const handleToggle=(id)=>{
    setExpandedOrder(
      expandedOrder===id ? null : id
    );
  };

  const handleReorder=(items)=>{

    items.forEach((item)=>{

      dispatch(
        addToCart({
          ...item,
          quantity:item.quantity || 1
        })
      );

    });

    alert("Items added back to cart ✅");

  };

  /* GROUP BY MONTH */

  const groupOrdersByMonth=(ordersList)=>{

    if(!Array.isArray(ordersList)) return {};

    return ordersList.reduce((groups,order,index)=>{

      if(!order?.date) return groups;

      const date = new Date(order.date);

      const monthYear = date.toLocaleString("en-US",{
        month:"long",
        year:"numeric"
      });

      if(!groups[monthYear]){
        groups[monthYear] = [];
      }

      groups[monthYear].push({
        ...order,
        id:index
      });

      return groups;

    },{});

  };

  const groupedOrders =
    groupOrdersByMonth(orders);

  return(

    <div className="orders-page">

      <div className="container">

        <h2 className="orders-title">
          🧾 Orders History
        </h2>

        {orders.length>0 ? (

          Object.keys(groupedOrders).map(
            (monthYear,groupIndex)=>(

            <div
              key={groupIndex}
              className="orders-month-group"
            >

              <h5 className="month-header">
                {monthYear}
              </h5>

              {groupedOrders[monthYear].map(
                (purchase)=>(
                
                <div
                  key={purchase.id}
                  className="order-card"
                >

                  {/* ORDER HEADER */}

                  <div
                    className="order-header"
                    onClick={()=>handleToggle(
                      purchase.id
                    )}
                  >

                    <div className="order-header-left">

                      <span className="icon-text">

                        <Calendar size={16}/>

                        {purchase.date
                          ? new Date(
                              purchase.date
                            ).toLocaleDateString("en-GB")
                          : "Unknown Date"}

                      </span>

                      <span className="order-total">

                        ₹{purchase.totalPrice
                          ? purchase.totalPrice.toFixed(2)
                          : "0.00"}

                      </span>

                    </div>

                    {expandedOrder===purchase.id
                      ? <ChevronUp size={18}/>
                      : <ChevronDown size={18}/>
                    }

                  </div>

                  {/* ORDER ITEMS */}

                  {expandedOrder===purchase.id &&(

                    <div className="order-items">

                      {purchase.items?.map(
                        (item,index)=>(
                        
                        <div
                          key={index}
                          className="order-item"
                        >

                          <img
                            src={
                              item.imageurl ||
                              "https://via.placeholder.com/100"
                            }
                            alt={item.name}
                            className="order-img"
                          />

                          <div className="order-info">

                            <span className="item-name">
                              {item.name}
                            </span>

                            <span className="item-qty">
                              Qty: {item.quantity}
                            </span>

                            <span className="item-price">
                              ₹{(
                                item.price *
                                item.quantity
                              ).toFixed(2)}
                            </span>

                          </div>

                        </div>

                      ))}

                      <div className="reorder-btn-box">

                        <button
                          className="reorder-btn"
                          onClick={()=>handleReorder(
                            purchase.items
                          )}
                        >

                          <ShoppingCart size={16}/>
                          Reorder

                        </button>

                      </div>

                    </div>

                  )}

                </div>

              ))}

            </div>

          ))

        ) : (

          <p className="orders-empty">
            No orders placed yet.
          </p>

        )}

      </div>

    </div>

  );

}

export default Orders;