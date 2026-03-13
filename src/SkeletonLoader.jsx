import React from "react";
import "./Skeleton.css";

function SkeletonLoader() {

  return (
    <div className="skeleton-card">

      <div className="skeleton-img"></div>

      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>

    </div>
  );

}

export default SkeletonLoader;