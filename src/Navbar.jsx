import React from "react";
import { Link, useLocation } from "react-router-dom"; // ADDED useLocation
import { useSelector } from "react-redux";
import { useState } from "react"; // ADDED
import "./Navbar.css";

function Navbar() {

  const cartItems = useSelector((state)=>state.cart);
  const location = useLocation(); // ADDED
  const [menuOpen,setMenuOpen] = useState(false); // ADDED

  const totalItems = cartItems.reduce(
    (sum,item)=>sum+item.quantity,
    0
  );

  return (
    <nav className="navbar-custom">

      {/* LOGO */}

      <div className="nav-logo">
        FoodSensations 🍴
      </div>

      {/* MOBILE MENU BUTTON */}

      <button
        className="menu-toggle"
        onClick={()=>setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* NAV LINKS */}

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>

        <Link
          to="/veg"
          className={location.pathname==="/veg" ? "active" : ""}
        >
          Veg
        </Link>

        <Link
          to="/nonveg"
          className={location.pathname==="/nonveg" ? "active" : ""}
        >
          NonVeg
        </Link>

        <Link
          to="/milk"
          className={location.pathname==="/milk" ? "active" : ""}
        >
          Milk
        </Link>

        <Link
          to="/chocolate"
          className={location.pathname==="/chocolate" ? "active" : ""}
        >
          Chocolate
        </Link>

      </div>

      {/* CART */}

      <Link to="/cart" className="cart-link">

        🛒 Cart

        {totalItems>0 && (
          <span className="cart-badge">
            {totalItems}
          </span>
        )}

      </Link>

    </nav>
  );
}

export default Navbar;