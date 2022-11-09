import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// import '../css/NavBar.css'

const NavBar=()=> {
  return (
 <nav class="navbar navbar-dark bg-dark"> 
  <ul>
    <li><Link className='nav-item' to='/'><span>🎮Landing Page</span></Link></li>
    <li><Link className='nav-item' to='/home'><span>🏠Home</span></Link></li>
    <li><Link className='nav-item' to='About'> 💻About</Link></li>
  </ul>
  </nav>


  )
}

export default NavBar