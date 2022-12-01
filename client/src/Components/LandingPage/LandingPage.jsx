import React from "react";
import Title from "../../Utils/Title.png";
import logo from "../../Utils/logoFondoGris.png";
import Style from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
//AUTH0
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    const redireccionar = async () => {
      try {
        if (isAuthenticated) {
          history.push("/home");
        } else {
          console.log("NO ESTA AUTENTICADO");
        }
      } catch (error) {
        console.log(error);
      }
    };
    redireccionar();
  });

  return (
    <div className={Style.landingContainer}>
      <div className={Style.landingHeader}>
        <img
          className={Style.logo}
          src={logo}
          alt="not found"
          width={100}
          height={100}
        />
        <div className={Style.linkContainter}>
          <Link className={Style.buttomHome} to={"/home"}>
            <FaHome size={30} />
          </Link>
        </div>
      </div>

      <div className={Style.bodyContainer}>
        <div className={Style.becomingFit}>
          <img
            className={Style.title}
            src={Title}
            alt="title"
            width={600}
            height={250}
          />
          <h5 className={Style.becomingFitSlogan}>
            Sports clothing for growing up yourself
          </h5>
        </div>

        <div className={Style.loginButtoms}>
          <div
            onClick={() =>
              loginWithRedirect({ appState: { returnTo: "/home" } })
            }
            className={Style.signIn}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
