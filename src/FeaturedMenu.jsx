import React from "react";

function FoodCard({ item, onAdd }) {
  return (
    <div className="food-card">

      <div className="food-img-wrapper">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="food-content">

        <h3>{item.name}</h3>

        <div className="food-meta">
          <span className="rating">⭐ {item.rating || 4.5}</span>
          <span className="price">₹{item.price}</span>
        </div>

        <button
          className="food-add-btn"
          onClick={() => onAdd(item)}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default FoodCard;