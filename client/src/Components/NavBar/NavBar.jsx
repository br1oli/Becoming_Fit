import React, { useState } from "react";
import SearchInput from "./SearchBar/SearchBar.jsx";
import "./NavBar.css";
import title from "../../Utils/Title.png";
import ShopSideBar from "./ShopCart/ShopSideBar.jsx";
import UserSideBar from "./UserMenu/UserMenu.jsx";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [click, setClick] = useState(false);

  function handleClick() {
    setClick(!click);
  }

  return (
    <nav className="navContainer">
      <img src={title} alt="not found" width={200} height={60} />

      <ul className={click ? "navMenu active" : "navMenu"}>
        <li>
          <SearchInput />
        </li>
        <li>
          <ShopSideBar />
        </li>
        <li>
          <UserSideBar />
        </li>
      </ul>

      <div className="hamburguer" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
