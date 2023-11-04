import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <Button
        size="large"
        variant="contained"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </Button>
    </div>
  );
}
