import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await api.post("token/", formData);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/home");
    } catch {
      setErrorMsg("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#eef2f7",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: 430,
          borderRadius: 4,
          boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
            p: 4,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight={800}>
            Trainer Portal
          </Typography>
          <Typography sx={{ mt: 1, opacity: 0.9 }}>
            Sign in to manage trainers & dashboard
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Error message */}
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #3b35c5, #2563eb)",
                },
              }}
            >
              Login
            </Button>
          </form>

          {/* Bottom text */}
          <Divider sx={{ my: 3 }} />
          <Typography align="center" sx={{ fontSize: "13px", color: "#555" }}>
            © 2025 Trainer Management System
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
