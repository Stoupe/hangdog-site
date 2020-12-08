import { Button, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles/Notes.module.scss";
import Note from "./Note";
import firebase from "firebase/app";
import "firebase/firestore";
import { FirebaseNote } from "./Types";
import AddIcon from "@material-ui/icons/Add";
import { fetchFirebaseData } from "./../functions/useFetch";
import NewNote from "./NewNote";

const Notes: React.FC = () => {
  const { data: notes, loading } = fetchFirebaseData("staffNotes");

  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.containerHeader}>
        <h1 className={styles.containerTitle}>Notes</h1>
        <Button onClick={() => setAddingNote((prevState) => !prevState)}>
          <AddIcon />
        </Button>
      </div>
      <div className={styles.innerContainer}>
        {addingNote ? <NewNote /> : null}

        {loading && <CircularProgress />}
        {notes &&
          notes.map((note: FirebaseNote) =>
            !note.archived ? (
              <Note
                id={note.id}
                content={note.content}
                by={note.by}
                date={note.timestamp.toDate()}
              />
            ) : null
          )}
      </div>
    </div>
  );
};

export default Notes;
