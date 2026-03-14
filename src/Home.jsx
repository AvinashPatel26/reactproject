import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Marquee from "./Marquee";
import api from "./api/axios";
import { BACKEND_URL } from "./config/backend";
import { toast } from "react-toastify";

function Home() {

  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* WAKE BACKEND (Render cold start fix) */

  useEffect(() => {

    const wakeServer = async () => {
      try {
        await api.get("/health");
        console.log("Backend awake");
      } catch {
        console.log("Waking backend...");
      }
    };

    wakeServer();

  }, []);

  /* FETCH FEATURED PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await api.get("/products");

        const featuredProducts =
          Array.isArray(res.data)
            ? res.data.slice(0, 8)
            : [];

        const mappedItems = featuredProducts.map((p) => ({

          id: p._id,

          img: p.imageurl
            ? `${BACKEND_URL}${p.imageurl}`
            : "/images/default.png",

          title: p.name,

          rating: p.rating || 4.5,

          price: p.price,

          discount:
            p.discount
              ? `${p.discount}% OFF`
              : "20% OFF",

          to: `/${p.category}`,

          type: p.category

        }));

        setItems(mappedItems);

      } catch (err) {

        console.error("Home products error:", err);

        setError("Failed to load featured items.");

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) =>
          item.type.toLowerCase().includes(filter)
        );

  /* SCROLL REVEAL ANIMATION */

  useEffect(() => {

    const reveals =
      document.querySelectorAll(".reveal");

    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("active");

            }

          });

        },

        { threshold: 0.1 }

      );

    reveals.forEach((el) =>
      observer.observe(el)
    );

    return () => observer.disconnect();

  }, [filteredItems]);

  /* NEWSLETTER */

  const handleNewsletter = (e) => {

    e.preventDefault();

    toast.success("Subscribed successfully! 🎉");

  };

  return (

    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero-section">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >

          <source
            src="/images/h.mp4"
            type="video/mp4"
          />

        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <h1>Welcome to Foody Sensations 🍴</h1>

          <p>
            Fresh. Delicious. Delivered with Love.
          </p>

          <div className="hero-gallery">

            {[
              { img: "/images/vegg.jpg", link: "/veg" },
              { img: "/images/nonveg.jpg", link: "/nonveg" },
              { img: "/images/dairyproducts.jpeg", link: "/milk" },
              { img: "/images/chocolatep.jpeg", link: "/chocolate" },
            ].map((item, idx) => (

              <Link
                key={item.img}
                to={item.link}
                className="hero-gallery-item"
              >

                <img
                  src={item.img}
                  alt="Gallery"
                  loading="lazy"
                />

              </Link>

            ))}

          </div>

          <Link
            to="/veg"
            className="btn btn-primary hero-btn"
          >
            Explore Veg Options
          </Link>

        </div>

      </section>

      {/* SPECIAL OFFER */}

      <section className="special-offer reveal">

        <Marquee />

      </section>

      {/* FEATURED PRODUCTS */}

      <section className="featured-items reveal">

        <h2>Featured Items</h2>

        <div
          className="filter-buttons"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >

          {["all", "veg", "non-veg"].map((cat) => (

            <button
              key={cat}
              className={`btn ${
                filter === cat
                  ? "btn-primary"
                  : "btn-outline"
              }`}
              onClick={() => setFilter(cat)}
              style={{ textTransform: "capitalize" }}
            >

              {cat}

            </button>

          ))}

        </div>

        {loading && (
          <p className="text-center">
            Loading featured items...
          </p>
        )}

        {error && (
          <p className="text-center text-danger">
            {error}
          </p>
        )}

        <div className="items-grid">

          {!loading &&
            filteredItems.map((item) => (

              <Link
                className="card-link reveal"
                key={item.id}
                to={item.to}
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

                      <span className="rating">
                        {item.rating} ★
                      </span>

                      <span className="discounted">

                        ₹{item.price}

                        <strong className="discount">
                          {" "}
                          {item.discount}
                        </strong>

                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            ))}

        </div>

      </section>

    </div>

  );

}

export default Home;