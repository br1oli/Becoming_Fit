import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Filters from "../Filters/Filters";
import Styles from "./FiltersSideBar/FiltersSideBar.module.css";

function FiltersSideBar({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <TuneRoundedIcon className={Styles.icon} />
      </div>
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
