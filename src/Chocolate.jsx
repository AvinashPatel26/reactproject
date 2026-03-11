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

function Chocolate() {
  const dispatch = useDispatch();

  const chocolateProducts = useSelector((state) => state.products.chocolate);
  const cartItems = useSelector((state) => state.cart);

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* ✅ CORRECT WAY: fetch from backend using thunk */
  useEffect(() => {
    dispatch(fetchProductsByCategory("chocolate"));
  }, [dispatch]);

  /* ✅ Sync filter when data arrives */
  useEffect(() => {
    setFilteredItems(chocolateProducts);
  }, [chocolateProducts]);

  const getCartItem = (id) => cartItems.find((i) => i.id === id);

  const notifyAdd = (name) =>
    toast.success(`${name} added to cart!`, {
      autoClose: 2000,
      theme: "colored",
      style: {
        backgroundColor: "#a0522d",
        color: "#fff",
        fontWeight: "bold",
      },
    });

  const notifyIncrease = (name) =>
    toast.info(`Increased ${name} quantity!`, {
      autoClose: 2000,
    });

  const notifyDecrease = (name) =>
    toast.info(`Decreased ${name} quantity!`, {
      autoClose: 2000,
    });

  /* Pagination */
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container-fluid choco-container">
      <ToastContainer />

      <h1 className="choco-heading text-center">Chocolates you love 🍫🍬🍭</h1>

      <PriceRange
        products={chocolateProducts}
        onFilter={(items) => {
          setFilteredItems(items);
          setCurrentPage(1);
        }}
        minPrice={0}
        maxPrice={500}
        step={10}
        className="choco-price-filter mb-4"
      />

      <div className="row justify-content-center">
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            const cartItem = getCartItem(item.id);

            return (
              <div className="col-md-3 mb-4" key={item.id}>
                <div className="choco-card shadow-sm">
                  <img
                    src={`http://localhost:8080${item.imageurl}`}
                    alt={item.name}
                    className="veg-img"
                  />

                  <div className="choco-overlay">
                    <h6 className="choco-name">
                      {item.name} /-{" "}
                      <span className="choco-price-amount">₹{item.price}</span>
                    </h6>

                    <p className="choco-desc">{item.description}</p>

                    {!cartItem ? (
                      <button
                        className="choco-btn-add"
                        onClick={() => {
                          dispatch(addToCart(item));
                          notifyAdd(item.name);
                        }}
                      >
                        Add To Cart
                      </button>
                    ) : (
                      <div className="choco-counter">
                        <button
                          className="choco-btn-counter"
                          onClick={() => {
                            dispatch(decreaseItem(item));
                            notifyDecrease(item.name);
                          }}
                        >
                          −
                        </button>

                        <span className="choco-quantity">
                          {cartItem.quantity}
                        </span>

                        <button
                          className="choco-btn-counter"
                          onClick={() => {
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
        ) : (
          <p className="text-muted text-center">
            No chocolate items available.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="choco-pagination d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary mx-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`btn mx-1 ${
                currentPage === index + 1
                  ? "btn-secondary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-secondary mx-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Chocolate;
