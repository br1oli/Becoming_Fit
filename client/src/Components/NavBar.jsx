import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchInput from "./SearchBar.jsx";
import "./Style/NavBar.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <span>🎮Landing Page</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            <span>🏠Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="About">
            {" "}
            💻About
          </Link>
        </li>
        <SearchInput />
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            <span>
              <ShoppingCartIcon />
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
