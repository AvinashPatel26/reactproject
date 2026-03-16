import React from "react";

function ProductCard({
  item,
  cartItem,
  addToCart,
  increaseItem,
  decreaseItem,
  BACKEND_URL
}) {

  const imageSrc = item.imageurl
    ? `${BACKEND_URL}${item.imageurl}`
    : "/images/default.png";

  return (

    <div className="food-card">

      <div className="food-image-wrapper">

        <img src={imageSrc} alt={item.name} />

      </div>

      <div className="food-body">

        <div className="food-header">

          <h3>{item.name}</h3>

          <span className="price-tag">
            ₹{item.price}
          </span>

        </div>

        <p className="food-desc">
          {item.description}
        </p>

        <div className="food-footer">

          <span className="rating-badge">
            ⭐ {item.rating || 4.5}
          </span>

          {!cartItem ? (

            <button
              className="add-cart-btn"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>

          ) : (

            <div className="counter">

              <button onClick={() => decreaseItem(item)}>
                −
              </button>

              <span>{cartItem.quantity}</span>

              <button onClick={() => increaseItem(item)}>
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