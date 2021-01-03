import { Button, TextField } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import styles from "../../styles/dashboard/NewNote.module.scss";
import { NotesContext, UserContext } from "../Contexts";
import { AnimatePresence, motion } from "framer-motion";

const NewNote: React.FC = () => {
  const firestore = firebase.firestore();
  const { addingNewNote: visible, setAddingNewNote: setVisible } = useContext(
    NotesContext
  );
  const [newNoteContent, setNewNoteContent] = useState("");
  const { user } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

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
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.noteContainer}
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: "0" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <form
            className={styles.newNoteForm}
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              autoFocus={true}
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
                onClick={addNewNote}
              >
                Add Note
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewNote;
