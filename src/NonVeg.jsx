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

import "./NonVeg.css";
import { useState, useEffect } from "react";
import PriceRange from "./PriceRange";
import { BACKEND_URL } from "./config/backend";

function NonVeg() {

  const dispatch = useDispatch();

  const nonVegMenu = useSelector((state) => state.products.nonVeg);
  const cartItems = useSelector((state) => state.cart);

  const [filteredItems,setFilteredItems] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  /* FETCH PRODUCTS */

  useEffect(()=>{
    dispatch(fetchProductsByCategory("nonVeg"));
  },[dispatch]);

  useEffect(()=>{
    setFilteredItems(nonVegMenu);
  },[nonVegMenu]);

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

    <div className="nonvegPage-bg">

      <ToastContainer/>

      {/* HEADER */}

      <section className="nonvegPage-header">

        <h1 className="nonvegPage-heading">
          🍖 Delicious Non-Veg Items
        </h1>

        <p className="nonvegPage-subtitle">
          Savor the flavors from our meat selection
        </p>

      </section>

      {/* PRICE FILTER */}

      <div className="nonvegPage-filter">

        <PriceRange
          products={nonVegMenu}
          onFilter={(items)=>{
            setFilteredItems(items);
            setCurrentPage(1);
          }}
          minPrice={0}
          maxPrice={1000}
          step={10}
        />

      </div>

      {/* PRODUCT GRID */}

      <div className="nonvegPage-grid">

        {currentItems.length>0 ? (

          currentItems.map((item)=>{

            const cartItem = getCartItem(item._id);

            return(

              <div
                className="nonvegPage-card"
                key={item._id}
              >

                <img
                  src={`${BACKEND_URL}${item.imageurl}`}
                  alt={item.name}
                  className="nonveg-img"
                />

                <div className="nonvegPage-body">

                  <h3 className="nonvegPage-name">
                    {item.name}
                  </h3>

                  {item.rating && (
                    <span className="nonvegPage-rating">
                      ⭐ {item.rating}
                    </span>
                  )}

                  <p className="nonvegPage-desc">
                    {item.description}
                  </p>

                  <div className="nonvegPage-footer">

                    <span className="nonvegPage-price-amount">
                      ₹{item.price}
                    </span>

                    {!cartItem ? (

                      <button
                        className="nonvegPage-btn-add"
                        onClick={()=>{
                          dispatch(addToCart(item));
                          notifyAdd(item.name);
                        }}
                      >
                        Add
                      </button>

                    ):(

                      <div className="nonvegPage-counter">

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
            No non-veg items available
          </p>
        )}

      </div>

      {/* PAGINATION */}

      {totalPages>1 &&(

        <div className="nonvegPage-pagination">

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

export default NonVeg;