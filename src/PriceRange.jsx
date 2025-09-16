import React, { useState } from "react";
import "./PriceRange.css"; // optional, for styling

function PriceRange({ products, onFilter, minPrice = 0, maxPrice = 1000, step = 10, className = "" }) {
  const [price, setPrice] = useState(maxPrice);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setPrice(value);

    // filter products and pass back
    const filtered = products.filter((item) => item.price <= value);
    onFilter(filtered);
  };

  return (
    <div className={`price-range-container ${className}`}>
      <label className="price-range-label">
        Max Price: <strong>₹{price}</strong>
      </label>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        step={step}
        value={price}
        onChange={handleChange}
        className="price-range-slider"
      />
    </div>
  );
}

export default PriceRange;
