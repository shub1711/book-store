import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Avatar, Paper } from "@mui/material";

const UserProfile = () => {
  const { user } = useAuth0();
  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", display: "flex", alignItems: "center" }}
    >
      <Avatar
        src={user.picture}
        alt={user.name}
        style={{ width: "100px", height: "100px" }}
      />
      <div style={{ marginLeft: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {user.email}
        </Typography>
      </div>
    </Paper>
  );
};

export default UserProfile;
