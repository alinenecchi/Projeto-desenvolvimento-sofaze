import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "../../auth-context";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../config/firebase";

import { useDispatch } from "react-redux";

import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Footer } from "../../components/footer";

import "./login.css";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = React.useState("");

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, values?.password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              setMsgType("sucesso");
              dispatch({ type: "LOG_IN", userEmail: email });
              navigate("/verify-email");
            })
            .catch((error) => {
              setMsgType("error");
              switch (error.message) {
                default:
                  setMsg("Um erro ocorreu. Tente novamente mais tarde!");
              }
            });
        } else {
          dispatch({ type: "LOG_IN", userEmail: email });
          navigate("/");
        }
      })
      .catch((error) => {
        setMsgType("error");
        switch (error.message) {
          case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
            setMsg(
              "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login com falha. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde."
            );
            break;
          case "Firebase: Error (auth/wrong-password).":
            setMsg("Senha inválida");
            break;
          case "Firebase: Error (auth/user-not-found).":
            setMsg("Este usuário não é válido!");
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
              <FormControl
                margin="normal"
                required
                fullWidth
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
              </FormControl>

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
                      fontSize: "12px",
                    }}
                  >
                    <p>
                      <strong>Ops! </strong>
                      {msg} &#128580;
                    </p>
                  </Alert>
                )}
              </Grid>
              <Grid className="container-link">
                <Link className="link" to="/recover-password" variant="body2">
                  Esqueceu a senha?
                </Link>

                <Link className="link" to="/register" variant="body2">
                  {"Não tem uma conta? Inscrever-se!"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}
