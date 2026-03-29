import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE } from './config/backend';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setIsRendered(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsAnimating(true)));
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialMode]);

  if (!isRendered) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        const payload = {
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value
        };

        if (payload.password !== e.target.confirmPassword.value) {
            toast.error("Passwords do not match!");
            return;
        }

        await axios.post(`${API_BASE}/auth/register`, payload);
        toast.success("Account created successfully. Please sign in!");
        setMode('login');
      } else {
        const payload = {
          email: e.target.email.value,
          password: e.target.password.value
        };
        const res = await axios.post(`${API_BASE}/auth/login`, payload);
        localStorage.setItem('accessToken', res.data.accessToken);
        if (res.data.refreshToken) localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('userName', res.data.name);
        toast.success(`Welcome back, ${res.data.name}!`);
        onClose();
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Authentication failed.");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-card w-full max-w-[420px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
        <button onClick={onClose} className="absolute right-4 top-4 text-text-muted hover:text-text-dark z-10 p-2">
          <X size={20} />
        </button>

        <div className="p-8 pt-10">
          <div className="text-center mb-8">
            <h2 className="font-sora font-extrabold text-2xl text-text-dark mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join Foody'}
            </h2>
            <p className="text-sm text-text-muted">
              {mode === 'login' 
                ? 'Enter your details to access your account' 
                : 'Sign up to discover premium dining and groceries'}
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                className="border-b border-border focus:border-primary outline-none py-3 px-0 w-full text-sm bg-transparent placeholder:text-text-muted transition-colors" 
                required
              />
            )}
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              className="border-b border-border focus:border-primary outline-none py-3 px-0 w-full text-sm bg-transparent placeholder:text-text-muted transition-colors" 
              required
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className="border-b border-border focus:border-primary outline-none py-3 px-0 w-full text-sm bg-transparent placeholder:text-text-muted transition-colors" 
              required
            />
            {mode === 'signup' && (
              <input 
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password" 
                className="border-b border-border focus:border-primary outline-none py-3 px-0 w-full text-sm bg-transparent placeholder:text-text-muted transition-colors" 
                required
              />
            )}

            {mode === 'login' && (
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-text-muted hover:text-primary transition-colors">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="mt-6 bg-primary text-white py-3 px-6 rounded text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all w-full shadow-md shadow-primary/20">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Footer switch */}
        <div className="bg-bg border-t border-border p-6 text-center text-sm">
          <span className="text-text-muted">
            {mode === 'login' ? 'New to Foody? ' : 'Already have an account? '}
          </span>
          <button 
            type="button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-primary font-bold hover:underline ml-1 focus:outline-none"
          >
            {mode === 'login' ? 'Create an account' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
