import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Marquee from "./Marquee";

function Home() {
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

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <h1>Welcome to Foody Sensations 🍴</h1>
          <p>Fresh. Delicious. Delivered with Love.</p>
          <Link to="/veg" className="btn btn-primary hero-btn">
            Explore Veg Options
          </Link>
        </div>
      </section>

      {/* Marquee or Special Offers */}
      <section className="special-offer reveal">
        <Marquee />
      </section>

      {/* Categories Section */}
      <section id="categories" className="categories-section reveal">
        <h2>Categories</h2>
        <div className="categories-grid">
          {[
            { to: "/veg", img: "/images/veg.jpg", label: "Veg" },
            { to: "/nonveg", img: "/images/nonveg.jpg", label: "Non‑Veg" },
            { to: "/milk", img: "/images/milk.jpg", label: "Milk" },
            { to: "/chocolate", img: "/images/chocolate.jpg", label: "Chocolate" },
          ].map((cat, i) => (
            <Link key={i} to={cat.to} className="category-card">
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
          {/* You can extract this card into a separate component if reused */}
          {[
            {
              img: "/images/lassi.webp",
              title: "Lassi",
              rating: 4.6,
              price: 299,
              discount: "20% off",
              to: "/milk",
            },
            {
              img: "/images/pav bhaji.jpg",
              title: "Pav Bhaji",
              rating: 4.5,
              price: 349,
              discount: "25% off",
              to: "/veg",
            },
            {
              img: "/images/chicken biryani.jpeg",
              title: "Chicken Biryani",
              rating: 4.3,
              price: 279,
              discount: "15% off",
              to: "/nonveg",
            },
            {
              img: "/images/chocolate milkshake.jpeg",
              title: "Chocolate Milkshake",
              rating: 4.4,
              price: 259,
              discount: "25% off",
              to: "/chocolate",
            },
          ].map((item, idx) => (
            <Link className="card-link" key={idx} to={item.to}>
              <div className="item-card">
                <img src={item.img} alt={item.title} className="item-img" />
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

      {/* Why Choose Us Section */}
      <section className="why-us reveal">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          {[
            { icon: "🥗", title: "Fresh Ingredients", desc: "Only fresh & hygienic meals." },
            { icon: "🚀", title: "Fast Delivery", desc: "Hot food delivered quickly." },
            { icon: "💰", title: "Affordable", desc: "Best meals at the best price." },
            { icon: "🍜", title: "Variety", desc: "A wide range of cuisines." },
          ].map((w, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials reveal">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {[
            { text: "Amazing food & quick delivery! ⭐⭐⭐⭐⭐", author: "Rahul Sharma" },
            { text: "Desserts are heavenly. Loved it! ⭐⭐⭐⭐", author: "Priya Mehta" },
            { text: "Affordable & tasty meals. ⭐⭐⭐⭐⭐", author: "Arjun Patel" },
          ].map((r, i) => (
            <div className="testimonial-card" key={i}>
              <p>“{r.text}”</p>
              <h4>{r.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Subscription */}
      <section className="newsletter reveal">
        <h2>Stay Updated!</h2>
        <p>Subscribe to get our latest offers and updates.</p>
        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
          />
          <button className="newsletter-btn">Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Foody Sensations. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
