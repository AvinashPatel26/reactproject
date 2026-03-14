import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  addToCart,
  increaseItem,
  decreaseItem,
  fetchProductsByCategory
} from "./store";

import ProductCard from "./ProductCard";
import PriceRange from "./PriceRange";
import { BACKEND_URL } from "./config/backend";

import { toast } from "react-toastify";

function CategoryPage() {

  const { category } = useParams();

  const dispatch = useDispatch();

  const products =
    useSelector((state) => state.products[category]) || [];

  const cartItems =
    useSelector((state) => state.cart) || [];

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    if (category) {
      dispatch(fetchProductsByCategory(category));
    }

  }, [dispatch, category]);

  useEffect(() => {

    setFilteredItems(products);
    setCurrentPage(1);

  }, [products]);

  const getCartItem = (id) =>
    cartItems.find((item) => item._id === id);

  const notifyAdd = (name) =>
    toast.success(`${name} added to cart`);

  const notifyIncrease = (name) =>
    toast.info(`Increased ${name}`);

  const notifyDecrease = (name) =>
    toast.info(`Decreased ${name}`);

  /* Pagination */

  const itemsPerPage = 6;

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

    <div className="category-page">

      <section className="category-header reveal">

        <h1 style={{ textTransform: "capitalize" }}>
          {category} Products
        </h1>

      </section>

      <div className="category-filter">

        <PriceRange
          products={products}
          onFilter={(items) => {
            setFilteredItems(items);
            setCurrentPage(1);
          }}
          minPrice={0}
          maxPrice={1000}
          step={10}
        />

      </div>

      <div className="category-grid">

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

          <p className="text-center">
            No products available
          </p>

        )}

      </div>

      {totalPages > 1 && (

        <div className="pagination-box">

          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (

            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>

          ))}

          <button
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

export default CategoryPage;