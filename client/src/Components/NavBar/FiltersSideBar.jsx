import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Filters from "../Filters/Filters.jsx";

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
      <FiltersSideBar placement="start" {...props} />
    </>
  );
}

export default FiltersSideBar;

/* import React from "react";
import Accordion from "react-bootstrap/Accordion";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Filters from "../Filters/Filters.jsx";

function FiltersSideBar() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <TuneRoundedIcon />
        </Accordion.Header>
        <Accordion.Body>
          <Filters />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default FiltersSideBar;
 */