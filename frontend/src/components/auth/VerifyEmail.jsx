import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/verify-email?token=${token}`
        );
        setMessage("Email verified successfully!");
        setIsSuccess(true);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Email verification failed"
        );
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        {isLoading ? (
          <>
            <CircularProgress />
            <Typography variant="h6" mt={2}>
              {message}
            </Typography>
          </>
        ) : (
          <>
            <Alert severity={isSuccess ? "success" : "error"} sx={{ mb: 2 }}>
              {message}
            </Alert>
            <Button
              variant="contained"
              onClick={() => navigate(isSuccess ? "/login/admin" : "/")}
            >
              {isSuccess ? "Go to Login" : "Go to Home"}
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
