import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Welcome to Our App
        </Typography>
        <Typography variant="body1" paragraph>
          Please register or login to continue
        </Typography>
        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/register/customer"
          >
            Register as Customer
          </Button>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/register/admin"
          >
            Register as Admin
          </Button>
        </Box>
        <Box mt={2}>
          <Button 
            variant="text" 
            component={Link} 
            to="/login/admin"
          >
            Admin Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;