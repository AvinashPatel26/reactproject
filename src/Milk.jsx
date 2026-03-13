
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseItem,
  decreaseItem,
  fetchProductsByCategory,
} from "./store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Milk.css";
import { useState, useEffect } from "react";
import PriceRange from "./PriceRange";
import { BACKEND_URL } from "./config/backend";

function Milk() {

  const dispatch = useDispatch();

  const milkMenu = useSelector((state) => state.products.milk);
  const cartItems = useSelector((state) => state.cart);

  const [filteredItems,setFilteredItems] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  /* FETCH PRODUCTS */

  useEffect(()=>{
    dispatch(fetchProductsByCategory("milk"));
  },[dispatch]);

  useEffect(()=>{
    setFilteredItems(milkMenu);
  },[milkMenu]);

  const getCartItem=(id)=>
    cartItems.find((item)=>item._id===id);

  const notifyAdd=(name)=>
    toast.success(`${name} added to cart!`);

  const notifyIncrease=(name)=>
    toast.info(`Increased ${name} quantity`);

  const notifyDecrease=(name)=>
    toast.info(`Decreased ${name} quantity`);

  /* PAGINATION */

  const itemsPerPage = 6;

  const totalPages =
    Math.ceil(filteredItems.length/itemsPerPage);

  const indexOfLastItem = currentPage*itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem-itemsPerPage;

  const currentItems =
    filteredItems.slice(indexOfFirstItem,indexOfLastItem);

  const handlePageChange=(page)=>{
    if(page>=1 && page<=totalPages)
      setCurrentPage(page);
  };

  return(

    <div className="milkPage-bg">

      <ToastContainer/>

      {/* HEADER */}
      <section className="milkPage-header reveal">
        <h1 className="milkPage-heading">
          🥛 Fresh Dairy Products
        </h1>
        <p className="milkPage-subtitle">
          Creamy and fresh dairy items for you
        </p>
      </section>

      {/* FILTER */}

      <div className="milkPage-filter">

        <PriceRange
          products={milkMenu}
          onFilter={(items)=>{
            setFilteredItems(items);
            setCurrentPage(1);
          }}
          minPrice={0}
          maxPrice={500}
          step={10}
        />

      </div>

      {/* PRODUCT GRID */}

      <div className="milkPage-grid">

        {currentItems.length>0 ? (

          currentItems.map((item)=>{

            const cartItem = getCartItem(item._id);

            return(
              <div
                className={`milkPage-card reveal-scale delay-${(item._id.charCodeAt(0) % 5) * 100}`}
                key={item._id}
              >

                <img
                  src={`${BACKEND_URL}${item.imageurl}`}
                  alt={item.name}
                  className="milk-img"
                />

                <div className="milkPage-body">

                  <h3 className="milkPage-name">
                    {item.name}
                  </h3>

                  {item.rating && (
                    <span className="milkPage-rating">
                      ⭐ {item.rating}
                    </span>
                  )}

                  <p className="milkPage-desc">
                    {item.description}
                  </p>

                  <div className="milkPage-footer">

                    <span className="milkPage-price-amount">
                      ₹{item.price}
                    </span>

                    {!cartItem ? (

                      <button
                        className="milkPage-btn-add"
                        onClick={()=>{
                          dispatch(addToCart(item));
                          notifyAdd(item.name);
                        }}
                      >
                        Add
                      </button>

                    ):(

                      <div className="milkPage-counter">

                        <button
                          onClick={()=>{
                            dispatch(decreaseItem(item));
                            notifyDecrease(item.name);
                          }}
                        >
                          −
                        </button>

                        <span>
                          {cartItem.quantity}
                        </span>

                        <button
                          onClick={()=>{
                            dispatch(increaseItem(item));
                            notifyIncrease(item.name);
                          }}
                        >
                          +
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            );

          })

        ):(
          <p className="text-center">
            No milk items available
          </p>
        )}

      </div>

      {/* PAGINATION */}

      {totalPages>1 &&(

        <div className="milkPage-pagination">

          <button
            onClick={()=>handlePageChange(currentPage-1)}
            disabled={currentPage===1}
          >
            Prev
          </button>

          {Array.from({length:totalPages},(_,i)=>(
            <button
              key={i}
              className={
                currentPage===i+1 ? "active" : ""
              }
              onClick={()=>handlePageChange(i+1)}
            >
              {i+1}
            </button>
          ))}

          <button
            onClick={()=>handlePageChange(currentPage+1)}
            disabled={currentPage===totalPages}
          >
            Next
          </button>

        </div>

      )}

    </div>

  );

}

export default Milk;