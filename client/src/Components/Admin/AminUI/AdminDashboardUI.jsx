import React, { useEffect, useState } from "react";
import Styles from "./AdminDashboardUI.module.css";
import Navbar from "../AdminNavbar/AdminNavbar";
import AdminSideBar from "../AdminSideBar.jsx/AdminSideBar";
import { UserList } from "../UserList/UserList";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../Redux/Actions/UsersActions";
import TypeComponent from "../Types/Types";
import ProductList from "../ProductsDashboard/ProductsList";
import AllOrders from "../AllOrders/AllOrders";

const AdminDashboardUI = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const [position, setPosition] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    setPosition(e.target.value)
  }
  
  return (
    <div className={Styles.dashboardContainer}>
      <Navbar />
      <div className={Styles.dashboardBody}>
        <div className={Styles.sideContainer}>
          <AdminSideBar handleClick={handleClick}/>
        </div>
        {position === 'prueba' ? 
        <div className={Styles.rightBody}>
        <div className={Styles.rowOne}>
          <div className={Styles.dashboardOne}>Grafico ventas</div>
          <div className={Styles.dashboardOne}>Grafico neto</div>
        </div>
        <div className={Styles.rowTwo}>
          <h4>Nada</h4>
        </div>
      </div> : position === 'users' ?
      <div className={Styles.rightBody}>
      <div className={Styles.rowOne}>
      <h4>Users</h4>
        <UserList />
      </div>
      <div className={Styles.rowTwo}>
          <h4>Nada</h4>
        </div>
      </div> : position === 'products' ?
      <div>
        <ProductList />
      </div> : position === 'orders' ?
      <div>
        <AllOrders />
      </div> :
      null
        }
      </div>
    </div>
  );
};

export default AdminDashboardUI;
