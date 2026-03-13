import React, { useState, useEffect } from "react";

function PriceFilter({
  products = [],
  onFilter,
  className = "",
  labelClass = "",
  sliderClass = "",
}) {

  // Safe price extraction
  const prices = products.map((p) => p.price || 0);

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const [max, setMax] = useState(maxPrice);

  // Reset slider when products change
  useEffect(() => {
    setMax(maxPrice);
  }, [maxPrice]);

  // Filter whenever slider changes
  useEffect(() => {
    const filtered = products.filter((p) => p.price <= max);
    onFilter(filtered);
  }, [max, products, onFilter]);

  return (
    <div className={`price-filter ${className}`}>

      <div className="slider-header d-flex justify-content-between">

        <span className={labelClass}>
          ₹{minPrice}
        </span>

        <span className={labelClass}>
          Up to ₹{max}
        </span>

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