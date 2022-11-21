import React from "react";
import styles from "./Error.module.css";

export default function Error({ error }) {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>{error}</p>
    </div>
  );
}
