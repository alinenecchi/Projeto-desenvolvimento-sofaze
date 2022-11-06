import React from 'react'
import { Link, Typography } from "@mui/material";

export function Footer(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          Sofazê
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }