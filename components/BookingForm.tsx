import { Button, TextField } from "@material-ui/core";
import firebase from "firebase";
import "firebase/auth";
import React, { useEffect, useState } from "react";
import styles from "../styles/BookingForm.module.scss";
import BookingDatePicker from "./BookingDatePicker";

const BookingForm: React.FC = () => {
  const auth = firebase.auth();
  // const firestore = firebase.firestore();

  const [currentUser, setCurrentUser] = useState<firebase.User>();

  const [numSerious, setNumSerious] = useState<number>();
  const [numBelayers, setNumBelayers] = useState<number>();
  const [numClimbers, setNumClimbers] = useState<number>();
  const [numRopes, setNumRopes] = useState<number>();

  const [notes, setNotes] = useState("");

  const makeBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted form");
    alert("submitted");
  };

  useEffect(() => {
    const b = numBelayers || 0;
    const s = numSerious || 0;
    const r = b + s / 2;
    setNumRopes(r);
  }, [numBelayers, numSerious]);

  const logIn = () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      setCurrentUser(auth.currentUser);
    });
  };

  const logOut = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Button variant="contained" color="primary" onClick={logIn}>
          Log In
        </Button>
        <Button variant="contained" color="secondary" onClick={logOut}>
          Log Out
        </Button>
        <p>Current User: {currentUser?.displayName || "not logged in"}</p>
        <h1>Make Booking</h1>
        <form
          action="makeBooking"
          onSubmit={(e) => makeBooking(e)}
          className={styles.form}
        >
          <h4>Serious</h4>
          <TextField
            variant="filled"
            type="number"
            name="numSerious"
            id="numSeriousInput"
            value={numSerious}
            onChange={(e) => {
              setNumSerious(+e.target.value);
            }}
          />

          <h4>Belayers</h4>
          <TextField
            variant="filled"
            type="number"
            name="numBelayers"
            id="numBelayersInput"
            value={numBelayers}
            onChange={(e) => {
              setNumBelayers(+e.target.value);
            }}
          />
          <h4>Climbers</h4>
          <TextField
            variant="filled"
            type="number"
            name="numClimbers"
            id="numClimbersInput"
            value={numClimbers}
            onChange={(e) => {
              setNumClimbers(+e.target.value);
            }}
          />

          <h4>Time</h4>
          <BookingDatePicker />
          {/* <button type="submit">Book</button> */}
          <Button variant="contained" color="primary" type="submit">
            Book
          </Button>
        </form>

        <div className="bookingInfo">
          <p>{numRopes} ropes</p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
