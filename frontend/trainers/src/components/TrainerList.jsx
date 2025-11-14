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
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  Card,
  CardContent,
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
    // Read the search filters from URL
    const query = new URLSearchParams(location.search);
    const name = query.get("name");
    const place = query.get("place");
    const technology = query.get("technology");

    // Build params object
    const params = {};
    if (name) params.name = name;
    if (place) params.place = place;
    if (technology) params.technology = technology;

    // Call API with filters
    const res = await getTrainers(params);

    setTrainers(res.data.results || res.data || []);
  };

  useEffect(() => {
    load();
  }, [location.search]); // REFRESH WHEN SEARCH CHANGES

  return (
    <Box>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Trainer List
      </Typography>

      <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f3f4f6" }}>
              {["Name", "Email", "Phone", "Place", "Tech 1", "Tech 2", "Actions"].map(
                (h) => (
                  <TableCell key={h} sx={{ fontWeight: 700, py: 2 }}>
                    {h}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {trainers.map((t) => (
              <TableRow key={t.id} hover>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.email}</TableCell>
                <TableCell>{t.phone}</TableCell>
                <TableCell>{t.place}</TableCell>
                <TableCell>{t.technology1}</TableCell>
                <TableCell>{t.technology2}</TableCell>

                <TableCell>
                  <IconButton onClick={() => setSelected(t)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => navigate("/update", { state: t })}
                    color="success"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteTrainer(t.id).then(load)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {!trainers.length && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No trainers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {selected && (
        <Card sx={{ mt: 3, p: 3 }} elevation={3}>
          <Typography variant="h6" fontWeight={700}>
            {selected.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Email: {selected.email}</Typography>
          <Typography>Phone: {selected.phone}</Typography>
          <Typography>Place: {selected.place}</Typography>
          <Typography>Technology 1: {selected.technology1}</Typography>
          <Typography>Technology 2: {selected.technology2}</Typography>
        </Card>
      )}
    </Box>
  );
}
