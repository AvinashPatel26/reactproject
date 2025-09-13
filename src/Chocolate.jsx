import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseItem, decreaseItem } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Chocolate.css";

function Chocolate() {
  const chocolateProducts = useSelector((state) => state.products.chocolate);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getCartItem = (id) => cartItems.find((i) => i.id === id);

  const notifyAdd = (name) =>
    toast.success(`${name} added to cart!`, {
      autoClose: 2000,
      theme: "colored",
      style: { backgroundColor: "#a0522d", color: "#fff", fontWeight: "bold" },
    });

  const notifyIncrease = (name) =>
    toast.info(`Increased ${name} quantity!`, {
      autoClose: 2000,
      theme: "colored",
      style: { backgroundColor: "#d2691e", color: "#fff", fontWeight: "bold" },
    });

  const notifyDecrease = (name) =>
    toast.info(`Decreased ${name} quantity!`, {
      autoClose: 2000,
      theme: "colored",
      style: { backgroundColor: "#8b4513", color: "#fff", fontWeight: "bold" },
    });

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chocolateProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(chocolateProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container-fluid choco-container">
      <ToastContainer />
      <h1 className="choco-heading text-center">
        Chocolates you love <span role="img" aria-label="chocolate">🍫🍬🍭</span>
      </h1>

      {/* <div className="choco-price-filter">
        <strong>Max Price: ₹500</strong>
        <input type="range" min="0" max="500" defaultValue="500" className="choco-price-range" />
      </div> */}

      <div className="row justify-content-center">
        {currentItems.map((item) => {
          const cartItem = getCartItem(item.id);

          return (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="choco-card shadow-sm">
                <img src={item.imageurl} alt={item.name} className="choco-img" />
                <div className="choco-overlay">
                  <h6 className="choco-name">{item.name} /- <span className="choco-price-amount">₹{item.price.toFixed(2)}</span></h6>
                  <p className="choco-desc">{item.description}</p>

                  {!cartItem ? (
                    <button
                      className="choco-btn-add"
                      onClick={() => {
                        dispatch(addToCart({ ...item, quantity: 1 }));
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
                      <span className="choco-quantity">{cartItem.quantity}</span>
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
        })}
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
              className={`btn mx-1 ${currentPage === index + 1 ? "btn-secondary" : "btn-outline-secondary"}`}
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
