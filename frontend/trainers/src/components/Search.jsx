import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function Search() {
  const navigate = useNavigate();
  const [q, setQ] = useState({ name: "", place: "", technology: "" });

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(q).toString();
    navigate("/trainer-list?" + params);
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", p: 2, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" mb={2} fontWeight={600}>
          Search Trainers
        </Typography>

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

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
            type="submit"
          >
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
