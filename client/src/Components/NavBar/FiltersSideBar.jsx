/* import React, { useState } from "react";
import { motion } from "framer-motion";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

function FiltersSideBar() {
  const [show, setShow] = useState(false);
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <>
      <motion.nav
        animate={show ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
      />

      <motion.button
        className="toggle"
        onClick={() => setShow((show) => !show)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        button toggle
      </motion.button>
    </>
  );
}

export default FiltersSideBar; */

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
