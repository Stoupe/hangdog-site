import { Button, CircularProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "firebase/firestore";
import React, { useState } from "react";
import styles from "../styles/Notes.module.scss";
import { fetchFirebaseData } from "./../functions/useFetch";
import NewNote from "./NewNote";
import Note from "./Note";
import { FirebaseNote } from "./Types";

const Notes: React.FC = () => {
  const { data: notes, loading } = fetchFirebaseData("staffNotes", null);
  const [addingNote, setAddingNote] = useState(false);

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
                key={note.id}
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
