import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiUserCircle } from "react-icons/hi";
import LoginButton from "../../Auth/LoginButton";
import LogoutButton from "../../Auth/LogoutButton";
import Styles from "./UserMenu.module.css";

function UserMenu({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        <HiUserCircle />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>FILTERS</Offcanvas.Header>
        <Offcanvas.Body className={Styles.bodyContain}>
          <h2>MY ACCOUNT</h2>
          <h2>SETTINGS</h2>
          <h2>OPTIONS</h2>
          <LoginButton />
          <LogoutButton />
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
