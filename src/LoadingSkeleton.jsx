import React from "react";

function LoadingSkeleton({ count = 8 }) {

  return (

    <div
      className="row"
      aria-busy="true"
      aria-live="polite"
    >

      {Array.from({ length: count }).map((_, index) => (

        <div
          className="col-md-3 mb-4"
          key={`skeleton-${index}`}
        >

          <div className="skeleton-card">

            <div className="skeleton-img"></div>

            <div className="skeleton-text"></div>

            <div className="skeleton-text small"></div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default LoadingSkeleton;