import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error.module.css";
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'



export default function Error({ error }) {
  return (
    <>
    <Navbar />
    <div className={styles.bodyContainer}>
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>{error} Oops! Something went wrong</p>
      <Link className="like" to="/home">Go back home!</Link>
    </div>
    </div>
    <Footer />
    </>
  );
}
