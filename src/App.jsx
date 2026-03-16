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

// Styles
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

/* ---------- Scroll To Top ---------- */
function ScrollHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

/* ---------- Layout ---------- */
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollHandler />

      {/* 🧭 Navbar */}
      <Navbar />

      {/* 🛒 Floating Cart Button */}
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

      {/* 🖥️ Main Content Area */}
      <main className="flex-grow">
        <Routes>
          {/* 🏠 Default Route (Home Page) */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />

          {/* 🔐 Auth & User Routes */}
          <Route path="/signup" element={isAuth ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/orders" element={isAuth ? <Orders /> : <Navigate to="/signup" />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* ℹ️ Info Routes */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />

          {/* 🛡️ Admin Route */}
          <Route
            path="/admin/add-product"
            element={isAdmin ? <AdminAddProduct /> : <Navigate to="/" />}
          />

          {/* 🍔 Dynamic Category Pages (Catches /veg, /nonveg, /milk, /chocolate) */}
          {/* Put this AFTER static routes so it doesn't accidentally catch them */}
          <Route path="/:category" element={<CategoryPage />} />

          {/* ❌ 404 Fallback */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      {/* 🦶 Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
        <p className="text-sm">
          Made with ❤️ & 🍕 by <span className="text-orange-400 font-semibold">Foody Sensations</span>
        </p>
        <p className="text-xs mt-2 text-gray-500">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>

      {/* 🍞 Toast Notifications */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
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