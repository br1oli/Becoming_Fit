import React from "react";
import styles from "./Success.module.css";

export default function Success({ success }) {
  return (
    <div className={styles.successContainer}>
      <p className={styles.successText}>{success}</p>
    </div>
  );
}
