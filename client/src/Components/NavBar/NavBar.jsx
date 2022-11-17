import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchInput from "./SearchBar.jsx";
import styles from "./NavBar.module.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCart from "../ShoppCart/ShoppingCart";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function OffCanvas({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Button onClick={toggleShow}>
        <ShoppingCartIcon style={{ fontSize: 35, color: "#f5f5f5" }} />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>YOUR CART</Offcanvas.Header>
        <Offcanvas.Body>
          <ShoppingCart toggleShow={toggleShow} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function SideBar(props) {
  return (
    <>
      <OffCanvas placement="end" {...props} />
    </>
  );
}

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <Link to={"/home"}>
        <HomeIcon style={{ fontSize: 35, color: "#f5f5f5" }} />
      </Link>
      <Link to={"/productForm"}>
        <AddCircleIcon style={{ fontSize: 35, color: "#f5f5f5" }} />
      </Link>
      <h1 className={styles.title}>Becoming Fit</h1>
      <SearchInput />
      <SideBar />
    </nav>
  );
};

export default NavBar;
