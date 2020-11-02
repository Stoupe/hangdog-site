import React, { useState } from "react";
import styles from "../styles/index.module.scss";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState("Henry");

  const [numSerious, setNumSerious] = useState(0);
  const [numBelayers, setNumBelayers] = useState(0);
  const [numClimbers, setNumClimbers] = useState(0);

  const [notes, setNotes] = useState("");

  const makeBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted form");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
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
          <button type="submit">Sumbit</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
