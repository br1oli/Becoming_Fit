import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchBar/SearchBar.jsx";
import "./NavBar.css";
import title from "../../Utils/Title.png";
import ShopSideBar from "./ShopCart/ShopSideBar.jsx";
import UserSideBar from "./UserMenu/UserMenu.jsx";
import Filters from "../Filters/Filters.jsx";
import { FaBars, FaTimes, FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [clickFilters, setFiltersClick] = useState(false);
  let userStore = useSelector((state) => state.userStore);

  function handleClick() {
    setClick(!click);
  }

  function filtersClick() {
    setFiltersClick(!clickFilters);
  }

  return (
    <nav className="navContainer">
      <div className="topRow">
        <div className="img-container">
          <Link to="/home">
            <img src={title} alt="not found" width={200} height={60} />
          </Link>
        </div>
        <div className="icons-container">
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
            {userStore && userStore.adminPermissions ? (
              <li>
                <Link to="/admin">
                  <FaUserTie size={20} color={'white'}  />
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="filter-icon" onClick={filtersClick}>
        {clickFilters ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>

      <div className="filters-container">
        <ul className={clickFilters ? "filters active" : "filters"}>
          <div className="iconsResponsive">
            <li>
              <SearchInput />
            </li>
            <div className="user-cartResponsive">
              <li>
                <ShopSideBar />
              </li>
              <li>
                <UserSideBar />
              </li>
            </div>
          </div>

          <li>
            <Filters />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
