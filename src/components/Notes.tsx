import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles/Notes.module.scss";
import Note from "./Note";
import firebase from "firebase/app";
import "firebase/firestore";
import { FirebaseNote } from "./Types";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    console.log("FETCHING NOTES");
    const bookingsRef = firebase.firestore().collection("staffNotes");
    const notes = await bookingsRef.where("archived", "==", false).get();

    let asdf = [];
    notes.forEach((doc) => {
      asdf.push(doc.data());
    });
    setNotes(asdf);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.containerHeader}>
        <h1 className={styles.containerTitle}>Notes</h1>
        <Button variant="contained">+</Button>
      </div>
      <div className={styles.innerContainer}>
        {notes.map((note: FirebaseNote) => (
          <Note
            content={note.content}
            by={note.by}
            date={note.timestamp.toDate().toDateString()}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
