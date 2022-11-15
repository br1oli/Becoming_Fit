import React from 'react'
import Style from './LandingPage.module.css'
import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa'

const LandingPage = () => {
  return (
   <div className={Style.landingContainer}>
     
     <div className={Style.landingHeader}>       
         <div className={Style.logoContainer}>
           LOGO
         </div> 
         <div className={Style.linkContainter}>
          <Link className={Style.bottomHome} to={"/home"}>
          <FaHome size={30} />
          </Link>
         </div>
     </div>

     <div className={Style.bodyContainer}>

      <div className={Style.becomingFit}>
      <h1 className={Style.title}>BECOMING FIT</h1>
      </div>
         
         <div className={Style.loginBottoms}>
             <div className={Style.signIn}>
                Sign In
             </div>
             
              <h3 className={Style.separator}>|</h3>
             
             <div className={Style.signUp}>
              Sign Up
             </div>
         </div>
     </div>
   </div>
  )
}

export default LandingPage
