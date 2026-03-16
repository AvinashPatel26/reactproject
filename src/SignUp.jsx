import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "./api/axios";
// import "./SignUp.css"; // You can safely delete this file now!

function SignUp() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      /* SIGN UP */
      if (isSignUp) {
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        if (form.password.length < 6) {
          toast.error("Password must be at least 6 characters");
          setLoading(false);
          return;
        }

        await api.post("/auth/register", {
          name: form.name,
          username: form.username,
          password: form.password,
        });

        toast.success("Registration successful! Please login. 🎉");
        resetForm();
        setIsSignUp(false); // Switch to login view automatically
      } else {

      /* LOGIN */
        const res = await api.post("/auth/login", {
          username: form.username,
          password: form.password,
        });

        const { accessToken, refreshToken, name, role } = res.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userName", name);
        localStorage.setItem("userRole", role || "user");

        toast.success(`Welcome back, ${name}! 🍕`);

        setTimeout(() => {
          // Force a reload or navigation to update the app state
          window.location.href = "/";
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md transition-all">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            {isSignUp ? "Create Account 🔐" : "Welcome Back 🔑"}
          </h2>
          <p className="text-gray-500">
            {isSignUp
              ? "Sign up to start ordering delicious food!"
              : "Login to your account to continue."}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="johndoe123"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="••••••••"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-bold text-lg py-3.5 rounded-xl hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up 🚀" : "Sign In 🍽️"}
          </button>
        </form>

        {/* TOGGLE VIEW BUTTON */}
        <div className="mt-8 text-center text-gray-600 font-medium">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="text-orange-500 font-bold hover:underline focus:outline-none"
                onClick={() => {
                  setIsSignUp(false);
                  resetForm();
                }}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-orange-500 font-bold hover:underline focus:outline-none"
                onClick={() => {
                  setIsSignUp(true);
                  resetForm();
                }}
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
