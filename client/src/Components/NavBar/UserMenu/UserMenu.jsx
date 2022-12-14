import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../Auth/LoginButton";
import LogoutButton from "../../Auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TuneIcon from "@mui/icons-material/Tune";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { HiUserCircle } from "react-icons/hi";
import Styles from "./UserMenu.module.css";

export default function UserSideBar() {
  //en este sideBar solo se deberian renderizar las opciones si hay un token en el store
  //si no hay un token que solo se muestre el boton de login
  let token = useSelector((state) => state.token);
  ////////// AUTH0///////////////////
  const dispatch = useDispatch();
  const { /* isLoading */ isAuthenticated } = useAuth0();
  /*  const favorites = useSelector((state) => state.favorites); */

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {token.length ? (
          <>
            <Link to="/profile">
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>MY ACCOUNT</ListItemText>
              </ListItemButton>
            </Link>

            <Link to="/favorites">
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText>FAVORITES</ListItemText>
              </ListItemButton>
            </Link>

            <Link to="/myOrders">
              <ListItemButton>
                <ListItemIcon>
                  <LocalMallIcon />
                </ListItemIcon>
                <ListItemText>MY ORDERS</ListItemText>
              </ListItemButton>
            </Link>

            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>SETTINGS</ListItemText>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <TuneIcon />
              </ListItemIcon>
              <ListItemText>OPTIONS</ListItemText>
            </ListItemButton>
          </>
        ) : null}

        <div className={Styles.loginButton}>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <HiUserCircle className={Styles.icon} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
