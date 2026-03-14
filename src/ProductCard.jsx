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

        <h6 className="product-name">
          {item.name || "Food Item"}
        </h6>

        {item.rating && (
          <span className="product-rating">
            ⭐ {item.rating}
          </span>
        )}

        <p className="product-desc">
          {item.description || "Delicious food item"}
        </p>

        <div className="product-footer">

          <span className="product-price">
            ₹{price}
          </span>

          {!cartItem ? (

            <button
              className="product-add-btn"
              aria-label={`Add ${item.name} to cart`}
              onClick={() => {
                addToCart(item);
                notifyAdd(item.name);
              }}
            >
              Add
            </button>

          ) : (

            <div className="product-counter">

              <button
                className="counter-btn"
                aria-label="Decrease quantity"
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
                aria-label="Increase quantity"
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

    </div>
  );
}

export default ProductCard;