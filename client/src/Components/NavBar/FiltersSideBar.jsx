import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Filters from "../Filters/Filters";

function FiltersSideBar({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        <TuneRoundedIcon />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>FILTERS</Offcanvas.Header>
        <Offcanvas.Body>
          <Filters />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function FiltersRender(props) {
  return (
    <>
      <FiltersRender placement="start" {...props} />
    </>
  );
}

export default FiltersSideBar;
