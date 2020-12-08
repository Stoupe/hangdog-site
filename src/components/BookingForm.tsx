import { Button } from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import { format, getDay } from "date-fns";
import firebase from "firebase/app";
import "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { formatDay, formatHour } from "../functions/formatTime";
import styles from "../styles/BookingForm.module.scss";
import BookingDatePicker from "./BookingDatePicker";
import ClimbingDetails from "./ClimbingDetails";
import { NewBookingContext, UserContext } from "./Contexts";
import { bookingHours } from "./variables";

// TODO: store current booking in localstorage to save on refresh

const BookingForm: React.FC = () => {
  const firestore = firebase.firestore();

  const { user, setUser } = useContext(UserContext);

  const {
    bookingType,
    bookingDate,
    bookingTime,
    numSerious,
    numBelayers,
    numClimbers,
    numRopes,
    bookingName,
    bookingNotes,
    setBookingType,
    setBookingDate,
    setBookingTime,
    setNumSerious,
    setNumBelayers,
    setNumClimbers,
    setNumRopes,
    setBookingName,
    setBookingNotes,
  } = useContext(NewBookingContext);

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
      bookingDate: format(bookingDate, "dd/MM/yyyy"),
      bookingTime: bookingTime, //TODO: fix - parse time to standard format
      bookingNotes: bookingNotes,
    };

    addBookingToDB(booking);
    //! addBookingToCal(booking); //add booking to google calendar

    resetForm();
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

  /**
   * Calculate number of ropes needed when numSerious or numBelayers is changed
   */
  useEffect(() => {
    const b = numBelayers || 0;
    const s = numSerious || 0;
    const r = Math.round(b + s / 2);
    setNumRopes(r);
  }, [numBelayers, numSerious]);

  /**
   * Clear the selected booking time when the date is changed
   */
  useEffect(() => {
    setBookingTime(""); //TODO: this should only clear if the day selected doesn't have that time available
  }, [bookingDate]);

  const resetForm = () => {
    setNumSerious(0);
    setNumBelayers(0);
    setNumClimbers(0);
    setBookingDate(new Date());
    setBookingName("");
    setBookingNotes("");
    setBookingTime("");
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.containerHeader}>
        <h1 className={styles.containerTitle}>Booking</h1>
      </div>
      <form
        action="makeBooking"
        onSubmit={(e) => makeBooking(e)}
        className={styles.form}
      >
        <div className={styles.innerContainer}>
          <div className={`${styles.row} ${styles.rowOne}`}>
            <BookingDatePicker />
            {/*TODO: add functionality to buttons */}
            <Button
              className={styles.bookingTypeButton}
              variant="contained"
              color="primary"
            >
              Basic
            </Button>
            <Button className={styles.bookingTypeButton} variant="contained">
              Complex
            </Button>
            <Button className={styles.bookingTypeButton} variant="contained">
              Birthday
            </Button>
          </div>

          <div className={`${styles.row} ${styles.rowTwo}`}>
            <div className={styles.bookingTimes}>
              {bookingHours[formatDay(getDay(bookingDate))].map((e: number) => {
                let selected = false;
                let time = formatHour(e);

                bookingTime === time ? (selected = true) : (selected = false);

                return (
                  <Button
                    className={styles.time}
                    autoCapitalize={""}
                    key={time}
                    name={time}
                    color={selected ? "primary" : "default"}
                    variant={selected ? "contained" : "text"}
                    onClick={() => setBookingTime(time)}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className={`${styles.row} ${styles.rowThree}`}>
            {/* <ClimbingDetailsContext.Provider
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
            > */}
            <ClimbingDetails />
            {/* </ClimbingDetailsContext.Provider> */}
          </div>
          <div className={`${styles.row} ${styles.rowFour}`}>
            <Button color="secondary" variant="contained" onClick={resetForm}>
              <ReplayIcon />
            </Button>
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
