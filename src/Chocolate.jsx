import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseItem,
  decreaseItem,
  fetchProducts,
} from "./store";

import { toast } from "react-toastify";

import "./Chocolate.css";
import PriceRange from "./PriceRange";
import { BACKEND_URL } from "./config/backend";
import ProductCard from "./ProductCard";

function Chocolate() {

  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.products
  );

  const cartItems = useSelector((state) => state.cart || []);

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* FETCH PRODUCTS */

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  /* FILTER CHOCOLATE PRODUCTS */

  useEffect(() => {

    const chocolateProducts = products.filter(
      (p) => p.category?.toLowerCase() === "chocolate"
    );

    setFilteredItems(chocolateProducts);
    setCurrentPage(1);

  }, [products]);

  /* FIND CART ITEM */

  const getCartItem = (id) =>
    cartItems.find((i) => i._id === id);

  /* TOASTS */

  const notifyAdd = (name) =>
    toast.success(`${name} added to cart!`);

  const notifyIncrease = (name) =>
    toast.info(`Increased ${name} quantity`);

  const notifyDecrease = (name) =>
    toast.info(`Decreased ${name} quantity`);

  /* PAGINATION */

  const itemsPerPage = 6;

  const totalPages =
    Math.ceil(filteredItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;

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

    <div className="choco-page">

      {/* HEADER */}

      <section className="choco-header reveal">
        <h1>Delicious Chocolates 🍫</h1>
        <p>Sweet treats crafted with love</p>
      </section>

      {/* FILTER */}

      <div className="choco-filter">

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

      <div className="choco-grid">

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
            No chocolate items available
          </p>

        )}

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="choco-pagination reveal">

          <button
            className="veg-pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
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