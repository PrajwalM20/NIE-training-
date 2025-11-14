import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListIcon from "@mui/icons-material/List";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box>

      {/* Header */}
      <Card
        sx={{
          background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
          color: "white",
          p: 4,
          mb: 4,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight={700}>
            Trainer Management System
          </Typography>
          <Typography sx={{ opacity: 0.9, mt: 1 }}>
            Add, update, search & manage trainers easily.
          </Typography>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" fontWeight={700} mb={2}>
        Quick Actions
      </Typography>

      <Grid container spacing={3} columns={12}>
        {/* Search */}
        <Grid size={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchIcon />}
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 2,
              borderRadius: 3,
              background: "#4f46e5",
              "&:hover": { background: "#3b35c5" },
            }}
            onClick={() => navigate("/search")}
          >
            Search Trainers
          </Button>
        </Grid>

        {/* Add Trainer */}
        <Grid size={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddCircleIcon />}
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 2,
              borderRadius: 3,
              background: "#10b981",
              "&:hover": { background: "#0e9d73" },
            }}
            onClick={() => navigate("/add")}
          >
            Add Trainer
          </Button>
        </Grid>

        {/* Trainer List */}
        <Grid size={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<ListIcon />}
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 2,
              borderRadius: 3,
              background: "#2563eb",
              "&:hover": { background: "#1e4fd1" },
            }}
            onClick={() => navigate("/trainer-list")}
          >
            Trainer List
          </Button>
        </Grid>
      </Grid>

    </Box>
  );
}
