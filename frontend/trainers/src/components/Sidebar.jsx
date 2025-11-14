import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <div
      style={{
        width: collapsed ? "70px" : "240px",
        height: "100vh",
        background: "linear-gradient(180deg, #00254d, #003c7a)",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
        paddingTop: "35px",
        transition: "0.3s ease",
        boxShadow: "4px 0 12px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: collapsed ? "center" : "flex-start",
        zIndex: 999
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          background: "white",
          color: "#003c7a",
          border: "none",
          padding: "12px",
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: collapsed ? "center" : "flex-end",
          marginBottom: "35px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        }}
      >
        {collapsed ? "☰" : "✖"}
      </button>

      {!collapsed && (
        <h3 style={{ marginBottom: "25px", fontWeight: "600" }}>Menu</h3>
      )}

      {/* Menu Items */}
      <div style={{ flex: 1, width: "100%" }}>
        <SidebarLink to="/home" text="Dashboard" collapsed={collapsed} />
        <SidebarLink to="/search" text="Search" collapsed={collapsed} />
        <SidebarLink to="/add" text="Add Trainer" collapsed={collapsed} />
        <SidebarLink to="/trainer-list" text="Trainer List" collapsed={collapsed} />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          background: "#ff4d4d",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "600",
          marginTop: "20px",
        }}
      >
        {collapsed ? "⏻" : "Logout"}
      </button>
    </div>
  );
};

const SidebarLink = ({ to, text, collapsed }) => (
  <div style={{ marginBottom: "18px", width: "100%" }}>
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "white",
        fontSize: "17px",
        padding: "10px 5px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderRadius: "8px",
        transition: "0.3s",
        fontWeight: "500",
      }}
    >
      • {!collapsed && text}
    </Link>
  </div>
);
