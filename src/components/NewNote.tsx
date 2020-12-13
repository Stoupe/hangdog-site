import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import React, { useContext, useRef, useState } from "react";
import styles from "../styles/NewNote.module.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { NotesContext, UserContext } from "./Contexts";
import { useSnackbar } from "notistack";

const NewNote: React.FC = () => {
  const firestore = firebase.firestore();
  const { addingNewNote: visible, setAddingNewNote: setVisible } = useContext(
    NotesContext
  );
  const [newNoteContent, setNewNoteContent] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addNewNote = () => {
    enqueueSnackbar("adding note", { variant: "info" });

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
        enqueueSnackbar("note added", { variant: "success" });
        setNewNoteContent("");
        setVisible(false);
      })
      .catch((e) => {
        //TODO: error messages showing up as snacks is ugly for end user
        enqueueSnackbar(`Error adding booking to database: ${e}`, {
          variant: "error",
        });
      });
  };

  const cancelNewNote = () => {
    setNewNoteContent("");
    setVisible(false);
  };

  return (
    visible && (
      <div className={styles.noteContainer}>
        <form className={styles.newNoteForm}>
          <TextField
            multiline={true}
            onKeyPress={(e) => {
              if (e.key == "Enter" && !e.shiftKey) {
                e.preventDefault();
                addNewNote();
              }
            }}
            className={styles.newNoteInput}
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            required={true}
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
              onPress={addNewNote}
            >
              Add Note
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

export default NewNote;
