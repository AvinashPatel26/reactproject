import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, logoutUser } from "./store"; // import actions
import "./SignUp.css";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, currentUser } = useSelector(
    (state) => state.authentication
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Dispatch Redux register
      dispatch(
        registerUser({
          username: form.email,
          name: form.name,
          password: form.password,
        })
      );

      alert("Account created successfully! Redirecting to cart...");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });

      // Navigate to cart
      navigate("/cart");
    } else {
      dispatch(loginUser({ username: form.email, password: form.password }));

      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <div className="container mt-4 bg-light shadow p-4 rounded" style={{ maxWidth: "420px" }}>
      <h2 className="mb-3 text-primary fw-bold text-center">
        {isSignUp ? "🔐 Create Account" : "🔑 Login"}
      </h2>

      {isAuthenticated && (
        <div className="alert alert-success text-center">
          Welcome, <strong>{currentUser?.name}</strong> 🎉
        </div>
      )}

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
          <label className="form-label fw-semibold">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
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

        {!isAuthenticated ? (
          <button type="submit" className="btn btn-primary w-100">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-danger w-100"
            onClick={() => dispatch(logoutUser())}
          >
            🚪 Logout
          </button>
        )}
      </form>

      {!isAuthenticated && (
        <div className="mt-3 text-center">
          {isSignUp ? (
            <p className="text-muted">
              Already have an account?{" "}
              <button
                className="btn btn-link p-0 text-primary"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-muted">
              Don’t have an account?{" "}
              <button
                className="btn btn-link p-0 text-primary"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SignUp;
