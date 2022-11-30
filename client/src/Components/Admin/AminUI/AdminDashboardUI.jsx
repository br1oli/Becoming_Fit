import React, { useEffect } from "react";
import Styles from "./AdminDashboardUI.module.css";
import Navbar from "../AdminNavbar/AdminNavbar";
import AdminSideBar from "../AdminSideBar.jsx/AdminSideBar";
import { Customers } from "../Customers/Customers";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../Redux/Actions/UsersActions";
import TypeComponent from "../Types/Types";

/* import img1 from '../../../Utils/ */

const AdminDashboardUI = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className={Styles.dashboardContainer}>
      <Navbar />
      <div className={Styles.dashboardBody}>
        <div className={Styles.sideContainer}>
          <AdminSideBar />
        </div>

        <div className={Styles.rightBody}>
          <div className={Styles.rowOne}>
            <div className={Styles.dashboardOne}><TypeComponent/> </div>
            <div className={Styles.dashboardOne}>Grafico ventas</div>
            <div className={Styles.dashboardOne}>Grafico neto</div>
          </div>

          <div className={Styles.rowTwo}>
            <h4>Users</h4>
            <Customers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUI;
