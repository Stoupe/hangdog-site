import firebase from "firebase";
import React, { useEffect, useState } from "react";
import styles from "../styles/BookingForm.module.scss";

const BookingForm: React.FC = () => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const [currentUser, setCurrentUser] = useState<string>(
    auth.currentUser?.displayName
  );

  const [numSerious, setNumSerious] = useState<number>();
  const [numBelayers, setNumBelayers] = useState<number>();
  const [numClimbers, setNumClimbers] = useState<number>();
  const [numRopes, setNumRopes] = useState<number>();

  const [notes, setNotes] = useState("");

  const makeBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted form");
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
        <p>Current User: {currentUser || "not logged in"}</p>
        <h1>MAKE BOOKING</h1>
        <form
          action="makeBooking"
          onSubmit={(e) => makeBooking(e)}
          className={styles.form}
        >
          <h4>Serious</h4>
          <input
            type="number"
            name="numSerious"
            id="numSeriousInput"
            value={numSerious}
            onChange={(e) => {
              setNumSerious(e.target.valueAsNumber);
            }}
          />
          <h4>Belayers</h4>
          <input
            type="number"
            name="numBelayers"
            id="numBelayersInput"
            value={numBelayers}
            onChange={(e) => {
              setNumBelayers(e.target.valueAsNumber);
            }}
          />
          <h4>Climbers</h4>
          <input
            type="number"
            name="numClimbers"
            id="numClimbersInput"
            value={numClimbers}
            onChange={(e) => {
              setNumClimbers(e.target.valueAsNumber);
            }}
          />
          <h4>Time</h4>
          <input type="datetime-local" name="date" id="date" />
          <button type="submit">Book</button>
        </form>

        <div className="bookingInfo">
          <p>{numRopes} ropes</p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
