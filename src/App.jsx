import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation
} from "react-router-dom";

import { useSelector } from "react-redux";

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

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

/* ---------- Scroll To Top ---------- */

function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ---------- App Layout ---------- */

function Layout() {

  const cartItems = useSelector((state) => state.cart || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  const isAuth = !!token;
  const isAdmin = role === "admin";

  return (
    <div className="app-wrapper">

      <ScrollHandler />

      <Navbar />

      {/* Floating Cart */}

      <Link to="/cart" className="floating-cart">
        🛒
        {cartCount > 0 && (
          <span className="cart-count">{cartCount}</span>
        )}
      </Link>

      <main className="page-container">

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />

          {/* Dynamic Category */}
          <Route path="/:category" element={<CategoryPage />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/signup"
            element={
              isAuth ? <Navigate to="/" /> : <SignUp />
            }
          />

          <Route
            path="/orders"
            element={
              isAuth ? <Orders /> : <Navigate to="/signup" />
            }
          />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />

          <Route
            path="/admin/add-product"
            element={
              isAdmin
                ? <AdminAddProduct />
                : <Navigate to="/" />
            }
          />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </main>

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

/* ---------- Root ---------- */

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}