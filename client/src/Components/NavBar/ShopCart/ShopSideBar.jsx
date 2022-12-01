import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { HiShoppingCart } from "react-icons/hi";
import Styles from "./ShopSideBar.module.css";

function OffCanvas({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <div onClick={toggleShow}>
        <HiShoppingCart className={Styles.icon} />
      </div>
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
