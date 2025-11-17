// src/components/Sidebar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const isActive = (route) => location.pathname === route;

  const activeStyle = {
    background: "rgba(255,255,255,0.18)",
    borderRadius: "14px",
    boxShadow: "0 0 15px rgba(0, 150, 255, 0.35)",
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        background: "linear-gradient(180deg, #091728 0%, #0c2347 100%)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      {/* TITLE */}
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: 27,
          mb: 1,
          textShadow: "0px 2px 4px rgba(0,0,0,0.4)",
        }}
      >
        Trainer Panel
      </Typography>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.12)",
          mb: 3,
        }}
      />

      {/* MENU */}
      <List sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {[
          { label: "Dashboard", icon: <DashboardIcon />, link: "/home" },
          { label: "Search", icon: <SearchIcon />, link: "/search" },
          { label: "Add Trainer", icon: <AddIcon />, link: "/add" },
          { label: "Trainer List", icon: <ListAltIcon />, link: "/trainer-list" },
        ].map((item) => (
          <ListItemButton
            key={item.link}
            component={Link}
            to={item.link}
            sx={{
              py: 1.4,
              color: "#fff",
              borderRadius: "14px",
              transition: "0.25s",
              ...(isActive(item.link) ? activeStyle : {}),
              "&:hover": {
                background: isActive(item.link)
                  ? "rgba(255,255,255,0.22)"
                  : "rgba(255,255,255,0.10)",
                transform: "translateX(5px)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      {/* LOGOUT BUTTON */}
      <Button
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={logout}
        sx={{
          mt: 2,
          py: 1.3,
          fontWeight: 800,
          borderRadius: 2,
          background: "linear-gradient(90deg,#0b5cff,#6a8cff)",
          color: "#fff",
          boxShadow: "0 6px 18px rgba(11,92,255,0.25)",
          transition: "0.25s",
          "&:hover": {
            opacity: 0.95,
            transform: "translateY(-2px)",
          },
        }}
      >
        LOGOUT
      </Button>
    </Box>
  );
}
