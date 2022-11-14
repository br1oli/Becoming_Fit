import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchInput from "./SearchBar.jsx";
import styles from "./Style/NavBar.module.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCart from "./ShoppingCart.jsx";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";

const options = [
  {
    name: "Enable backdrop (default)",
    scroll: false,
    backdrop: true,
  },
  {
    name: "Disable backdrop",
    scroll: false,
    backdrop: false,
  },
  {
    name: "Enable body scrolling",
    scroll: true,
    backdrop: false,
  },
  {
    name: "Enable both scrolling & backdrop",
    scroll: true,
    backdrop: true,
  },
];

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
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <ShoppingCart />
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
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
