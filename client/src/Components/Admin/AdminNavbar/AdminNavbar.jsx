import React, { useState } from 'react'
import Styles from './AdminNavbar.css'
import img from '../../../Utils/logoFondoGris.png'
import AdminSideBar from '../AdminSideBar.jsx/AdminSideBar'
import { FaTimes, FaBars } from 'react-icons/fa'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiShoppingBag } from 'react-icons/hi'
import { Link } from 'react-router-dom'
 

const AdminNavbar = ({handleClick}) => {

  const [click, setClick] = useState(false);

  function handleClick2() {
    setClick(!click);
  }

  

  return (
    <div className='NavContainer'>
       
       <div className='imgContainer' >
         <img src={img} alt="img not found" width={50} height={50}/>
       </div>

       <div className='AdminSideBar'>
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
          <li>
            <br />
            <button className={Styles.buttonsAdmin}>
              <Link to='/home'>
                Back to home
              </Link>
            </button>
          </li>
          </div>

       <div 
       className='hamburgerResponsive'
       onClick={handleClick2}>
          {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
       </div>
       

       <div className='side-container'>
          <ul className={click ? 'navMenu active' : 'navMenu'}>
          <li>
            <button className='buttonsAdmin' onClick={handleClick} value="users">
              <BsFillPersonFill /> Users
            </button>
          </li>
          <br />
          <li>
            <button className='buttonsAdmin' onClick={handleClick} value="products">
              <HiShoppingBag /> Products
            </button>
          </li>
          <li>
            <br />
            <button className='buttonsAdmin'>
              <Link to='/home'>
                Back to home
              </Link>
            </button>
          </li>
          </ul>
       </div>



    </div>
  )
}

export default AdminNavbar