import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
function ResponsiveAppBar() {
  const { loginWithRedirect, logout, user } = useAuth0();

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                The Book Store
              </Typography>
            </Link>

            <Typography style={{ marginRight: "10px", paddingLeft: "25px" }}>
              <Link
                to="/books"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                BOOKS
              </Link>
            </Typography>
            <Typography>
              <Link
                to="/authors"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  paddingLeft: "25px",
                }}
              >
                AUTHOR
              </Link>
            </Typography>
          </div>
          {!user ? (
            <Button
              size="large"
              variant="contained"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          ) : null}

          {user ? (
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                className={`text-white`}
                variant="Outlined"
                sx={{
                  textTransform: "none",
                  height: "35px",
                  paddingLeft: " 40px",
                  paddingRight: " 40px",
                }}
              >
                <AddShoppingCartIcon />
                Cart
              </Button>
            </Link>
          ) : null}

          {user ? (
            <Button
              className={`text-white`}
              variant="Outlined"
              sx={{
                textTransform: "none",
                height: "35px",
                paddingLeft: " 40px",
                paddingRight: " 40px",
              }}
              onClick={() => logout()}
            >
              LOG OUT
            </Button>
          ) : null}

          {user ? (
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
