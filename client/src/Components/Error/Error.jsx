import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Error.module.css";

export default function Error({ error }) {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>{error} Oops! Something went wrong</p>
      <Link to={"/home"}>Go back home!</Link>
    </div>
  );
}
