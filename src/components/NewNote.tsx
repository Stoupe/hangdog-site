import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import React, { useState } from "react";
import styles from "../styles/NewNotes.module.scss";
import firebase from "firebase/app";
import "firebase/firestore";

type NewNoteProps = {};

const NewNote: React.FC<NewNoteProps> = () => {
  const [newNoteContent, setNewNoteContent] = useState("");

  const addNewNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("hi");
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
