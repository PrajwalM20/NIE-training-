import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  Divider,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import CodeIcon from "@mui/icons-material/Code";
import PlaceIcon from "@mui/icons-material/Place";

import { getTrainerStats } from "../api";

export default function Home() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_trainers: 0,
    total_technologies: 0,
    total_locations: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await getTrainerStats();
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>

      {/* ⭐ HERO SECTION */}
      <Card
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "25px",
          background: "linear-gradient(135deg, #0b1b45, #2342a0, #4264ff)",
          color: "white",
          textAlign: "center",
          minHeight: { xs: 300, md: 420 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0px 20px 40px rgba(0,0,0,0.18)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 900, mb: 1, fontSize: { xs: "26px", md: "42px" } }}
        >
          Trainer Management System
        </Typography>

        <Typography sx={{ fontSize: { xs: "14px", md: "18px" }, mb: 4 }}>
          Manage trainers: Add, Search, Update, and Delete with ease.
        </Typography>

        {/* ACTION BUTTONS */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            onClick={() => navigate("/search")}
            startIcon={<SearchIcon />}
            sx={{
              background: "rgba(0,0,0,0.8)",
              color: "#fff",
              px: 4,
              py: 1.2,
              borderRadius: "40px",
              fontWeight: 700,
              "&:hover": { background: "#111", transform: "translateY(-3px)" },
              transition: "0.2s",
            }}
          >
            Search Trainers
          </Button>

          <Button
            onClick={() => navigate("/add")}
            startIcon={<AddIcon />}
            sx={{
              background: "linear-gradient(90deg,#007bff,#0b5cff)",
              color: "#fff",
              px: 4,
              py: 1.2,
              borderRadius: "40px",
              fontWeight: 700,
              "&:hover": { transform: "translateY(-3px)" },
              transition: "0.2s",
            }}
          >
            Add Trainer
          </Button>

          <Button
            onClick={() => navigate("/trainer-list")}
            startIcon={<ListAltIcon />}
            sx={{
              background: "linear-gradient(90deg,#0aad4a,#28d463)",
              color: "#fff",
              px: 4,
              py: 1.2,
              borderRadius: "40px",
              fontWeight: 700,
              "&:hover": { transform: "translateY(-3px)" },
              transition: "0.2s",
            }}
          >
            Trainer List
          </Button>
        </Box>
      </Card>

      {/* ⭐ LOWER SECTION (NO GRID) */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >

        {/* LEFT SIDE - STATS */}
        <Card sx={{ p: 3, flex: 2 }} className="glass-card">
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            
            <Box>
              <Typography sx={{ color: "#334155" }}>Welcome back</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Quick actions & overview
              </Typography>
              <Typography sx={{ color: "#64748b", mt: 0.5 }}>
                Stats update automatically when trainer data changes.
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />

            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <PeopleIcon sx={{ color: "#0b5cff", fontSize: 28 }} />
                <Typography sx={{ fontWeight: 800 }}>{stats.total_trainers}</Typography>
                <Typography sx={{ fontSize: 13, color: "#64748b" }}>Trainers</Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <CodeIcon sx={{ color: "#0ea5e9", fontSize: 28 }} />
                <Typography sx={{ fontWeight: 800 }}>{stats.total_technologies}</Typography>
                <Typography sx={{ fontSize: 13, color: "#64748b" }}>Technologies</Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <PlaceIcon sx={{ color: "#10b981", fontSize: 28 }} />
                <Typography sx={{ fontWeight: 800 }}>{stats.total_locations}</Typography>
                <Typography sx={{ fontSize: 13, color: "#64748b" }}>Locations</Typography>
              </Box>
            </Box>
          </Stack>
        </Card>

        {/* RIGHT SIDE - ABOUT SECTION */}
        <Card sx={{ p: 3, flex: 1 }} className="glass-card">
          <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 1 }}>
            About Trainer Management System
          </Typography>

          <Typography sx={{ color: "#475569", fontSize: 14 }}>
            This system helps manage all trainer details, including:
          </Typography>

          <ul style={{ marginTop: 10, color: "#475569", fontSize: 14 }}>
            <li>Personal Information</li>
            <li>Primary & Secondary Technologies</li>
            <li>Location & Contact Details</li>
            <li>Search, Update & Delete Options</li>
          </ul>

          <Button
            onClick={() => navigate("/trainer-list")}
            sx={{
              mt: 2,
              width: "100%",
              background: "linear-gradient(90deg,#0b5cff,#6a8cff)",
              color: "#fff",
              py: 1,
              borderRadius: "10px",
              fontWeight: 700,
            }}
          >
            View Trainers
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
