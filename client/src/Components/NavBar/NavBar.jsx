import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchInput from "./SearchBar/SearchBar.jsx";
import styles from "./NavBar.module.css";
import title from "../../Utils/Title.png";
import ShopSideBar from "./ShopCart/ShopSideBar.jsx";
import UserSideBar from "./UserMenu/UserMenu.jsx";

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <img src={title} alt="not found" width={200} height={60} />
      <SearchInput />
      <ShopSideBar />
      <UserSideBar />
    </nav>
  );
};

export default NavBar;