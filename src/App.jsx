import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Component Imports
import Navbar from "./Navbar";
import Home from "./Home";
import CategoryPage from "./CategoryPage";
import Profile from "./Profile";
import CartDrawer from "./CartDrawer";
import AuthModal from "./AuthModal";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function ScrollHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function Layout() {
  const token = localStorage.getItem("accessToken");
  const isAuth = !!token;
  
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  
  useEffect(() => {
    window.openAuth = () => setAuthModalOpen(true);
    return () => delete window.openAuth;
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg font-sans">
      <ScrollHandler />

      <Navbar />
      <CartDrawer />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode="login" 
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Dynamic Categories */}
          <Route path="/:category" element={<CategoryPage />} />
          
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/" />}
          />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12 text-center mt-auto">
        <div className="max-w-[1280px] mx-auto px-8">
          <p className="font-sora font-extrabold text-xl text-primary mb-2 flex items-center justify-center gap-1">
            Foody <span className="text-text-dark">Sensations</span>
          </p>
          <p className="text-sm text-text-muted mb-4">Premium dining and groceries, delivered fresh.</p>
          <p className="text-xs text-text-muted font-medium">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </footer>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
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
