import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@mui/material";
import { useAuthValue } from "../../auth-context";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "blue",
    fontSize: "20px",
  },
  icon: {
    color: "white",
  },
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { currentUser } = useAuthValue();
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {!currentUser?.emailVerified ? (
            <>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/" className={classes.link}>
                    Home
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/register" className={classes.link}>
                    Cadastrar
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/login" className={classes.link}>
                  Login
                  </Link>
                </ListItemText>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/" className={classes.link}>
                    Home
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/profile" className={classes.link}>
                    Perfil
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
              <Button onClick={() => signOut(auth)} size="small">
                Sair
              </Button>
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.icon}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
