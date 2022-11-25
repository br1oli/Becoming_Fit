import React from 'react'
import Styles from './AdminNavbar.module.css'
import { AiOutlineBell } from 'react-icons/ai'
import img from '../../../Utils/logoFondoGris.png'

const AdminNavbar = () => {
  return (
    <div className={Styles.NavContainer}>
       
       <div className={Styles.imgContainer} >
         <img src={img} alt="img not found" width={50} height={50}/>
       </div>

        <div className={Styles.notificationContainer} >
        <AiOutlineBell className={Styles.notification} size={20} color={'white'} />
        </div>

    </div>
  )
}

export default AdminNavbar