import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, User, ChevronDown, LogOut, Package, Info, Phone } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Read auth state from localStorage
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("accessToken");

  // Add a shadow and blur effect when the user scrolls down
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // Force refresh to clear state globally
  };

  const closeMenu = () => setIsOpen(false);

  // Desktop link styling
  const desktopLinkStyle = "relative font-semibold text-gray-700 hover:text-orange-500 transition py-2 group flex items-center gap-1";
  const underlineStyle = "absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full";

  // Mobile link styling
  const mobileLinkStyle = "flex items-center gap-3 px-6 py-4 text-lg font-medium border-b border-gray-50 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition";

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 tracking-tight">
          Foody Sensations
        </Link>

        {/* 🖥️ DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8 relative">
          
          <NavLink to="/" className={desktopLinkStyle}>
            Home <span className={underlineStyle}></span>
          </NavLink>

          {/* Categories Dropdown (Fixed Hover Gap!) */}
          <div className="relative group cursor-pointer">
            <div className={desktopLinkStyle}>
              Menu <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
              <span className={underlineStyle}></span>
            </div>
            
            {/* The 'pt-4' creates an invisible bridge so hover doesn't break */}
            <div className="absolute top-full left-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <Link to="/veg" className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition">🥗 Pure Veg</Link>
                <Link to="/nonveg" className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition">🍗 Non-Veg</Link>
                <Link to="/milk" className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition">🥛 Dairy & Milk</Link>
                <Link to="/chocolate" className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium transition">🍫 Chocolates</Link>
              </div>
            </div>
          </div>

          <NavLink to="/aboutus" className={desktopLinkStyle}>
            About Us <span className={underlineStyle}></span>
          </NavLink>
          
          <NavLink to="/contactus" className={desktopLinkStyle}>
            Contact <span className={underlineStyle}></span>
          </NavLink>
        </div>

        {/* 🖥️ DESKTOP AUTH / PROFILE (Amazon Style) */}
        <div className="hidden md:block">
          {token ? (
            <div className="relative group cursor-pointer border border-transparent hover:border-gray-200 p-2 rounded-xl transition">
              <div className="flex items-center gap-2 text-gray-800">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                  <User size={20} />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">
                    Hello, {userName ? userName.split(" ")[0] : "Guest"}
                  </span>
                  <span className="text-sm font-bold flex items-center gap-1">
                    Account & Orders <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Profile Dropdown (Fixed Hover Gap!) */}
              <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  <Link to="/orders" className="flex items-center gap-3 px-5 py-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium transition border-b border-gray-50">
                    <Package size={18} /> My Orders
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50 font-medium transition text-left">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/signup" className="flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-2.5 rounded-full font-bold hover:bg-orange-500 hover:text-white transition shadow-sm hover:shadow-orange-500/30">
              <User size={18} /> Login / Sign Up
            </Link>
          )}
        </div>

        {/* 📱 MOBILE HAMBURGER BUTTON */}
        <button 
          className="md:hidden text-gray-800 hover:text-orange-500 transition focus:outline-none bg-gray-50 p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* 📱 MOBILE MENU DROPDOWN (Fixed positioning!) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-40 ${
          isOpen ? "max-h-[85vh] border-t border-gray-100 opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col py-2 max-h-[85vh] overflow-y-auto">
          
          {/* Mobile User Greeting */}
          <div className="px-6 py-4 bg-orange-50 mb-2 flex items-center justify-between">
            {token ? (
              <div>
                <span className="text-xs text-orange-600 font-bold uppercase tracking-wider block mb-1">Welcome back</span>
                <span className="text-lg font-extrabold text-gray-900">{userName}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">Welcome to Foody!</span>
            )}
          </div>

          <NavLink to="/" className={mobileLinkStyle} onClick={closeMenu}>🏠 Home</NavLink>
          <NavLink to="/veg" className={mobileLinkStyle} onClick={closeMenu}>🥗 Pure Veg</NavLink>
          <NavLink to="/nonveg" className={mobileLinkStyle} onClick={closeMenu}>🍗 Non-Veg</NavLink>
          <NavLink to="/milk" className={mobileLinkStyle} onClick={closeMenu}>🥛 Dairy & Milk</NavLink>
          <NavLink to="/chocolate" className={mobileLinkStyle} onClick={closeMenu}>🍫 Chocolates</NavLink>
          <NavLink to="/aboutus" className={mobileLinkStyle} onClick={closeMenu}><Info size={20}/> About Us</NavLink>
          <NavLink to="/contactus" className={mobileLinkStyle} onClick={closeMenu}><Phone size={20}/> Contact Us</NavLink>

          {/* Mobile Auth Actions */}
          <div className="p-6 mt-4 bg-gray-50 border-t border-gray-100">
            {token ? (
              <div className="flex flex-col gap-3">
                <Link to="/orders" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 px-5 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-sm" onClick={closeMenu}>
                  <Package size={18} /> My Orders
                </Link>
                <button onClick={() => { handleLogout(); closeMenu(); }} className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-5 py-3 rounded-xl font-bold hover:bg-red-200 transition">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/signup" className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30" onClick={closeMenu}>
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