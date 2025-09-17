import React, { useState, useEffect } from "react";

function PriceFilter({ products, onFilter, className = "", labelClass = "", sliderClass = "" }) {
  // Find min and max from product list
  const prices = products.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Slider value (max price)
  const [max, setMax] = useState(maxPrice);

  // Auto-filter whenever slider changes
  useEffect(() => {
    const filtered = products.filter((p) => p.price <= max);
    onFilter(filtered);
  }, [max, products, onFilter]);

  return (
    <div className={`price-filter ${className}`}>
      <div className="slider-header">
        <span className={labelClass}>Price up to: ₹{max}</span>
      </div>

      <div className={`slider-container ${sliderClass}`}>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default PriceFilter;
