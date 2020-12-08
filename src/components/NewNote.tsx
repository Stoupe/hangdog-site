import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import styles from "../styles/NewNotes.module.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { UserContext } from "./Contexts";

type NewNoteProps = {};

const NewNote: React.FC<NewNoteProps> = () => {
  const firestore = firebase.firestore();
  const [newNoteContent, setNewNoteContent] = useState("");
  const { user, setUser } = useContext(UserContext);

  const addNewNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newNoteContent) return;

    const note = {
      archived: false,
      by: user.displayName,
      content: newNoteContent,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      editHistory: {},
    };

    firestore
      .collection("staffNotes")
      .add(note)
      .then(() => {
        alert("added note to db");
        setNewNoteContent("");
      })
      .catch((e) => {
        console.error(`Error adding booking to db: ${e}`);
      });
  };

  const cancelNewNote = () => {
    setNewNoteContent("");
  };

  return (
    <div className={styles.noteContainer}>
      <form className={styles.newNoteForm} onSubmit={addNewNote}>
        <TextField
          multiline={true}
          className={styles.newNoteInput}
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <div className={styles.buttons}>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={cancelNewNote}
          >
            Cancel
          </Button>
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
          >
            Add Note
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewNote;
