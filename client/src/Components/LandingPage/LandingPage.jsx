import React from "react";
import Title from "../../Utils/Title.png";
import logo from "../../Utils/logoFondoGris.png";
import Style from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
//AUTH0
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={Style.landingContainer}>
      <div className={Style.landingHeader}>
        {/* <div onClick={() => loginWithRedirect({ appState: { returnTo: '/home' } })} className={Style.signIn}/>  */}
        <img src={logo} alt="not found" width={100} height={100} />
        <div className={Style.linkContainter}>
          <Link className={Style.buttomHome} to={"/home"}>
            <FaHome size={30} />
          </Link>
        </div>
      </div>

      <div className={Style.bodyContainer}>
        <div className={Style.becomingFit}>
          <img src={Title} alt='title' width={600} height={250} />
          <h5 className={Style.becomingFitSlogan}>
            Sports clothing for growing up yourself
          </h5>
        </div>

        <div className={Style.loginButtoms}>
          <div className={Style.signInContainer}>
            <div
              onClick={() =>
                loginWithRedirect({ appState: { returnTo: "/home" } })
              }
              className={Style.signIn}
            >
              Sign in
            </div>
          </div>
          <div className={Style.separatorContainer}>
            <h3 className={Style.separator}>|</h3>
          </div>
          <div className={Style.signUpContainer}>
            <Link to="/signup" className={Style.signUp}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
