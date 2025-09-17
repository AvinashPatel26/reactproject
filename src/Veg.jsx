import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseItem, decreaseItem } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Veg.css";
import PriceRange from "./PriceRange";

function Veg() {
  const vegItems = useSelector((state) => state.products.veg);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // ✅ Add filteredItems state
  const [filteredItems, setFilteredItems] = useState(vegItems);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Update filteredItems if vegItems change in Redux store
    setFilteredItems(vegItems);
  }, [vegItems]);

  const getCartItem = (id) => cartItems.find((item) => item.id === id);

  const notifyAdd = (itemName) =>
    toast.success(`${itemName} added to cart!`, {
      autoClose: 2000,
      theme: "colored",
      style: { backgroundColor: "#ff6f61", color: "#fff", fontWeight: "bold" },
    });

  const notifyIncrease = (itemName) =>
    toast.info(`Increased ${itemName} quantity!`, { autoClose: 2000 });

  const notifyDecrease = (itemName) =>
    toast.info(`Decreased ${itemName} quantity!`, { autoClose: 2000 });

  // Pagination
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="veg-page">
      <ToastContainer />
      <header className="veg-header">
        <h1 className="veg-title">Welcome to the Veg Page</h1>
      </header>

      {/* Pass filteredItems handler */}
      <PriceRange
        products={vegItems}
        onFilter={(items) => {
          setFilteredItems(items);
          setCurrentPage(1); // reset pagination on filter
        }}
        minPrice={0}
        maxPrice={500}
        step={10}
        className="veg-filter"
      />

      <main className="veg-main">
        <div className="container">
          <div className="veg-row">
            {currentItems.length > 0 ? (
              currentItems.map((item) => {
                const cartItem = getCartItem(item.id);
                return (
                  <div className="veg-col" key={item.id}>
                    <div className="veg-card">
                      <img
                        src={item.imageurl}
                        alt={item.name}
                        className="veg-img"
                      />
                      <div className="veg-body">
                        <h6 className="veg-name">{item.name}</h6>

                        {item.rating && (
                          <p className="veg-rating">{item.rating} ★</p>
                        )}

                        <p className="veg-desc">{item.description}</p>
                        <p className="veg-price">₹{item.price}</p>

                        <div className="veg-actions">
                          {!cartItem ? (
                            <button
                              className="veg-btn-add"
                              onClick={() => {
                                dispatch(addToCart({ ...item, quantity: 1 }));
                                notifyAdd(item.name);
                              }}
                            >
                              🛒 Add to Cart
                            </button>
                          ) : (
                            <div className="veg-quantity-controls">
                              <button
                                className="veg-btn-qty"
                                onClick={() => {
                                  dispatch(decreaseItem(item));
                                  notifyDecrease(item.name);
                                }}
                              >
                                −
                              </button>
                              <span className="veg-qty-value">
                                {cartItem.quantity}
                              </span>
                              <button
                                className="veg-btn-qty"
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
                  </div>
                );
              })
            ) : (
              <p className="veg-no-items">No vegetarian items available.</p>
            )}
          </div>
        </div>
      </main>

      {totalPages > 1 && (
        <nav className="veg-pagination">
          <button
            className="veg-pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`veg-pagination-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="veg-pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}

export default Veg;
