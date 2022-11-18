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
          <Link className={Style.buttomHome} to={"/home"}>
          <FaHome size={30} />
          </Link>
         </div>
     </div>

    <div className={Style.bodyContainer}>
      <div className={Style.becomingFit}>
      <h1 className={Style.becomingFitTitle}>BECOMING FIT</h1>
      <h5 className={Style.becomingFitSlogan}>Sports clothing for growing up yourself</h5>
    </div>
    

         <div className={Style.loginButtoms}>
             <div className={Style.signInContainer}>
             <Link to='signin' className={Style.signIn}>
                Sign in
                {/* SIGN IN */}
             </Link>
             </div>  
             <div className={Style.separatorContainer}>
              <h3 className={Style.separator}>|</h3>
              </div>
              <div className={Style.signUpContainer}>
             <Link to='/signup' className={Style.signUp}>
              Sign up
              {/* SIGN UP */}
             </Link>
             </div>
         </div>
     </div>
   </div>
  )
}

export default LandingPage
