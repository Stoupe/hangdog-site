import { Button, TextField } from "@material-ui/core";
import firebase from "firebase/app";
// import "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { logIn, logOut } from "../functions/authFunctions";
import styles from "../styles/BookingForm.module.scss";
import BookingDatePicker from "./BookingDatePicker";
import { UserContext } from "./UserContext";

const BookingForm: React.FC = () => {
  // const auth = firebase.auth();
  // const firestore = firebase.firestore();

  const {
    user,
    setUser,
  }: {
    user: firebase.User;
    setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
  } = useContext(UserContext);

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

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const user = await logIn();
            setUser(user);
          }}
        >
          Log In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            const user = await logOut();
            setUser(user);
          }}
        >
          Log Out
        </Button>
        {user ? (
          <>
            <h2>{user?.displayName}</h2>
            <p>{user?.email}</p>
          </>
        ) : (
          <p>not logged in</p>
        )}

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
