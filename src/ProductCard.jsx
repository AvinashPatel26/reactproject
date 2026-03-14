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

  const imageSrc = item.imageurl
    ? item.imageurl.startsWith("http")
      ? item.imageurl
      : `${BACKEND_URL}${item.imageurl}`
    : "/images/default.png";

  return (

    <div className="product-card">

      {/* IMAGE */}

      <div className="product-img-wrapper">

        <img
          src={imageSrc}
          alt={item.name}
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
          {item.name}
        </h6>

        {item.rating && (

          <span className="product-rating">
            ⭐ {item.rating}
          </span>

        )}

        <p className="product-desc">
          {item.description}
        </p>

        <div className="product-footer">

          <span className="product-price">
            ₹{Number(item.price).toFixed(2)}
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