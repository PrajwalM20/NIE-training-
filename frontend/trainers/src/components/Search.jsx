import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import api from "../api";

export default function Search() {
  const navigate = useNavigate();
  const [q, setQ] = useState({ name: "", place: "", technology: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // 1️⃣ Check if ALL fields are empty
    if (!q.name && !q.place && !q.technology) {
      setError("Please enter at least one field to search.");
      return;
    }

    // 2️⃣ Build params for API
    const params = new URLSearchParams();
    if (q.name) params.set("name", q.name);
    if (q.place) params.set("place", q.place);
    if (q.technology) params.set("technology", q.technology);

    // 3️⃣ Check with backend if any trainer exists
    try {
      const res = await api.get(`/trainer/?${params.toString()}`);

      const results = res.data.results || res.data || [];

      if (results.length === 0) {
        // ❌ No results → do NOT navigate
        setError("No trainer found. Try different information.");
        return;
      }

      // 4️⃣ SUCCESS → navigate to trainer list
      navigate(`/trainer-list?${params.toString()}`);

    } catch (err) {
      setError("Error searching trainers.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            p: 4,
            background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight={800}>
            Search Trainers
          </Typography>
          <Typography sx={{ mt: 1, opacity: 0.9 }}>
            Enter details to find trainers
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={submit}>
            <TextField
              label="Trainer Name"
              fullWidth
              margin="normal"
              value={q.name}
              onChange={(e) => setQ({ ...q, name: e.target.value })}
            />

            <TextField
              label="Place"
              fullWidth
              margin="normal"
              value={q.place}
              onChange={(e) => setQ({ ...q, place: e.target.value })}
            />

            <TextField
              label="Technology"
              fullWidth
              margin="normal"
              value={q.technology}
              onChange={(e) => setQ({ ...q, technology: e.target.value })}
            />

            <Divider sx={{ my: 3 }} />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                py: 1.4,
                borderRadius: 3,
                fontSize: "16px",
                fontWeight: 600,
                background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              }}
            >
              Search Trainer
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
