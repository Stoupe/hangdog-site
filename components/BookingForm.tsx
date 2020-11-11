import { Button, TextField } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/BookingForm.module.scss";
import BookingDatePicker from "./BookingDatePicker";
import { UserContext } from "./Contexts";

const BookingForm: React.FC = () => {
  const firestore = firebase.firestore();

  const {
    user,
    setUser,
  }: {
    user: firebase.User;
    setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
  } = useContext(UserContext);

  const [bookingName, setBookingName] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [numSerious, setNumSerious] = useState<number>();
  const [numBelayers, setNumBelayers] = useState<number>();
  const [numClimbers, setNumClimbers] = useState<number>();
  const [numRopes, setNumRopes] = useState<number>();

  const [notes, setNotes] = useState("");

  const makeBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: handle bad inputs

    if (!user) {
      alert("please sign in");
      return;
    }

    const booking = {
      createdAt: Date.now(),
      createdBy: user?.displayName,
      bookingName: bookingName,
      numSerious: numSerious,
      numBelayers: numBelayers,
      numClimbers: numClimbers,
      numRopes: numRopes,
      totalNumInGym: numSerious + numBelayers + numClimbers,
      bookingDateTime: Date.now(), //TODO fix
      bookingNotes: bookingNotes,
    };

    addBookingToDB(booking);
    //! addBookingToCal(booking);
  };

  const addBookingToDB = (booking) => {
    firestore
      .collection("smallBookings")
      .add(booking)
      .then(() => {
        alert("added to db");
      })
      .catch((e) => {
        console.error(`Error adding booking to db: ${e}`);
      });
  };

  useEffect(() => {
    const b = numBelayers || 0;
    const s = numSerious || 0;
    const r = b + s / 2;
    setNumRopes(r);
  }, [numBelayers, numSerious]);

  return (
    <div className={styles.container}>
      <h1>Booking</h1>
      <div className={styles.formContainer}>
        {user ? (
          <>
            <h2>{user?.displayName}</h2>
            <p>{user?.email}</p>
          </>
        ) : (
          <p>not logged in</p>
        )}

        <form
          action="makeBooking"
          onSubmit={(e) => makeBooking(e)}
          className={styles.form}
        >
          <h4>Name</h4>
          <TextField
            variant="filled"
            type="text"
            name="bookingName"
            id="bookingName"
            value={bookingName}
            onChange={(e) => {
              setBookingName(e.target.value);
            }}
          />
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

          <h4>Notes</h4>
          <TextField
            variant="filled"
            type="text"
            name="bookingNotes"
            id="bookingNotes"
            value={bookingNotes}
            onChange={(e) => {
              setBookingNotes(e.target.value);
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
