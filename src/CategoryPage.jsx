import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { addToCart, increaseItem, decreaseItem, fetchProducts } from "./store";
import ProductCard from "./ProductCard";
import { BACKEND_URL } from "./config/backend";

function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { products, status } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart || []);

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Defaulted to 8 for a better grid look

  /* FETCH PRODUCTS */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  /* FILTER PRODUCTS */
  useEffect(() => {
    const items = products
      .filter((p) => p.category?.toLowerCase() === category?.toLowerCase())
      .filter((p) => p.name?.toLowerCase().includes(searchText.toLowerCase()));

    setFilteredItems(items);
    setCurrentPage(1);
  }, [products, category, searchText]);

  const getCartItem = (id) => cartItems.find((item) => item._id === id);

  /* TOAST */
  const notifyAdd = (name) => toast.success(`${name} added to cart`);
  const notifyIncrease = (name) => toast.info(`Increased ${name}`);
  const notifyDecrease = (name) => toast.info(`Decreased ${name}`);

  /* PAGINATION */
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* PAGE TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent pb-2">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : ""}{" "}
          Delights
        </h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* CONTROLS (Search & Pagination Select) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search Dishes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-gray-600 font-medium whitespace-nowrap">
            Show:
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto bg-gray-50 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer transition-all"
          >
            <option value={4}>4 items</option>
            <option value={8}>8 items</option>
            <option value={12}>12 items</option>
            <option value={16}>16 items</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS GRID (Fix for uneven cards!) */}
      {currentItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400 font-semibold mb-2">
            🍽️ No items found
          </p>
          <p className="text-gray-500">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {currentItems.map((item) => (
            // Removed fixed width so CSS Grid can handle the sizing
            <div key={item._id}>
              <ProductCard
                item={item}
                cartItem={getCartItem(item._id)}
                addToCart={(p) => {
                  dispatch(addToCart(p));
                  notifyAdd(p.name);
                }}
                increaseItem={(p) => {
                  dispatch(increaseItem(p));
                  notifyIncrease(p.name);
                }}
                decreaseItem={(p) => {
                  dispatch(decreaseItem(p));
                  notifyDecrease(p.name);
                }}
                BACKEND_URL={BACKEND_URL}
              />
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION BUTTONS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-14">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            ← Prev
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all shadow-sm ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white shadow-orange-500/30"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
