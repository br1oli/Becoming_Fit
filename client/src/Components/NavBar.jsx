import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchInput from "./SearchBar.jsx";
import styles from "./Style/NavBar.module.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
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
      <ShoppingCartIcon style={{ fontSize: 35, color: "#f5f5f5" }} />
    </nav>
  );
};

export default NavBar;
