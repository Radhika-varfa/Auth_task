import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import axios from "../api/axios";

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setError("No verification token provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/verify-email?token=${token}`
        );

        if (response.data.success) {
          // Verification successful
          setLoading(false);
        } else {
          setError(response.data.message || "Verification failed");
          setLoading(false);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Verification failed");
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box mt={5} textAlign="center">
          <CircularProgress />
          <Typography variant="h6" mt={2}>
            Verifying your email...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box mt={5} textAlign="center">
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          {/* <Button variant="contained" onClick={() => navigate("/register")}>
            Go to Registration
          </Button> */}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Alert severity="success" sx={{ mb: 2 }}>
          Email verified successfully!
        </Alert>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default EmailVerified;
