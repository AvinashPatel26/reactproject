import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
import "./SignUp.css";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        if (form.password !== form.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await axios.post("/auth/register", {
          name: form.name,
          username: form.username,
          password: form.password,
        });

        alert("Registration successful! Please login.");
        setIsSignUp(false);
      } else {
        const res = await axios.post("/auth/login", {
          username: form.username,
          password: form.password,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("userRole", res.data.role || "user");

        alert("Login successful!");
        navigate("/home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div
      className="container mt-4 p-4 rounded signup-auth auth-card shadow-lg"
      style={{ maxWidth: "420px" }}
    >
      <h2 className="mb-3 text-primary fw-bold text-center">
        {isSignUp ? "🔐 Create Account" : "🔑 Login"}
      </h2>

      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {isSignUp && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <div className="mt-3 text-center">
        {isSignUp ? (
          <p className="text-muted">
            Already have an account?{" "}
            <button className="btn btn-link p-0" onClick={() => setIsSignUp(false)}>
              Sign In
            </button>
          </p>
        ) : (
          <p className="text-muted">
            Don’t have an account?{" "}
            <button className="btn btn-link p-0" onClick={() => setIsSignUp(true)}>
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
