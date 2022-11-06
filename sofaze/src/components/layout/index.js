import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Navbar from "../../components/nav-bar";

const theme = createTheme();

export default function Layout(props) {
  const { className = "", children, ...other } = props;
  return (
    <div className={`${className}`} {...other}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </div>
  );
}
