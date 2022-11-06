import React from "react";
import { Link, Typography, Box, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./footer.css";

const theme = createTheme();

export function Footer(props) {
  return (
    <div className="container-footer">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height={50}>
          <Container justifyContent="center">
            <Typography
              className="typography-footer"
              justifyContent="center"
              align="center"
              {...props}
            >
              {"Copyright © "}
              <Link color="inherit" href="/">
                Sofazê
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
}
