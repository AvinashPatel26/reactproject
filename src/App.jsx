import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// Component Imports
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
import Profile from "./Profile"; // 👈 Don't forget to import the Profile component!

// Styles
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function ScrollHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function Layout() {
  const cartItems = useSelector((state) => state.cart || []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");
  const isAuth = !!token;
  const isAdmin = role === "admin";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <ScrollHandler />

      <Navbar />

      {/* Floating Cart Button */}
      <Link
        to="/cart"
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:bg-orange-600 hover:scale-110 transition-transform z-50 flex items-center justify-center text-3xl"
        title="Go to Cart"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
            {cartCount}
          </span>
        )}
      </Link>

      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route
            path="/signup"
            element={isAuth ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/orders"
            element={isAuth ? <Orders /> : <Navigate to="/signup" />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route
            path="/admin/add-product"
            element={isAdmin ? <AdminAddProduct /> : <Navigate to="/" />}
          />

          {/* 👈 Profile MUST be above the dynamic /:category route! */}
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/signup" />}
          />

          <Route path="/:category" element={<CategoryPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-8 mt-auto">
        <p className="text-sm font-medium">
          Made with ❤️ & 🍕 by{" "}
          <span className="text-orange-400 font-bold">Foody Sensations</span>
        </p>
        <p className="text-xs mt-2 text-gray-500">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
