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

  /* SAFE IMAGE URL */

  const imagePath = item.imageurl || item.image || "";

  const imageSrc =
    imagePath && imagePath.startsWith("http")
      ? imagePath
      : imagePath
      ? `${BACKEND_URL}${imagePath}`
      : "/images/default.png";

  const price = item.price ? Number(item.price).toFixed(2) : "0.00";

  return (
    <div className="product-card">

      {/* IMAGE */}

      <div className="product-img-wrapper">
        <img
          src={imageSrc}
          alt={item.name || "Food item"}
          className="product-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/images/default.png";
          }}
        />
      </div>

      {/* BODY */}

      <div className="product-body">

        <div className="product-header">
          <h3 className="product-title">
            {item.name || "Food Item"}
          </h3>
          <span className="product-price-pill">
            ₹{price}
          </span>
        </div>

        <p className="product-desc">
          {item.description || "Delicious food item"}
        </p>

        <div className="product-footer-row">

          <span className="product-rating-pill">
            {item.rating || "4.5"} ★
          </span>

          {!cartItem ? (

            <button
              className="product-add-btn-outline"
              aria-label={`Add ${item.name} to cart`}
              onClick={(e) => {
                e.preventDefault();
                addToCart(item);
                notifyAdd(item.name);
              }}
            >
              🛒 Add to Cart
            </button>

          ) : (

            <div className="product-counter-pill">

              <button
                className="counter-btn-outline"
                aria-label="Decrease quantity"
                onClick={(e) => {
                  e.preventDefault();
                  decreaseItem(item);
                  notifyDecrease(item.name);
                }}
              >
                −
              </button>

              <span className="counter-value-outline">
                {cartItem.quantity}
              </span>

              <button
                className="counter-btn-outline"
                aria-label="Increase quantity"
                onClick={(e) => {
                  e.preventDefault();
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

    </div>
  );
}

export default ProductCard;