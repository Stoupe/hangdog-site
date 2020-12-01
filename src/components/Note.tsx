import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styles from "../styles/Notes.module.scss";
import firebase from "firebase/app";
import "firebase/firestore";

type NoteProps = {
  id: string;
  content: string;
  by: string;
  date: string;
};

const Note: React.FC<NoteProps> = ({ id, content, by, date }) => {
  const archiveNote = () => {
    firebase
      .firestore()
      .collection("staffNotes")
      .doc(id)
      .update({
        archived: true,
        timeArchived: Date.now(),
      })
      .then(() => {
        console.log("note archived successfully");
      })
      .catch((err) => {
        console.error("note archive error: " + err);
      });
  };

  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteMessage}>{content}</div>
      <div className={styles.noteFooter}>
        <div className={styles.noteAuthor}>
          {by} - {date}
        </div>
        <div className={styles.dismissNote}>
          <Button variant="contained" onClick={archiveNote}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Note;
