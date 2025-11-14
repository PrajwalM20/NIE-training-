import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { updateTrainer, getTrainer } from "../api";

import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function UpdateTrainers() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const idFromQuery = searchParams.get("id");

  const [trainer, setTrainer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    place: "",
    technology1: "",
    technology2: "",
  });

  // load trainer data
  useEffect(() => {
    const load = async () => {
      try {
        if (state?.id) {
          setTrainer(state);
        } else if (idFromQuery) {
          const res = await getTrainer(idFromQuery);
          setTrainer(res.data);
        } else {
          navigate("/trainer-list");
        }
      } catch (err) {
        console.error(err);
        navigate("/trainer-list");
      }
    };
    load();
  }, [state, idFromQuery, navigate]);

  const change = (e) =>
    setTrainer({ ...trainer, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await updateTrainer(trainer.id, trainer);
      alert("Updated successfully");
      navigate("/trainer-list");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 2,
        boxShadow: 5,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Update Trainer
        </Typography>

        <form onSubmit={submit}>
          <TextField
            label="Name"
            name="name"
            margin="normal"
            fullWidth
            required
            value={trainer.name}
            onChange={change}
          />

          <TextField
            label="Email"
            name="email"
            margin="normal"
            fullWidth
            required
            value={trainer.email}
            onChange={change}
          />

          <TextField
            label="Phone"
            name="phone"
            margin="normal"
            fullWidth
            required
            value={trainer.phone}
            onChange={change}
          />

          <TextField
            label="Place"
            name="place"
            margin="normal"
            fullWidth
            required
            value={trainer.place}
            onChange={change}
          />

          <TextField
            label="Technology 1"
            name="technology1"
            margin="normal"
            fullWidth
            required
            value={trainer.technology1}
            onChange={change}
          />

          <TextField
            label="Technology 2"
            name="technology2"
            margin="normal"
            fullWidth
            value={trainer.technology2}
            onChange={change}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2 }}
            type="submit"
          >
            Update Trainer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
