import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "./payments.module.css";
import Footer from "../../Footer/Footer";
import image from "../../../Utils/TitleGris.png";
import logo from "../../../Utils/LogoFondoBlanco.png";
import UserSideBar from "../../NavBar/UserMenu/UserMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  clearCartInDb,
  getOrder,
  postMail,
  saveOrder,
} from "../../../Redux/Actions/UsersActions";
import { useAuth0 } from "@auth0/auth0-react";
import {
  deleteStorage,
  getStorage,
} from "../../../localStorage/localStorageFunctions";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const userEmail = useSelector((state) => state.userStore);
  const cartId = getStorage("cartId");
  let orderData = getStorage("userOrder");

  useEffect(() => {
    const orderCreator = async () => {
      if (userEmail.email) {
        await dispatch(saveOrder(userEmail.email, orderData));
        await dispatch(getOrder(userEmail.email));
        dispatch(postMail(userEmail?.email));
      }
    };
    orderCreator();
    return () => {
      dispatch(clearCartInDb(cartId));
      dispatch(clearCart());
      deleteStorage("cartId");
      deleteStorage("userOrder");
    };
  }, [userEmail]);

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
          Your payment was made successfully!
        </h2>
        <h4 className={Styles.text}>Thank you very much for your purchase</h4>

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

export default PaymentSuccess;
