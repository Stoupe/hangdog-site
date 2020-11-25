import { Button } from "@material-ui/core";
import React from "react";
import styles from "../styles/Notes.module.scss";

const Notes: React.FC = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.containerHeader}>
        <h1 className={styles.containerTitle}>Notes</h1>
        <Button variant="contained">+</Button>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.noteContainer}>
          <div className={styles.noteMessage}>
            Code for the shop padlock is 1234
          </div>
          <div className={styles.noteFooter}>
            <div className={styles.noteAuthor}>Henry - 11/11/20</div>
            <div className={styles.dismissNote}>
              <Button variant="contained">Done</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
