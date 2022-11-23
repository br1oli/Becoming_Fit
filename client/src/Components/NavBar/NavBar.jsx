import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchInput from "./SearchBar/SearchBar.jsx";
import styles from "./NavBar.module.css";
import title from "../../Utils/Title.png";
import FiltersSideBar from "./FiltersSideBar.jsx";
import ShopSideBar from "./ShopCart/ShopSideBar.jsx";
import UserSideBar from "./UserMenu/UserMenu.jsx";

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <FiltersSideBar />
      <SearchInput />
      <img src={title} alt="not found" width={240} height={80} />
      <ShopSideBar />
      <UserSideBar />
    </nav>
  );
};

export default NavBar;
