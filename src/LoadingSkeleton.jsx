import React from "react";
function LoadingSkeleton() {
  return (
    <div className="row">

      {Array.from({ length: 8 }).map((_, index) => (
        <div className="col-md-3 mb-4" key={index}>

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