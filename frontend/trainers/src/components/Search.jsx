import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Typography, Button, Box } from "@mui/material";

export default function Search() {
  const navigate = useNavigate();
  const [q, setQ] = useState({
    name: "",
    place: "",
    technology1: "",
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();

    // build params only with non-empty values
    const params = {};
    if (q.name.trim()) params.name = q.name.trim();
    if (q.place.trim()) params.place = q.place.trim();
    if (q.technology1.trim()) params.technology = q.technology1.trim(); // backend expects "technology" or "technology1" depending on your API
    if (q.email.trim()) params.email = q.email.trim();

    if (Object.keys(params).length === 0) {
      return alert("Enter at least one search field");
    }

    navigate("/trainer-list?" + new URLSearchParams(params).toString());
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Card className="glass-card">
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>Search Trainers</Typography>
          <form onSubmit={submit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={q.name}
              onChange={(e) => setQ({ ...q, name: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Place"
              value={q.place}
              onChange={(e) => setQ({ ...q, place: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Technology"
              value={q.technology1}
              onChange={(e) => setQ({ ...q, technology1: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={q.email}
              onChange={(e) => setQ({ ...q, email: e.target.value })}
              helperText="Search trainers by their email address"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Search</Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
