// src/components/AddTrainers.jsx
import React, { useState } from "react";
import { addTrainer } from "../api";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function AddTrainers() {
  const [t, setT] = useState({
    name: "",
    place: "",
    email: "",
    phone: "",
    technology1: "",
    technology2: "",
  });

  const handleChange = (e) => {
    setT({ ...t, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    // 🔥 REQUIRED FIELD VALIDATION 🔥
    if (!t.name || !t.email || !t.phone || !t.place || !t.technology1) {
      alert("All fields except Technology 2 are required!");
      return;
    }

    try {
      await addTrainer({
        name: t.name.trim(),
        email: t.email.trim(),
        phone: t.phone.trim(),
        place: t.place.trim(),
        technology1: t.technology1.trim(),
        technology2: t.technology2.trim(),
      });

      alert("Trainer added successfully!");
      setT({
        name: "",
        place: "",
        email: "",
        phone: "",
        technology1: "",
        technology2: "",
      });

    } catch (err) {
      console.error("Add Trainer Error:", err);

      let msg = "Failed to add trainer";

      if (err.response?.data) {
        const backend = err.response.data;

        // Show useful Django errors
        msg += "\n\n" + JSON.stringify(backend, null, 2);
      }

      alert(msg);
    }
  };

  return (
    <Box sx={{ maxWidth: 650, mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          mb: 3,
          textAlign: "center",
          color: "#0f172a",
        }}
      >
        Add Trainer
      </Typography>

      <Card
        className="glass-card"
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          animation: "fadeIn 0.35s ease-out",
        }}
      >
        <CardContent>
          <form onSubmit={submit}>
            <Stack spacing={2.8}>
              {[
                { label: "Name", name: "name" },
                { label: "Place", name: "place" },
                { label: "Email", name: "email" },
                { label: "Phone", name: "phone" },
                { label: "Technology 1", name: "technology1" },
                { label: "Technology 2 (Optional)", name: "technology2" },
              ].map((f) => (
                <TextField
                  key={f.name}
                  label={f.label}
                  name={f.name}
                  value={t[f.name]}
                  onChange={handleChange}
                  fullWidth
                  required={f.name !== "technology2"} // Required except tech2
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      transition: "0.2s",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0b5cff",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0b5cff",
                      borderWidth: "2px",
                    },
                  }}
                />
              ))}

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 1,
                  py: 1.4,
                  background: "linear-gradient(90deg,#0b5cff,#6a8cff)",
                  color: "#fff",
                  fontWeight: 800,
                  borderRadius: 3,
                  fontSize: "16px",
                  letterSpacing: "1px",
                  boxShadow: "0 8px 25px rgba(11,92,255,0.25)",
                  "&:hover": {
                    boxShadow: "0 10px 30px rgba(11,92,255,0.35)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all .2s ease",
                }}
              >
                ADD TRAINER
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
