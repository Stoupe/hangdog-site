import { Button } from "@material-ui/core";
import React from "react";
import styles from "../styles/Notes.module.scss";

type NoteProps = {
  content: string;
  by: string;
  date: string;
};

const Note: React.FC<NoteProps> = ({ content, by, date }) => {
  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteMessage}>{content}</div>
      <div className={styles.noteFooter}>
        <div className={styles.noteAuthor}>
          {by} - {date}
        </div>
        <div className={styles.dismissNote}>
          <Button variant="contained">Done</Button>
        </div>
      </div>
    </div>
  );
};

export default Note;
