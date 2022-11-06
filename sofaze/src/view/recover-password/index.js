import * as React from "react";
import { useState } from "react";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useAuthValue } from "../../auth-context";

import Avatar from "@mui/material/Avatar";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/layout";

const theme = createTheme();

export default function RecoverPassword() {
  const [email, setEmail] = React.useState("");
  const [msgType, setMsgType] = React.useState("");
  const [msg, setMsg] = React.useState("");

function recoverPassword() {
    sendPasswordResetEmail(auth, email).then(result => {
        setMsgType("success")
        setMsg("Enviamos um link no seu email para você redefinir a sua senha")
    }).catch(error => {
        setMsgType("error")
        setMsg("Verifique se o email está correto!")
    })
}

  return (
    <Layout>
      <Grid
        className="container"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
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
          item
          xs={12}
          sm={8}
          md={5}
          sx={{ height: "100vh" }}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              mx: 4,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "#f44336" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Recuperar senha
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="button"
                onClick={recoverPassword}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Recuperar senha
              </Button>
              <Grid container mb="10px">
                {msgType === "error" && (
                  <Alert
                    fullWidth
                    severity="error"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      padding: "0 15px",
                      fontSize: "14px",
                    }}
                  >
                    <p>{msg} &#128580;</p>
                  </Alert>
                )}
                 {msgType === "success" && (
                  <Alert
                    fullWidth
                    severity="success"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      padding: "0 15px",
                      fontSize: "14px",
                    }}
                  >
                    <p>{msg} &#128580;</p>
                  </Alert>
                )}
              </Grid>
              <Grid item>
                <Link className="link" to="/login" variant="body2">
                  Voltar para login!
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
