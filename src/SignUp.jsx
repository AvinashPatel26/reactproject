import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";
import { toast } from "react-toastify";
import "./SignUp.css";

function SignUp() {

  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

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

        toast.success("Registration successful! Please login.");

        resetForm();

        setIsSignUp(false);

      }

      /* LOGIN */

      else {

        const res = await api.post("/auth/login", {
          username: form.username,
          password: form.password,
        });

        const { accessToken, refreshToken, name, role } = res.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userName", name);
        localStorage.setItem("userRole", role || "user");

        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/home");
        }, 1000);

      }

    }

    catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Authentication failed"
      );

    }

    finally {

      setLoading(false);

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

            <label className="form-label fw-semibold">
              Full Name
            </label>

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

          <label className="form-label fw-semibold">
            Username
          </label>

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

          <label className="form-label fw-semibold">
            Password
          </label>

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

            <label className="form-label fw-semibold">
              Confirm Password
            </label>

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

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >

          {loading
            ? "Processing..."
            : isSignUp
            ? "Sign Up"
            : "Sign In"}

        </button>

      </form>

      <div className="mt-3 text-center">

        {isSignUp ? (

          <p className="text-muted">

            Already have an account?{" "}

            <button
              className="btn btn-link p-0"
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>

          </p>

        ) : (

          <p className="text-muted">

            Don’t have an account?{" "}

            <button
              className="btn btn-link p-0"
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>

          </p>

        )}

      </div>

    </div>

  );

}

export default SignUp;