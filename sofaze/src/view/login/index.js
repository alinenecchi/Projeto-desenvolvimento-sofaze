import * as React from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "../../auth-context";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./login.css";
import { auth } from "../../config/firebase";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Sofazê 2022
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = React.useState("");

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              setMsgType("sucesso");
              navigate("/verify-email");
            })
            .catch((error) => {
              setMsgType("error");
              switch (error.message) {
                default:
                  setMsg(
                    "Um erro ocorreu. Tente novamente mais tarde!"
                  );
              }
            });
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message);
        setMsgType("error");
        switch (error.message) {
          case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
            setMsg("O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login com falha. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.");
            break;
          case "Firebase: Error (auth/wrong-password).":
            setMsg("Senha inválida");
            break;
          case "Firebase: Error (auth/user-not-found).":
            setMsg(
              "Este usuário não é válido!"
            );
            break;
          case "The email address is already in use by another account":
            setMsg("Este email já está sendo utilizado por outro usuário.");
            break;
          case "Firebase: Error (auth/invalid-email).":
            setMsg("O formato do seu email é inválido!");
            break;
          default:
            setMsg(
              "Não foi possível realizar o login. Tente novamente mais tarde!"
            );
        }
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
              Login
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
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar senha"
              />
              <Button
                type="button"
                onClick={login}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                {msgType === "success" && (
                  <Alert
                    fullWidth
                    severity="success"
                    sx={{
                      width: "100%",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      <strong>WoW! </strong>
                      Você está conectado! &#128512;
                    </p>
                  </Alert>
                )}
                {msgType === "error" && (
                  <Alert
                    fullWidth
                    severity="error"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      <strong>Ops! </strong>
                      {msg} &#128580;
                    </p>
                  </Alert>
                )}
              </Grid>
              <Grid container mt={10}>
                <Grid item xs>
                  <Link className="link" href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="link" to="/register" variant="body2">
                    {"Não tem uma conta? Inscrever-se!"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
