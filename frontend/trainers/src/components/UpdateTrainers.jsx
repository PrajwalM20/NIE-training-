import React, { useEffect, useState } from "react";
import { updateTrainer, getTrainer } from "../api";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Alert,
  Box,
} from "@mui/material";

export default function UpdateTrainers() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const idQuery = params.get("id");

  const [trainer, setTrainer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    place: "",
    technology1: "",
    technology2: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        if (state?.id) setTrainer(state);
        else if (idQuery) {
          const res = await getTrainer(idQuery);
          setTrainer(res.data);
        } else navigate("/trainer-list");
      } catch {
        navigate("/trainer-list");
      }
    };
    load();
  }, []);

  const change = (e) =>
    setTrainer({ ...trainer, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const copy = { ...trainer };
      delete copy.id;
      await updateTrainer(trainer.id, copy);
      alert("Updated successfully!");
      navigate("/trainer-list");
    } catch (err) {
      if (err.response?.data?.email)
        setError("Email already exists.");
      else setError("Failed to update.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Card className="glass-card">
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            Update Trainer
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={submit}>
            {["name", "email", "phone", "place", "technology1", "technology2"].map((f) => (
              <TextField
                key={f}
                label={f.toUpperCase()}
                name={f}
                fullWidth
                required={f !== "technology2"}
                margin="normal"
                value={trainer[f]}
                onChange={change}
              />
            ))}

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                py: 1.3,
                background: "linear-gradient(90deg,#0b5cff,#6a8cff)",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              UPDATE TRAINER
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
