import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <CssBaseline /> {/* Normalize CSS */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet /> {/* This renders the matched route component */}
      </Container>
    </>
  );
};

export default Layout;
