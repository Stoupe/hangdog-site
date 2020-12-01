import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles/Notes.module.scss";
import Note from "./Note";
import firebase from "firebase/app";
import "firebase/firestore";
import { FirebaseNote } from "./Types";
import AddIcon from "@material-ui/icons/Add";
import { fetchFirebaseData } from "./../functions/useFetch";

const Notes: React.FC = () => {
  const { data: notes, loading } = fetchFirebaseData("staffNotes");

  useEffect(() => {}, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.containerHeader}>
        <h1 className={styles.containerTitle}>Notes</h1>
        <Button>
          <AddIcon />
        </Button>
      </div>
      <div className={styles.innerContainer}>
        {loading && <>loading...</>}
        {notes &&
          notes.map((note: FirebaseNote) =>
            !note.archived ? (
              <Note
                id={note.id}
                content={note.content}
                by={note.by}
                date={note.timestamp.toDate().toDateString()}
              />
            ) : null
          )}
      </div>
    </div>
  );
};

export default Notes;
