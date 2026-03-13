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

      {/* IMAGE */}

      <div className="product-img-wrapper">

        <img
          src={`${BACKEND_URL}${item.imageurl}`}
          alt={item.name}
          className="product-img"
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
            ₹{item.price}
          </span>


          {!cartItem ? (

            <button
              className="product-add-btn"
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

    </div>

  );

}

export default ProductCard;