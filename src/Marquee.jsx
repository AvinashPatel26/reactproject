import React from "react";
import "./Marquee.css";

const Marquee = () => {
  const images = [
    "/images/almondmilk.avif",
    "/images/chickenbiryani.jpeg",
    "/images/chocolatepastry.jpeg",
    "/images/palakpaneer.jpg",
    "/images/pavbhaji.jpg",
    "/images/Rasgulla.jpg",
    "/images/vegmanchurian.jpeg",
  ];

  return (
    <div className="marquee">
      <div className="marquee-content">
        {images.concat(images).map((src, index) => (
          <img key={index} src={src} alt={`slide-${index}`} className="marquee-img" />
        ))}
      </div>
    </div>
  );
};

export default Marquee;