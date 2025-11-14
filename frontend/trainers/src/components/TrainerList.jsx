import React, { useEffect, useState } from "react";
import { getTrainers, deleteTrainer } from "../api";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";

export default function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    const res = await getTrainers();
    setTrainers(res.data.results || res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Trainer List
      </Typography>

      <Paper elevation={4}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              {["Name", "Email", "Phone", "Place", "Tech1", "Tech2", "Actions"].map(
                (h) => (
                  <TableCell key={h} sx={{ fontWeight: 600 }}>
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
                  <Button onClick={() => setSelected(t)}>View</Button>
                  <Button onClick={() => navigate("/update", { state: t })}>
                    Update
                  </Button>
                  <Button
                    color="error"
                    onClick={() => deleteTrainer(t.id).then(load)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {!trainers.length && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No trainers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {selected && (
        <Paper sx={{ mt: 3, p: 3 }} elevation={3}>
          <Typography variant="h6">{selected.name}</Typography>
          <Typography>Email: {selected.email}</Typography>
          <Typography>Phone: {selected.phone}</Typography>
          <Typography>Place: {selected.place}</Typography>
        </Paper>
      )}
    </Box>
  );
}
