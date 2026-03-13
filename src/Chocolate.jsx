import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseItem,
  decreaseItem,
  fetchProductsByCategory,
} from "./store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Chocolate.css";
import PriceRange from "./PriceRange";
import { BACKEND_URL } from "./config/backend";

function Chocolate() {

  const dispatch = useDispatch();

  const chocolateProducts = useSelector(
    (state) => state.products.chocolate
  );

  const cartItems = useSelector((state) => state.cart);

  const [filteredItems,setFilteredItems] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  /* FETCH PRODUCTS */

  useEffect(()=>{
    dispatch(fetchProductsByCategory("chocolate"));
  },[dispatch]);

  useEffect(()=>{
    setFilteredItems(chocolateProducts);
  },[chocolateProducts]);

  const getCartItem = (id)=>
    cartItems.find((i)=>i._id===id);

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

    <div className="choco-page">

      <ToastContainer/>

      {/* HEADER */}
      <section className="choco-header reveal">
        <h1>Delicious Chocolates 🍫</h1>
        <p>Sweet treats crafted with love</p>
      </section>

      {/* FILTER */}

      <div className="choco-filter">

        <PriceRange
          products={chocolateProducts}
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

      <div className="choco-grid">

        {currentItems.length>0 ? (

          currentItems.map((item)=>{

            const cartItem = getCartItem(item._id);

            return(
              <div
                className={`choco-card reveal-scale delay-${(item._id.charCodeAt(0) % 5) * 100}`}
                key={item._id}
              >

                <img
                  src={`${BACKEND_URL}${item.imageurl}`}
                  alt={item.name}
                  className="choco-img"
                />

                <div className="choco-body">

                  <h3>{item.name}</h3>

                  {item.rating && (
                    <span className="choco-rating">
                      ⭐ {item.rating}
                    </span>
                  )}

                  <p className="choco-desc">
                    {item.description}
                  </p>

                  <div className="choco-footer">

                    <span className="choco-price">
                      ₹{item.price}
                    </span>

                    {!cartItem ? (

                      <button
                        className="choco-add-btn"
                        onClick={()=>{
                          dispatch(addToCart(item));
                          notifyAdd(item.name);
                        }}
                      >
                        Add
                      </button>

                    ):(

                      <div className="choco-counter">

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
            No chocolate items available
          </p>
        )}

      </div>

      {/* PAGINATION */}

      {totalPages>1 &&(

        <div className="choco-pagination">

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

export default Chocolate;