import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "white",
        borderRight: "1px solid #e5e7eb",
        p: 2,
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Trainer Panel
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        <ListItemButton component={Link} to="/home">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/search">
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>

        <ListItemButton component={Link} to="/add">
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Trainer" />
        </ListItemButton>

        <ListItemButton component={Link} to="/trainer-list">
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Trainer List" />
        </ListItemButton>
      </List>

      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ mt: 3 }}
        startIcon={<LogoutIcon />}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
}
