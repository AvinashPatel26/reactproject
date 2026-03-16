import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
  Package,
  Info,
  Phone,
  ChefHat,
} from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isScrolled, setIsScrolled] = useState(false);

  // NEW: Robust states for desktop dropdowns
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const closeMobileMenu = () => setIsOpen(false);

  const desktopLinkStyle =
    "relative font-semibold text-gray-700 hover:text-orange-500 transition py-6 flex items-center gap-1";
  const underlineStyle =
    "absolute bottom-4 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:w-full";
  const mobileLinkStyle =
    "flex items-center gap-3 px-6 py-4 text-lg font-medium border-b border-gray-50 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative h-20">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl text-white shadow-lg group-hover:scale-105 transition-transform">
            <ChefHat size={28} strokeWidth={2.5} />
          </div>
          <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 tracking-tight hidden sm:block">
            Foody
          </span>
        </Link>

        {/* 🖥️ DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8 h-full">
          <NavLink to="/" className="group">
            <div className={desktopLinkStyle}>
              Home <span className={underlineStyle}></span>
            </div>
          </NavLink>

          {/* ========================================== */}
          {/* BULLETPROOF MENU DROPDOWN (React State)    */}
          {/* ========================================== */}
          <div
            className="relative h-full flex items-center cursor-pointer"
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
          >
            <div
              className={`relative font-semibold transition py-6 flex items-center gap-1 ${isMenuHovered ? "text-orange-500" : "text-gray-700"}`}
            >
              Menu{" "}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isMenuHovered ? "rotate-180" : ""}`}
              />
              <span
                className={`absolute bottom-4 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${isMenuHovered ? "w-full opacity-100" : "w-0 opacity-0"}`}
              ></span>
            </div>

            {/* Dropdown Box */}
            <div
              className={`absolute top-[75px] left-0 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 z-50 origin-top-left ${
                isMenuHovered
                  ? "opacity-100 scale-100 visible pointer-events-auto"
                  : "opacity-0 scale-95 invisible pointer-events-none"
              }`}
            >
              <div className="py-2">
                <Link
                  to="/veg"
                  className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition"
                  onClick={() => setIsMenuHovered(false)}
                >
                  🥗 Pure Veg
                </Link>
                <Link
                  to="/nonveg"
                  className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition"
                  onClick={() => setIsMenuHovered(false)}
                >
                  🍗 Non-Veg
                </Link>
                <Link
                  to="/milk"
                  className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition"
                  onClick={() => setIsMenuHovered(false)}
                >
                  🥛 Dairy & Milk
                </Link>
                <Link
                  to="/chocolate"
                  className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition"
                  onClick={() => setIsMenuHovered(false)}
                >
                  🍫 Chocolates
                </Link>
              </div>
            </div>
          </div>
          {/* ========================================== */}

          <NavLink to="/aboutus" className="group">
            <div className={desktopLinkStyle}>
              About Us <span className={underlineStyle}></span>
            </div>
          </NavLink>

          <NavLink to="/contactus" className="group">
            <div className={desktopLinkStyle}>
              Contact <span className={underlineStyle}></span>
            </div>
          </NavLink>
        </div>

        {/* 🖥️ DESKTOP AUTH */}
        <div className="hidden md:flex h-full items-center">
          {token ? (
            <div
              className="relative h-full flex items-center cursor-pointer"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <div
                className={`flex items-center gap-2 border p-2 rounded-xl transition ${isProfileHovered ? "border-gray-200 bg-gray-50" : "border-transparent"}`}
              >
                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                  <User size={20} />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">
                    Hello, {userName ? userName.split(" ")[0] : "Guest"}
                  </span>
                  <span className="text-sm font-bold flex items-center gap-1 text-gray-800">
                    Account{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isProfileHovered ? "rotate-180" : ""}`}
                    />
                  </span>
                </div>
              </div>

              <div
                className={`absolute top-[75px] right-0 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 z-50 origin-top-right ${
                  isProfileHovered
                    ? "opacity-100 scale-100 visible pointer-events-auto"
                    : "opacity-0 scale-95 invisible pointer-events-none"
                }`}
              >
                <div className="py-2">
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition border-b border-gray-50"
                  >
                    <Package size={18} /> My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50 font-medium transition text-left"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-2.5 rounded-full font-bold hover:bg-orange-500 hover:text-white transition shadow-sm hover:shadow-orange-500/30"
            >
              <User size={18} /> Login / Sign Up
            </Link>
          )}
        </div>

        {/* 📱 MOBILE HAMBURGER */}
        <button
          className="md:hidden text-gray-800 hover:text-orange-500 transition focus:outline-none bg-gray-50 p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 📱 MOBILE MENU DROPDOWN */}
      <div
        className={`md:hidden absolute top-[100%] left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "scale-y-100 opacity-100 border-t border-gray-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col py-2 max-h-[85vh] overflow-y-auto">
          <div className="px-6 py-4 bg-orange-50 mb-2 flex items-center justify-between">
            {token ? (
              <div>
                <span className="text-xs text-orange-600 font-bold uppercase tracking-wider block mb-1">
                  Welcome back
                </span>
                <span className="text-lg font-extrabold text-gray-900">
                  {userName}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                Welcome to Foody!
              </span>
            )}
          </div>

          <NavLink to="/" className={mobileLinkStyle} onClick={closeMobileMenu}>
            🏠 Home
          </NavLink>
          <NavLink
            to="/veg"
            className={mobileLinkStyle}
            onClick={closeMobileMenu}
          >
            🥗 Pure Veg
          </NavLink>
          <NavLink
            to="/nonveg"
            className={mobileLinkStyle}
            onClick={closeMobileMenu}
          >
            🍗 Non-Veg
          </NavLink>
          <NavLink
            to="/milk"
            className={mobileLinkStyle}
            onClick={closeMobileMenu}
          >
            🥛 Dairy & Milk
          </NavLink>
          <NavLink
            to="/chocolate"
            className={mobileLinkStyle}
            onClick={closeMobileMenu}
          >
            🍫 Chocolates
          </NavLink>
          <NavLink
            to="/aboutus"
            className={mobileLinkStyle}
            onClick={closeMobileMenu}
          >
            <Info size={20} /> About Us
          </NavLink>
          <NavLink
            to="/contactus"
            className={mobileLinkStyle}
            onClick={closeMobileMenu}
          >
            <Phone size={20} /> Contact Us
          </NavLink>

          <div className="p-6 mt-4 bg-gray-50 border-t border-gray-100">
            {token ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/orders"
                  className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 px-5 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-sm"
                  onClick={closeMobileMenu}
                >
                  <Package size={18} /> My Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-5 py-3 rounded-xl font-bold hover:bg-red-200 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signup"
                className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
                onClick={closeMobileMenu}
              >
                <User size={18} /> Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
