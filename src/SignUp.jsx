import React, { useState } from "react";
import "./SignUp.css";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        })
      );

      alert("Account created successfully! You can now log in.");
      setIsSignUp(false);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        alert("No account found. Please sign up first.");
        setIsSignUp(true);
        return;
      }

      if (
        storedUser.email === form.email &&
        storedUser.password === form.password
      ) {
        alert(`Welcome back, ${storedUser.name}! 🎉`);
      } else {
        alert("Invalid email or password!");
      }
    }
  };

  return (
    <div className="container mt-4 bg-light" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-primary fw-bold">{isSignUp ? "🔐 Sign Up" : "🔑 Sign In"}</h2>

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

        <button type="submit" className="btn btn-primary w-100">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

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
    </div>
  );
}

export default SignUp;