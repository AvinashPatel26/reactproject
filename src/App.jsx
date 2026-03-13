import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./Home";
import Navbar from "./Navbar";
import NonVeg from "./NonVeg";
import Veg from "./Veg";
import Milk from "./Milk";
import Chocolate from "./Chocolate";
import SignUp from "./SignUp";
import Cart from "./Cart";
import Orders from "./Orders";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import PageNotFound from "./PageNotFound";
import AdminAddProduct from "./AdminAddProduct";

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

/* ================= GLOBAL ANIMATION OBSERVER ================= */

function GlobalObserver() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Small timeout ensures the DOM has finished painting the new route's nodes
    const timeoutId = setTimeout(() => {
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
        { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
      );

      reveals.forEach((el) => observer.observe(el));

      return () => {
        reveals.forEach((el) => observer.unobserve(el));
      };
    }, 100);

    return () => clearTimeout(timeoutId);

  }, [pathname]);

  return null;
}

function AppLayout() {

  const cartItems = useSelector((state) => state.cart);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!token;
  const isAdmin = userRole === "admin";

  return (
    <div className="app-wrapper min-vh-100">
      <ScrollToTop />
      <GlobalObserver />
      <Navbar />

      {/* ================= FLOATING CART ================= */}

      <Link to="/cart" className="floating-cart">

        🛒

        {cartCount > 0 && (

          <span className="cart-count">

            {cartCount}

          </span>

        )}

      </Link>

      {/* ================= ROUTES ================= */}

      <div className="page-container py-4" style={{ paddingTop: "90px" }}>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chocolate" element={<Chocolate />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/signup"
            element={
              isAuthenticated
                ? <Navigate to="/home" replace />
                : <SignUp />
            }
          />

          <Route path="/orders" element={<Orders />} />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />

          <Route path="/*" element={<PageNotFound />} />

          <Route
            path="/admin/add-product"
            element={
              isAdmin
                ? <AdminAddProduct />
                : <Navigate to="/home" replace />
            }
          />

        </Routes>

      </div>

      {/* GLOBAL TOAST */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

    </div>

  );

}

function App() {

  return (

    <BrowserRouter>

      <AppLayout />

    </BrowserRouter>

  );

}

export default App;