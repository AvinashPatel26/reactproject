import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./Home";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Orders from "./Orders";
import SignUp from "./SignUp";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import PageNotFound from "./PageNotFound";
import AdminAddProduct from "./AdminAddProduct";
import CategoryPage from "./CategoryPage";

import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

/* ================= SCROLL TO TOP ================= */

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ================= REVEAL ANIMATION ================= */

function GlobalObserver() {

  const { pathname } = useLocation();

  React.useEffect(() => {

    const timeout = setTimeout(() => {

      const reveals = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );

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

    }, 100);

    return () => clearTimeout(timeout);

  }, [pathname]);

  return null;
}

/* ================= APP LAYOUT ================= */

function AppLayout() {

  const cartItems = useSelector((state) => state.cart || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  const isAuthenticated = !!token;
  const isAdmin = userRole === "admin";

  return (
    <div className="app-wrapper">

      <ScrollToTop />
      <GlobalObserver />

      <Navbar />

      {/* Floating Cart */}

      <Link to="/cart" className="floating-cart">

        🛒

        {cartCount > 0 && (
          <span className="cart-count">
            {cartCount}
          </span>
        )}

      </Link>

      <main className="page-container">

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/:category" element={<CategoryPage />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/signup"
            element={
              isAuthenticated
                ? <Navigate to="/home" replace />
                : <SignUp />
            }
          />

          <Route
            path="/orders"
            element={
              isAuthenticated
                ? <Orders />
                : <Navigate to="/signup" replace />
            }
          />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />

          <Route
            path="/admin/add-product"
            element={
              isAdmin
                ? <AdminAddProduct />
                : <Navigate to="/home" replace />
            }
          />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </main>

      {/* FOOTER */}

      <footer className="footer">
        © {new Date().getFullYear()} Foody Sensations
      </footer>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

    </div>
  );
}

/* ================= ROOT ================= */

function App() {

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );

}

export default App;