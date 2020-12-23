import { Button } from "@material-ui/core";
import { format } from "date-fns";
import firebase from "firebase/app";
import "firebase/firestore";
import { useSnackbar } from "notistack";
import React from "react";
import styles from "../../styles/dashboard/Notes.module.scss";

type Props = {
  id: string;
  content: string;
  by: string;
  date: Date;
};

const Note: React.FC<Props> = ({ id, content, by, date }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const archiveNote = () => {
    firebase
      .firestore()
      .collection("staffNotes")
      .doc(id)
      .update({
        archived: true,
        timeArchived: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        // console.log("note archived successfully");
        enqueueSnackbar("note archived successfully", { variant: "success" });
      })
      .catch((err) => {
        // console.error("note archive error: " + err);
        enqueueSnackbar(`note archived error: ${err}`, { variant: "error" });
      });
  };

  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteMessage}>{content}</div>
      <div className={styles.noteFooter}>
        <div className={styles.noteAuthor}>
          {by} - {format(date, "dd/MM/yy")}
        </div>
        <div className={styles.dismissNote}>
          <Button variant="contained" onClick={archiveNote}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Note;
