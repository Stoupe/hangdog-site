import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import firebase from "firebase/app";
import "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/dashboard/Notes.module.scss";
import { NotesContext } from "../Contexts";
import NewNote from "./NewNote";
import Note from "./Note";
import { FirebaseNote } from "../Types";

const Notes: React.FC = () => {
  const [allNotes, setAllNotes] = useState({});

  const { setAddingNewNote } = useContext(NotesContext);

  useEffect(() => {
    const db = firebase.firestore();
    const query = db.collection("staffNotes").where("archived", "==", false);

    const observer = query.onSnapshot(
      (querySnapshot) => {
        console.log(`Received query snapshot of size ${querySnapshot.size}`);
        const tempNotes = {};
        querySnapshot.docs.forEach((doc) => {
          tempNotes[doc.id] = doc.data();
        });
        setAllNotes(tempNotes);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    return () => {
      observer();
    };
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.containerHeader}>
        <h1 className={styles.containerTitle}>Notes</h1>
        <Button onClick={() => setAddingNewNote(true)}>
          <AddIcon />
        </Button>
      </div>
      <div className={styles.innerContainer}>
        <NewNote />

        {Object.entries(allNotes).map((note: [string, FirebaseNote]) => (
          <Note
            key={note[0]}
            id={note[0]}
            content={note[1].content}
            by={note[1].by}
            date={note[1].timestamp.toDate()}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
