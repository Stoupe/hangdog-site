import { Button, PropTypes } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/NewBookingForm.module.scss";
import { BookingTimes, bookingTimes } from "../types/BookingTimes";
import { DateContext } from "./DateContext";
import DaySelector from "./DaySelector";
import { UserContext } from "./UserContext";

// TODO: store current booking in localstorage to save on refresh

const BookingForm: React.FC = () => {
  const firestore = firebase.firestore();

  const {
    user,
    setUser,
  }: {
    user: firebase.User;
    setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
  } = useContext(UserContext);

  const [day, setDay] = useState();

  const [bookingName, setBookingName] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<BookingTimes>();
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
        <div className={`${styles.row} ${styles.rowOne}`}>
          <DateContext.Provider value={{ day, setDay }}>
            <DaySelector />
          </DateContext.Provider>

          <Button variant="contained" color="primary">
            Basic
          </Button>
          <Button variant="contained">Complex</Button>
          <Button variant="contained">Birthday</Button>
        </div>
        <div className={`${styles.row} ${styles.rowTwo}`}>
          <div className={styles.bookingTimes}>
            {bookingTimes.map((e: BookingTimes) => {
              let col: PropTypes.Color = "default";
              bookingTime === e ? (col = "primary") : (col = "default");
              // TODO: Change colours here dependent on booking availability at that time
              return (
                <Button
                  name={e}
                  color={col}
                  onClick={() => {
                    const time = e;
                    setBookingTime(time);
                  }}
                >
                  {e}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
