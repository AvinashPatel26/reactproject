// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Marquee from "./Marquee";

function Home() {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      img: "/images/lassi.webp",
      title: "Lassi",
      rating: 4.6,
      price: 299,
      discount: "20% off",
      to: "/milk",
      type: "milk",
    },
    {
      img: "/images/pavbhaji.jpg",
      title: "Pav Bhaji",
      rating: 4.5,
      price: 349,
      discount: "25% off",
      to: "/veg",
      type: "veg",
    },
    {
      img: "/images/chickenbiryani.jpeg",
      title: "Chicken Biryani",
      rating: 4.3,
      price: 279,
      discount: "15% off",
      to: "/nonveg",
      type: "nonveg",
    },
    {
      img: "/images/chocolatemilkshake.jpeg",
      title: "Chocolate Milkshake",
      rating: 4.4,
      price: 259,
      discount: "25% off",
      to: "/chocolate",
      type: "chocolate",
    },
  ];

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.type === filter);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/images/h.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <h1>Welcome to Foody Sensations 🍴</h1>
          <p>Fresh. Delicious. Delivered with Love.</p>
          <Link to="/veg" className="btn btn-primary hero-btn">
            Explore Veg Options
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <section className="special-offer reveal" aria-label="Special offers">
        <Marquee />
      </section>

      {/* Categories */}
      <section id="categories" className="categories-section reveal">
        <h2>Categories</h2>
        <div className="categories-grid">
          {[
            { to: "/veg", img: "/images/vegg.jpg", label: "Veg" },
            { to: "/nonveg", img: "/images/nonveg.jpg", label: "Non-Veg" },
            { to: "/milk", img: "/images/dairyproducts.jpeg", label: "Milk" },
            {
              to: "/chocolate",
              img: "/images/chocolatep.jpeg",
              label: "Chocolate",
            },
          ].map((cat, i) => (
            <Link
              key={i}
              to={cat.to}
              className="category-card reveal"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <img src={cat.img} alt={cat.label} />
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured-items reveal">
        <h2>Featured Items</h2>
        <div className="items-grid">
          {filteredItems.map((item, idx) => (
            <Link
              className="card-link reveal"
              key={idx}
              to={item.to}
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <div className="item-card">
                <img
                  src={item.img}
                  alt={item.title}
                  className="item-img"
                  loading="lazy"
                />
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <div className="item-meta">
                    <span className="rating">{item.rating} ★</span>
                    <span className="discounted">
                      <s>₹{item.price}</s>{" "}
                      <strong className="discount">{item.discount}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="why-us reveal">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          {[
            {
              icon: "🥗",
              title: "Fresh Ingredients",
              desc: "Only fresh & hygienic meals.",
            },
            {
              icon: "🚀",
              title: "Fast Delivery",
              desc: "Hot food delivered quickly.",
            },
            {
              icon: "💰",
              title: "Affordable",
              desc: "Best meals at the best price.",
            },
            {
              icon: "🍜",
              title: "Variety",
              desc: "A wide range of cuisines.",
            },
          ].map((w, i) => (
            <div
              className="why-card reveal"
              key={i}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews reveal">
        <h2>Customer Reviews</h2>
        <div
          id="reviewsCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {[
              {
                text: "“Amazing food & quick delivery! ⭐⭐⭐⭐⭐”",
                name: "Rahul Sharma",
              },
              {
                text: "“Desserts are heavenly. Loved it! ⭐⭐⭐⭐”",
                name: "Priya Mehta",
              },
              {
                text: "“Affordable & tasty meals. ⭐⭐⭐⭐⭐”",
                name: "Arjun Patel",
              },
            ].map((review, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="card mx-auto" style={{ maxWidth: "600px" }}>
                  <div className="card-body">
                    <p className="card-text">{review.text}</p>
                    <h5 className="card-title">{review.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#reviewsCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#reviewsCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter reveal">
        <h2>Stay Updated!</h2>
        <p>Subscribe to get our latest offers and updates.</p>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
            required
          />
          <button className="newsletter-btn" type="submit">
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/veg">Veg</Link></li>
              <li><Link to="/nonveg">Non-Veg</Link></li>
              <li><Link to="/milk">Milk</Link></li>
              <li><Link to="/chocolate">Chocolate</Link></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
        <p className="footer-bottom">
          &copy; {new Date().getFullYear()} Foody Sensations. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
