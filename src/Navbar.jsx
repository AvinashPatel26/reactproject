import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {

  const cartItems = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const token = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate("/home");
  };

  return (
    <nav className="navbar-custom">
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" className="nav-logo">
          🍔 Food Sensations
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* NAV LINKS */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/home" className={location.pathname === "/home" || location.pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/veg" className={location.pathname === "/veg" ? "active" : ""} onClick={() => setMenuOpen(false)}>Veg</Link>
          <Link to="/nonveg" className={location.pathname === "/nonveg" ? "active" : ""} onClick={() => setMenuOpen(false)}>NonVeg</Link>
          <Link to="/milk" className={location.pathname === "/milk" ? "active" : ""} onClick={() => setMenuOpen(false)}>Milk</Link>
          <Link to="/chocolate" className={location.pathname === "/chocolate" ? "active" : ""} onClick={() => setMenuOpen(false)}>Chocolate</Link>
          <Link to="/cart" className={location.pathname === "/cart" ? "active cart-link" : "cart-link"} onClick={() => setMenuOpen(false)}>
            🛒 Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""} onClick={() => setMenuOpen(false)}>Orders</Link>
          <Link to="/aboutus" className={location.pathname === "/aboutus" ? "active" : ""} onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contactus" className={location.pathname === "/contactus" ? "active" : ""} onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </div>

        {/* SIGN IN / AUTH */}
        <div className="nav-auth">
          {!isAuthenticated ? (
            <Link to="/signup" className="sign-in-btn">🔑 SignUp</Link>
          ) : (
            <button onClick={handleLogout} className="sign-in-btn logout-btn">Logout ({userName})</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;