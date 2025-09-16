import React from "react";
import "./Marquee.css";

const Marquee = () => {
  const images = [
    "public/images/almondmilk.avif",
    "public/images/chickenbiryani.jpeg",
    "public/images/chocolatepastry.jpeg",
    "public/images/palakpaneer.jpg",
    "public/images/pavbhaji.jpg",
    "public/images/Rasgulla.jpg",
    "public/images/vegmanchurian.jpeg",
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