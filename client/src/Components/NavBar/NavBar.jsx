import React from "react";
import { NavLink, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchInput from "./SearchBar/SearchBar.jsx";
import styles from "./NavBar.module.css";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import logo from "../../Utils/logoFondoGris.png";
import title from "../../Utils/Title.png";
import FiltersSideBar from "./FiltersSideBar.jsx";
import ShopSideBar from "./ShopCart/ShopSideBar.jsx";
import UserSideBar from "./UserMenu/UserMenu.jsx";
import FavoriteIcon from '@material-ui/icons/Favorite';

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <img src={logo} alt="not found" width={80} height={80} />
      <FiltersSideBar />
      <Link to={"/home"}>
        <HomeIcon style={{ fontSize: 35, color: "#f5f5f5" }} />
      </Link>
      <Link to={"/productForm"}>
        <AddCircleIcon style={{ fontSize: 35, color: "#f5f5f5" }} />
      </Link>
      <img src={title} alt="not found" width={240} height={80} />
      <SearchInput />
      <ShopSideBar />
      <UserSideBar />
      <NavLink to={"/favorites"}>
        <FavoriteIcon style={{ fontSize: 35, color: "#f5f5f5" }} />
      </NavLink>
    </nav>
  );
};

export default NavBar;
