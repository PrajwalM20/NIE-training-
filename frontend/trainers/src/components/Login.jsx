import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../api";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await LoginApi(formData.username, formData.password);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      setErrorMsg("Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* CARD */}
      <div
        className="shadow"
        style={{
          padding: "40px 35px",
          width: "100%",
          maxWidth: "430px",
          background: "white",
          borderRadius: "18px",
        }}
      >
        {/* LOGO / BRAND */}
        <div className="text-center mb-4">
          <h2
            style={{
              fontWeight: "700",
              color: "#2b2f42",
              fontSize: "1.9rem",
            }}
          >
            Trainer Portal
          </h2>
          <p style={{ color: "#6c6f7a", fontSize: "0.95rem" }}>
            Sign in to manage trainers, view records, and access the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label className="fw-semibold mb-1" style={{ color: "#444" }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="form-control mb-3"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ padding: "10px" }}
          />

          {/* Password */}
          <label className="fw-semibold mb-1" style={{ color: "#444" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="form-control mb-2"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: "10px" }}
          />

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                color: "red",
                fontSize: "0.9rem",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {errorMsg}
            </div>
          )}

          {/* Login Button */}
          <button
            className="btn w-100"
            type="submit"
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              fontWeight: "600",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p
          className="text-center mt-4"
          style={{ fontSize: "0.85rem", color: "#777" }}
        >
          © 2025 Trainer Management System • All Rights Reserved
        </p>
      </div>
    </div>
  );
};
