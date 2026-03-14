import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseItem,
  decreaseItem,
  fetchProducts,
} from "./store";

import ProductCard from "./ProductCard";
import { BACKEND_URL } from "./config/backend";

function CategoryPage() {

  const { category } = useParams();

  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.products
  );

  const cartItems = useSelector(
    (state) => state.cart || []
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase() === category?.toLowerCase()
  );

  const getCartItem = (id) =>
    cartItems.find((item) => item._id === id);

  return (

    <div className="veg-grid">

      {categoryProducts.length > 0 ? (

        categoryProducts.map((item) => (

          <ProductCard
            key={item._id}
            item={item}
            cartItem={getCartItem(item._id)}
            addToCart={(p) => dispatch(addToCart(p))}
            increaseItem={(p) => dispatch(increaseItem(p))}
            decreaseItem={(p) => dispatch(decreaseItem(p))}
            BACKEND_URL={BACKEND_URL}
          />

        ))

      ) : (

        <p style={{ textAlign: "center" }}>
          No items available
        </p>

      )}

    </div>

  );

}

export default CategoryPage;