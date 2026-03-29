import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import useCartStore from './store/cartStore';

function Navbar() {
  const { totalQty, openCart } = useCartStore();
  const userName = localStorage.getItem('userName') || 'Guest';
  const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const navLinkStyle = ({ isActive }) => 
    `text-sm font-medium transition-colors h-full flex items-center border-b-2 ${
      isActive ? 'border-primary text-text-dark' : 'border-transparent text-text-muted hover:text-text-dark'
    }`;

  return (
    <nav className="h-16 sticky top-0 z-50 backdrop-blur-md bg-bg/85 border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-sora font-extrabold text-xl text-primary">Foody</span>
          <span className="font-sora font-extrabold text-xl text-text-dark ml-1">Sensations</span>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-6 h-full">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/veg" className={navLinkStyle}>Veg</NavLink>
          <NavLink to="/nonveg" className={navLinkStyle}>Non-Veg</NavLink>
          <NavLink to="/dairy" className={navLinkStyle}>Dairy</NavLink>
          <NavLink to="/chocolates" className={navLinkStyle}>Chocolates</NavLink>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          <button 
            onClick={openCart}
            className="relative p-2 text-text-dark hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalQty > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>
          
          {localStorage.getItem('accessToken') ? (
            <Link to="/profile" className="w-8 h-8 rounded-full bg-text-dark text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-lg">
              {initials}
            </Link>
          ) : (
            <button 
              onClick={() => window.openAuth && window.openAuth()}
              className="bg-primary text-white py-2 px-4 rounded text-[13px] font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all shadow-md shadow-primary/20"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
