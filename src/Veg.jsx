import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, increaseItem, decreaseItem, fetchProducts } from "./store";

import { toast } from "react-toastify";

import PriceRange from "./PriceRange";
import { BACKEND_URL } from "./config/backend";
import ProductCard from "./ProductCard";

function Veg() {
  const dispatch = useDispatch();

  const { products, status } = useSelector((state) => state.products);

  const cartItems = useSelector((state) => state.cart || []);

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* FETCH PRODUCTS */

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  /* FILTER VEG ITEMS */

  useEffect(() => {
    const vegItems = products.filter(
      (p) => p.category?.toLowerCase() === "veg",
    );

    setFilteredItems(vegItems);
    setCurrentPage(1);
  }, [products]);

  const getCartItem = (id) => cartItems.find((item) => item._id === id);

  const notifyAdd = (itemName) => toast.success(`${itemName} added to cart!`);

  const notifyIncrease = (itemName) =>
    toast.info(`Increased ${itemName} quantity`);

  const notifyDecrease = (itemName) =>
    toast.info(`Decreased ${itemName} quantity`);

  /* PAGINATION */

  const itemsPerPage = 6;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (status === "loading") {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="veg-page">
      {/* HERO HEADER */}

      <section className="veg-header reveal">
        <div className="veg-header-content">
          <h1>Fresh Vegetarian Meals 🥗</h1>

          <p>Healthy, delicious and freshly prepared veg meals.</p>
        </div>
      </section>

      {/* FILTER */}

      <div className="veg-filter-wrapper">
        <PriceRange
          products={filteredItems}
          onFilter={(items) => {
            setFilteredItems(items);
            setCurrentPage(1);
          }}
          minPrice={0}
          maxPrice={500}
          step={10}
        />
      </div>

      {/* PRODUCT GRID */}

      <main className="veg-main">
        <div className="veg-grid">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <ProductCard
                key={item._id}
                item={item}
                cartItem={getCartItem(item._id)}
                addToCart={(p) => dispatch(addToCart(p))}
                increaseItem={(p) => dispatch(increaseItem(p))}
                decreaseItem={(p) => dispatch(decreaseItem(p))}
                notifyAdd={notifyAdd}
                notifyIncrease={notifyIncrease}
                notifyDecrease={notifyDecrease}
                BACKEND_URL={BACKEND_URL}
              />
            ))
          ) : (
            <p className="veg-no-items">No vegetarian items available</p>
          )}
        </div>
      </main>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="veg-pagination reveal">
          <button
            className="veg-pagination-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`veg-pagination-btn ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="veg-pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Veg;
