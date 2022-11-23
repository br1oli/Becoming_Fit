import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiUserCircle } from "react-icons/hi";
import LoginButton from "../../Auth/LoginButton";
import LogoutButton from "../../Auth/LogoutButton";
import Styles from "./UserMenu.module.css";
import {
  getProductFromFavorites,
} from "../../../Redux/Actions/UsersActions";

function UserMenu({ name, ...props }) {
  ////////// AUTH0///////////////////
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useAuth0();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getProductFromFavorites());
  }, []);

  ////////////////////////////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <HiUserCircle className={Styles.icon} />
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>FILTERS</Offcanvas.Header>
        <Offcanvas.Body className={Styles.bodyContain}>
          <h2>MY ACCOUNT</h2>
          <h2>SETTINGS</h2>
          <Link to="/favorites">
            <h2 className={Styles.userOptions}>FAVORITES</h2>
          </Link>
          <h2>OPTIONS</h2>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function UserSideBar(props) {
  return (
    <>
      <UserMenu placement="end" {...props} />
    </>
  );
} 

export default UserSideBar;
