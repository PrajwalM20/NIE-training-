import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f1a40, #1c2d63, #3e57c8)",
        padding: "50px",
        borderRadius: "20px",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "15px", fontWeight: "700" }}>
        Trainer Management System
      </h1>

      <p
        style={{
          fontSize: "1.25rem",
          maxWidth: "650px",
          marginBottom: "40px",
          opacity: 0.9,
        }}
      >
        Manage your trainers: add, search, update, delete easily.
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/search" style={button("#000")}>Search Trainers</Link>
        <Link to="/add" style={button("#006dff")}>Add Trainer</Link>
        <Link to="/trainer-list" style={button("#22c55e")}>Trainer List</Link>
      </div>
    </div>
  );
};

const button = (bg) => ({
  background: bg,
  padding: "14px 32px",
  color: "white",
  fontWeight: "600",
  borderRadius: "30px",
  textDecoration: "none",
  fontSize: "17px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  transition: "0.3s",
});
