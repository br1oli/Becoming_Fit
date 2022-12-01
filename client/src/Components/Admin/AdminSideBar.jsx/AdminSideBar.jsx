import React from "react";
import { Link } from "react-router-dom";
import Styles from "./AdminSideBar.module.css";
import adminImg from "../../../Utils/Tomas.png";
import { MdDashboard } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { HiShoppingBag } from "react-icons/hi";
import { AiOutlineBars } from "react-icons/ai";
import { IoAddCircleSharp } from "react-icons/io5";

const AdminSideBar = ({handleClick}) => {

  return (
    <div className={Styles.sideBarContainer}>
      <div className={Styles.adminPicContainer}>
        <img src={adminImg} alt="img not found" width={100} height={100} />
        <br />
        <h1 className={Styles.adminName}>Tomás Bartoldi</h1>
      </div>

      <div className={Styles.contentContainer}>
        <ul className={Styles.contentContainer}>
          <br />
          <div>
          <li>
            <button className={Styles.buttonsAdmin} onClick={handleClick} value="users">
              <BsFillPersonFill /> Users
            </button>
          </li>
          <br />
          <li>
            <button className={Styles.buttonsAdmin} onClick={handleClick} value="products">
              <HiShoppingBag /> Products
            </button>
          </li>
          <br />
          <li>
            <button onClick={handleClick} value="orders">
              <AiOutlineBars /> Orders
            </button>
          </li>
          <br />
          <li>
            <br />
            <button className={Styles.buttonsAdmin}>
              <Link to='/home'>
                Back to home
              </Link>
            </button>
          </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
