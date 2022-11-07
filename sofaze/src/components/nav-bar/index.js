import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "../drawer.js";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const logged = useSelector((state) => state.userLogged);
  console.log(logged);

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.logo}>
          Sófazê
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {logged === 0 ? (
              <>
                <Link to="/" className={classes.link}>
                  Home
                </Link>
                <Link to="/register" className={classes.link}>
                  Cadastrar
                </Link>
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className={classes.link}>
                  Home
                </Link>
                <Link to="/profile" className={classes.link}>
                  Perfil
                </Link>
                <Link to="/register-event" className={classes.link}>
                  Cadastrar evento
                </Link>
                <Link className={classes.link}>
                  <Button onClick={() => signOut(auth)} size="small">
                    Sair
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
