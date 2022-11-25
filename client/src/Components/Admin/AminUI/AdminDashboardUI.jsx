import React from 'react'
import Styles from './AdminDashboardUI.module.css'
import Navbar from '../AdminNavbar/AdminNavbar'
import AdminSideBar from '../AdminSideBar.jsx/AdminSideBar'
/* import img1 from '../../../Utils/ */


const AdminDashboardUI = () => {
  return (
      <div className={Styles.dashboardContainer}>
        <Navbar />
      <div className={Styles.dashboardBody}>
        
      <div className={Styles.sideContainer}>
        <AdminSideBar />
      </div>

      <div className={Styles.rightBody}>

         <div className={Styles.rowOne}>
          <div className={Styles.dashboardOne}> </div>
          <div className={Styles.dashboardOne}>Grafico ventas</div>
          <div className={Styles.dashboardOne}>Grafico neto</div>
          
         </div>

         <div className={Styles.rowTwo} ></div>
      </div>

      </div>
          
    </div>
  )
}

export default AdminDashboardUI