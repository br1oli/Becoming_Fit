import React from "react";
import { Link } from "react-router-dom";
import Styles from "./paymentFailure.module.css";
import Footer from "../../Footer/Footer";
import UserSideBar from "../../NavBar/UserMenu/UserMenu";
import image from "../../../Utils/Title.png";
import logo from "../../../Utils/LogoFondoBlanco.png";

function PaymentFailure() {
  return (
    <div className={Styles.bodyContainer}>
      <div className={Styles.navContainer}>
        <div>
          <img
            src={logo}
            alt="not found"
            width={80}
            height={80}
            className={Styles.title}
          />
        </div>
        <div className={Styles.userMenu}>
          <UserSideBar />
        </div>
      </div>
      <div className={Styles.succesCard}>
        <img
          src={image}
          alt="not found"
          width={180}
          height={60}
          className={Styles.title}
        />
        <h4 className={Styles.slogan}>
          Sport clothings for growing up yourself
        </h4>

        <h2 id={Styles.failure} className={Styles.text}>
          Your purchase payment was rejected!
        </h2>
        <h4 className={Styles.text}>Please try again!</h4>
        <br />
        <Link to="/home">
          <p>Go Home</p>
        </Link>
      </div>
      <div className={Styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default PaymentFailure;
