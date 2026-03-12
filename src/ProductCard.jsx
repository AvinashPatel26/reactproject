import React from "react";

function ProductCard({
  item,
  cartItem,
  addToCart,
  increaseItem,
  decreaseItem,
  notifyAdd,
  notifyIncrease,
  notifyDecrease,
  BACKEND_URL,
}) {
  return (
    <div className="product-card">

      <img
        src={`${BACKEND_URL}${item.imageurl}`}
        alt={item.name}
        className="product-img"
      />

      <div className="product-body">

        <h6 className="product-name">{item.name}</h6>

        {item.rating && (
          <p className="product-rating">{item.rating} ★</p>
        )}

        <p className="product-desc">{item.description}</p>

        <p className="product-price">
          ₹{item.price}
        </p>

        {!cartItem ? (
          <button
            className="product-add-btn"
            onClick={() => {
              addToCart(item);
              notifyAdd(item.name);
            }}
          >
            🛒 Add to Cart
          </button>
        ) : (
          <div className="product-counter">

            <button
              className="counter-btn"
              onClick={() => {
                decreaseItem(item);
                notifyDecrease(item.name);
              }}
            >
              −
            </button>

            <span className="counter-value">
              {cartItem.quantity}
            </span>

            <button
              className="counter-btn"
              onClick={() => {
                increaseItem(item);
                notifyIncrease(item.name);
              }}
            >
              +
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default ProductCard;