import React from "react";
import { Container, Typography, Link } from "@mui/material";

function SimpleFooter() {
  return (
    <footer
      style={{
        backgroundColor: "gray",
        color: "Black",
        // padding: theme.spacing(2),
        marginTop: "auto",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} The Book Store
        </Typography>
        <Typography variant="body2" align="center">
          <Link color="inherit" href="#">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link color="inherit" href="#">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}

export default SimpleFooter;
