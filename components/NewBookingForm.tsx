import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/NewBookingForm.module.scss";
import { bookingTimes } from "../types/BookingTimes";
import ClimbingDetails from "./ClimbingDetails";
import { ClimbingDetailsContext, DateContext, UserContext } from "./Contexts";
import DaySelector from "./DaySelector";

// TODO: store current booking in localstorage to save on refresh

const BookingForm: React.FC = () => {
  const firestore = firebase.firestore();

  const { user, setUser } = useContext(UserContext);

  const [bookingDate, setBookingDate] = useState(new Date());

  const [numSerious, setNumSerious] = useState<number>(0);
  const [numBelayers, setNumBelayers] = useState<number>(0);
  const [numClimbers, setNumClimbers] = useState<number>(0);

  const [bookingName, setBookingName] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("10am");

  const [numRopes, setNumRopes] = useState<number>();

  const makeBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: handle bad inputs

    if (!user) {
      alert("please sign in");
      return;
    }

    const booking = {
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      createdBy: user.displayName, //TODO: should be current staff name - easily changeable
      bookingName: bookingName,
      numSerious: numSerious,
      numBelayers: numBelayers,
      numClimbers: numClimbers,
      numRopes: numRopes,
      totalNumInGym: numSerious + numBelayers + numClimbers,
      bookingDate: bookingDate,
      bookingTime: bookingTime, //TODO: fix - parse time to standard format
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
        // alert("added to db");
      })
      .catch((e) => {
        console.error(`Error adding booking to db: ${e}`);
      });
  };

  useEffect(() => {
    const b = numBelayers || 0;
    const s = numSerious || 0;
    const r = Math.round(b + s / 2);
    setNumRopes(r);
  }, [numBelayers, numSerious]);

  return (
    <div className={styles.container}>
      <h1>Booking</h1>
      <form
        action="makeBooking"
        onSubmit={(e) => makeBooking(e)}
        className={styles.form}
      >
        <div className={styles.formContainer}>
          <div className={`${styles.row} ${styles.rowOne}`}>
            <DateContext.Provider value={{ bookingDate, setBookingDate }}>
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
              {bookingTimes.map((e) => {
                let selected = false;
                bookingTime === e ? (selected = true) : (selected = false);

                // TODO: Change colours here dependent on booking availability at that time
                return (
                  <Button
                    key={e}
                    name={e}
                    color={selected ? "primary" : "default"}
                    variant={selected ? "contained" : "text"}
                    onClick={() => setBookingTime(e)}
                  >
                    {e}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className={`${styles.row} ${styles.rowThree}`}>
            <ClimbingDetailsContext.Provider
              value={{
                numSerious,
                numBelayers,
                numClimbers,
                numRopes,
                bookingName,
                bookingNotes,
                setNumSerious,
                setNumBelayers,
                setNumClimbers,
                setNumRopes,
                setBookingName,
                setBookingNotes,
              }}
            >
              <ClimbingDetails />
            </ClimbingDetailsContext.Provider>
          </div>
          <div className={`${styles.row} ${styles.rowFour}`}>
            <Button
              autoCapitalize="false"
              variant="contained"
              color="primary"
              type="submit"
            >
              Book
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
