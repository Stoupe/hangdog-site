import React from "react";
import styles from "../styles/Notes.module.scss";

const Notes: React.FC = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.containerHeader}>
        <h1 className={styles.containerTitle}>Notes</h1>
      </div>
      <div className={styles.innerContainer}></div>
    </div>
  );
};

export default Notes;
