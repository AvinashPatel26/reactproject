import React, { useState, useEffect } from "react";
import "./PriceRange.css";

function PriceRange({
  products = [],
  onFilter,
  minPrice = 0,
  maxPrice = 1000,
  step = 10,
  className = ""
}) {

  const [price, setPrice] = useState(maxPrice);

  // Reset slider when products update
  useEffect(() => {
    setPrice(maxPrice);
  }, [maxPrice, products]);

  const handleChange = (e) => {

    const value = Number(e.target.value);

    setPrice(value);

    const filtered = products.filter(
      (item) => item.price <= value
    );

    onFilter(filtered);

  };

  return (
    <div className={`price-range-container ${className}`}>

      <div className="price-range-header">

        <span>₹{minPrice}</span>

        <span className="price-range-label">
          Max Price: <strong>₹{price}</strong>
        </span>

        <span>₹{maxPrice}</span>

      </div>

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