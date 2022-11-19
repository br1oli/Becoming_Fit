import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ShoppingCart from "../../ShoppCart/ShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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

function ShopSideBar(props) {
  return (
    <>
      <OffCanvas placement="end" {...props} />
    </>
  );
}

export default ShopSideBar;
