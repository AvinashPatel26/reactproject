// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Marquee from "./Marquee";
import axios from "./api/axios";
import { BACKEND_URL } from "../config/backend"; // ✅ added

function Home() {
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([]);

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
      { threshold: 0.1 },
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Fetch featured products
  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        const featuredProducts = res.data.slice(0, 8);

        const mappedItems = featuredProducts.map((p) => ({
          img: p.imageurl
            ? `${BACKEND_URL}${p.imageurl}` // ✅ FIXED
            : "/images/default.png",
          title: p.name,
          rating: p.rating || 4.5,
          price: p.price,
          discount: p.discount || "20% off",
          to: `/${p.category}`,
          type: p.category,
        }));

        setItems(mappedItems);
      })
      .catch((err) => console.error("Home products error:", err));
  }, []);

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
              style={{ transitionDelay: `${i * 120}ms` }}
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
              style={{ transitionDelay: `${idx * 120}ms` }}
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
            { icon: "🍜", title: "Variety", desc: "A wide range of cuisines." },
          ].map((w, i) => (
            <div
              className="why-card reveal"
              key={i}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
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
        <p className="footer-bottom">
          &copy; {new Date().getFullYear()} Foody Sensations. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
