import React, { useEffect, useState } from "react";
import { getTrainers, deleteTrainer } from "../api";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const load = async () => {
    try {
      const query = new URLSearchParams(location.search);
      const params = {};

      if (query.get("name")) params.name = query.get("name");
      if (query.get("place")) params.place = query.get("place");
      if (query.get("technology1"))
        params.technology1 = query.get("technology1");

      const res = await getTrainers(params);

      // Handles paginated or non-paginated data
      const trainersData = res.data.results || res.data || [];
      setTrainers(trainersData);
    } catch (err) {
      console.error("Failed to load trainers:", err);
      setTrainers([]);
    }
  };

  useEffect(() => {
    load();
  }, [location.search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?"))
      return;

    try {
      await deleteTrainer(id);
      load();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete trainer.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
        Trainer List
      </Typography>

      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          mb: 4,
          backdropFilter: "blur(8px)",
        }}
        elevation={4}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(90deg, #0b5cff, #6a8cff)",
              }}
            >
              {[
                "Name",
                "Email",
                "Phone",
                "Place",
                "Tech 1",
                "Tech 2",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: 800, color: "#fff", fontSize: "15px" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {trainers.length > 0 ? (
              trainers.map((t) => (
                <TableRow
                  key={t.id}
                  hover
                  sx={{
                    transition: "0.2s",
                    "&:hover": { background: "rgba(0,0,0,0.03)" },
                  }}
                >
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.email}</TableCell>
                  <TableCell>{t.phone}</TableCell>
                  <TableCell>{t.place}</TableCell>
                  <TableCell>{t.technology1}</TableCell>
                  <TableCell>{t.technology2}</TableCell>

                  <TableCell>
                    <IconButton
                      color="info"
                      onClick={() => setSelected(t)}
                      sx={{ mr: 1 }}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      color="primary"
                      onClick={() => navigate("/update", { state: t })}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error" onClick={() => handleDelete(t.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  No trainers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {selected && (
        <Card
          className="glass-card"
          sx={{
            p: 3,
            maxWidth: 500,
            mx: "auto",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {selected.name}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ mb: 1 }}>
              <b>Email:</b> {selected.email}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <b>Phone:</b> {selected.phone}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <b>Place:</b> {selected.place}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <b>Technology 1:</b> {selected.technology1}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <b>Technology 2:</b> {selected.technology2}
            </Typography>

            <Button
              sx={{
                mt: 2,
                px: 3,
                background: "linear-gradient(90deg,#0b5cff,#6a8cff)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 2,
                "&:hover": { opacity: 0.9 },
              }}
              onClick={() => setSelected(null)}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
