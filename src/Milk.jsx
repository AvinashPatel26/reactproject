import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, increaseItem, decreaseItem, fetchProducts } from "./store";

import { toast } from "react-toastify";

import PriceRange from "./PriceRange";
import { BACKEND_URL } from "./config/backend";
import ProductCard from "./ProductCard";

function Milk() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const cartItems = useSelector((state) => state.cart || []);

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* FETCH PRODUCTS */

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  /* FILTER MILK PRODUCTS */

  useEffect(() => {
    const milkItems = products.filter(
      (p) => p.category?.toLowerCase() === "milk",
    );

    setFilteredItems(milkItems);
    setCurrentPage(1);
  }, [products]);

  /* FIND CART ITEM */

  const getCartItem = (id) => cartItems.find((item) => item._id === id);

  /* TOASTS */

  const notifyAdd = (name) => toast.success(`${name} added to cart!`);

  const notifyIncrease = (name) => toast.info(`Increased ${name} quantity`);

  const notifyDecrease = (name) => toast.info(`Decreased ${name} quantity`);

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

  return (
    <div className="milkPage-bg">
      {/* HEADER */}

      <section className="milkPage-header reveal">
        <h1 className="milkPage-heading">🥛 Fresh Dairy Products</h1>

        <p className="milkPage-subtitle">
          Creamy and fresh dairy items for you
        </p>
      </section>

      {/* FILTER */}

      <div className="milkPage-filter">
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

      <div className="milkPage-grid">
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
          <p className="text-center">No milk items available</p>
        )}
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="milk-pagination reveal">
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

export default Milk;
