import React, { useState } from "react";
import { addTrainer } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

export default function AddTrainers() {
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    technology1: "",
    technology2: "",
  });

  const [error, setError] = useState("");

  const change = (e) =>
    setTrainer({ ...trainer, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await addTrainer(trainer);
      alert("Trainer added successfully!");
      navigate("/trainer-list");
    } catch (err) {
      console.error("Add error:", err.response?.data);

      if (err.response?.data?.email) {
        setError("A trainer with this email already exists.");
      } else {
        setError("Failed to add trainer. Please check your input.");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 3,
      }}
    >
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} mb={3}>
            Add Trainer
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={submit}>
            <Grid container spacing={2}>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  required
                  value={trainer.name}
                  onChange={change}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  required
                  value={trainer.email}
                  onChange={change}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  fullWidth
                  required
                  value={trainer.phone}
                  onChange={change}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Place"
                  name="place"
                  fullWidth
                  required
                  value={trainer.place}
                  onChange={change}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Technology 1"
                  name="technology1"
                  fullWidth
                  value={trainer.technology1}
                  onChange={change}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Technology 2"
                  name="technology2"
                  fullWidth
                  value={trainer.technology2}
                  onChange={change}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    mt: 2,
                    py: 1.4,
                    background: "linear-gradient(135deg,#4f46e5,#3b82f6)",
                  }}
                >
                  ADD TRAINER
                </Button>
              </Grid>

            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
