import { useAuthValue } from "../../auth-context";
import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

import "./verifyEmail.css";

const theme = createTheme();

function VerifyEmail() {
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(60);
  const { timeActive, setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate("/");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="container"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          className="container"
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Avatar sx={{ bgcolor: "#f44336", width: "70px", height: "70px" }}>
              <MarkEmailReadOutlinedIcon
                sx={{ width: "40px", height: "40px" }}
              />
            </Avatar>

            <Typography component="h1" variant="h5" textAlign="center">
              Verifique seu endereço de e-mail
            </Typography>
            <Grid container mb="10px" justifyContent="center">
              <Typography component="p" fontWeight={600} textAlign="center">
                Um e-mail de verificação foi enviado para:
              </Typography>
              <Typography component="span" color="#42a5f5" textAlign="center">
                {currentUser?.email}
              </Typography>
            </Grid>
            <Typography component="p" textAlign="center">
              Siga as instruções no e-mail para verificar sua conta!
            </Typography>
            <Button
              type="button"
              onClick={resendEmailVerification}
              disabled={timeActive}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reenviar email {timeActive && time}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default VerifyEmail;
