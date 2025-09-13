import React from "react";
import "./Marquee.css";

const Marquee = () => {
  const images = [
    "public/images/almond milk.avif",
    "public/images/chicken biryani.jpeg",
    "public/images/chocolate pastry.jpeg",
    "public/images/palak paneer.jpg",
    "public/images/pav bhaji.jpg",
    "public/images/Rasgulla.jpg",
    "public/images/veg manchurian.jpeg",
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