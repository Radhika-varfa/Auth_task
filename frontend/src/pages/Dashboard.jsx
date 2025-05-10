import React from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Typography, Container, Button } from "@mui/material";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome, {user?.email} (Role: {user?.role})
        </Typography>
        <Button variant="contained" color="error" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
