import React from 'react'
import Styles from './AdminSideBar.module.css'
import adminImg from '../../../Utils/Tomas.png'
import { MdDashboard } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiShoppingBag } from 'react-icons/hi'
import { RiAccountCircleFill } from 'react-icons/ri'
import { IoAddCircleSharp } from 'react-icons/io5'


const AdminSideBar = () => {
  return (
    <div className={Styles.sideBarContainer}>
      
      <div className={Styles.adminPicContainer}>
          <img src={adminImg} alt="img not found" width={100} height={100} />
          <br />
          <h1 className={Styles.adminName}>Tomás Bartoldi</h1>
      </div>

      <div className={Styles.contentContainer}>
         <ul>
          <li><MdDashboard /> Dashboard</li>
          <br />
          <li><BsFillPersonFill /> Customers</li>
          <br />
          <li><HiShoppingBag /> Products</li>
          <br />
          <li><RiAccountCircleFill /> Account</li>
          <br />
          <li><IoAddCircleSharp /> Register Admins</li>
         </ul>
      </div>

    </div>
  )
}

export default AdminSideBar