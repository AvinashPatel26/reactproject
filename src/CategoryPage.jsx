import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  addToCart,
  increaseItem,
  decreaseItem,
  fetchProducts
} from "./store";

import ProductCard from "./ProductCard";
import { BACKEND_URL } from "./config/backend";

function CategoryPage() {

  const { category } = useParams();

  const dispatch = useDispatch();

  const { products, status } = useSelector(
    (state) => state.products
  );

  const cartItems = useSelector(
    (state) => state.cart || []
  );

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(4);

  /* FETCH PRODUCTS */

  useEffect(() => {

    if (status === "idle") {
      dispatch(fetchProducts());
    }

  }, [dispatch, status]);

  /* FILTER CATEGORY */

  useEffect(() => {

    const items = products.filter(
      (p) => p.category?.toLowerCase() === category?.toLowerCase()
    );

    setFilteredItems(items);

  }, [products, category]);

  const getCartItem = (id) =>
    cartItems.find((item) => item._id === id);

  /* PAGINATION */

  const totalPages =
    Math.ceil(filteredItems.length / itemsPerPage);

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentItems =
    filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {

    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }

  };

  return (

    <div className="category-container">

      <h1 className="category-title">
        {category} Products
      </h1>

      {/* CONTROLS */}

      <div className="page-controls">

        <input
          className="search-box"
          placeholder="Search Dishes..."
        />

        <select
          className="page-size-select"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={4}>Show 4</option>
          <option value={5}>Show 5</option>
          <option value={6}>Show 6</option>
          <option value={7}>Show 7</option>
          <option value={8}>Show 8</option>
        </select>

      </div>

      {/* GRID */}

      <div className="product-grid">

        {currentItems.map((item) => (

          <ProductCard
            key={item._id}
            item={item}
            cartItem={getCartItem(item._id)}
            addToCart={(p) => dispatch(addToCart(p))}
            increaseItem={(p) => dispatch(increaseItem(p))}
            decreaseItem={(p) => dispatch(decreaseItem(p))}
            BACKEND_URL={BACKEND_URL}
          />

        ))}

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              handlePageChange(currentPage - 1)
            }
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (

            <button
              key={i}
              className={
                currentPage === i + 1
                  ? "active-page"
                  : ""
              }
              onClick={() =>
                handlePageChange(i + 1)
              }
            >
              {i + 1}
            </button>

          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              handlePageChange(currentPage + 1)
            }
          >
            Next
          </button>

        </div>

      )}

    </div>

  );

}

export default CategoryPage;