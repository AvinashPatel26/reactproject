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

import "./Veg.css";
import PriceRange from "./PriceRange";
import { BACKEND_URL } from "./config/backend";

function Veg() {

  const dispatch = useDispatch();

  const vegItems = useSelector((state) => state.products.veg);
  const cartItems = useSelector((state) => state.cart);

  const [filteredItems,setFilteredItems] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  /* FETCH FROM BACKEND */

  useEffect(()=>{
    dispatch(fetchProductsByCategory("veg"));
  },[dispatch]);

  useEffect(()=>{
    setFilteredItems(vegItems);
  },[vegItems]);

  const getCartItem = (id) => cartItems.find((item)=>item._id===id);

  const notifyAdd = (itemName)=>
    toast.success(`${itemName} added to cart!`);

  const notifyIncrease = (itemName)=>
    toast.info(`Increased ${itemName} quantity`);

  const notifyDecrease = (itemName)=>
    toast.info(`Decreased ${itemName} quantity`);

  /* PAGINATION */

  const itemsPerPage = 6;

  const totalPages = Math.ceil(filteredItems.length/itemsPerPage);

  const indexOfLastItem = currentPage*itemsPerPage;

  const indexOfFirstItem = indexOfLastItem-itemsPerPage;

  const currentItems =
    filteredItems.slice(indexOfFirstItem,indexOfLastItem);

  return (

    <div className="veg-page">

      <ToastContainer/>

      {/* HERO HEADER */}

      <section className="veg-header">

        <div className="veg-header-content">

          <h1>Fresh Vegetarian Meals 🥗</h1>

          <p>
            Healthy, delicious and freshly prepared veg meals.
          </p>

        </div>

      </section>

      {/* FILTER */}

      <div className="veg-filter-wrapper">

        <PriceRange
          products={vegItems}
          onFilter={(items)=>{
            setFilteredItems(items);
            setCurrentPage(1);
          }}
          minPrice={0}
          maxPrice={500}
          step={10}
        />

      </div>

      {/* MENU GRID */}

      <main className="veg-main">

        <div className="veg-grid">

          {currentItems.length>0 ? (

            currentItems.map((item)=>{

              const cartItem = getCartItem(item._id);

              return(

                <div className="veg-card" key={item._id}>

                  <div className="veg-img-wrapper">

                    <img
                      src={`${BACKEND_URL}${item.imageurl}`}
                      alt={item.name}
                    />

                  </div>

                  <div className="veg-card-body">

                    <h3>{item.name}</h3>

                    {item.rating && (
                      <span className="veg-rating">
                        ⭐ {item.rating}
                      </span>
                    )}

                    <p className="veg-desc">
                      {item.description}
                    </p>

                    <div className="veg-price-row">

                      <span className="veg-price">
                        ₹{item.price}
                      </span>

                      {!cartItem ? (

                        <button
                          className="veg-add-btn"
                          onClick={()=>{
                            dispatch(addToCart(item));
                            notifyAdd(item.name);
                          }}
                        >
                          Add
                        </button>

                      ):(

                        <div className="veg-qty-controls">

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
            <p className="veg-no-items">
              No vegetarian items available
            </p>
          )}

        </div>

      </main>

      {/* PAGINATION */}

      {totalPages>1 &&(

        <div className="veg-pagination">

          <button
            disabled={currentPage===1}
            onClick={()=>setCurrentPage(currentPage-1)}
          >
            Prev
          </button>

          {Array.from({length:totalPages},(_,i)=>(
            <button
              key={i}
              className={currentPage===i+1 ? "active":""}
              onClick={()=>setCurrentPage(i+1)}
            >
              {i+1}
            </button>
          ))}

          <button
            disabled={currentPage===totalPages}
            onClick={()=>setCurrentPage(currentPage+1)}
          >
            Next
          </button>

        </div>

      )}

    </div>

  );

}

export default Veg;