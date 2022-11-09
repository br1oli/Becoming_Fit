import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchInput from '../COMPONENTS/LandingPage/Search'
import '../navBar/NavBar.css'

const NavBar=()=> {
  return (
 <nav class="navbar navbar-expand-sm bg-primary navbar-dark"> 
  <ul class="navbar-nav">
    <li class="nav-item"><Link class="nav-link" to='/'><span>🎮Landing Page</span></Link></li>
    <li class="nav-item"><Link class="nav-link" to='/home'><span>🏠Home</span></Link></li>
    <li class="nav-item"><Link class="nav-link" to='About'> 💻About</Link></li>
    <SearchInput />
  </ul>
  </nav>
  
  )
}

export default NavBar