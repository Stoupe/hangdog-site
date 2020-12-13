import { Button, CircularProgress } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ReplayIcon from "@material-ui/icons/Replay";
import {
  addDays,
  format,
  getDay,
  isToday,
  isTomorrow,
  isYesterday
} from "date-fns";
import firebase from "firebase/app";
import "firebase/firestore";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { formatDay, formatHour } from "../functions/formatTime";
import styles from "../styles/Bookings.module.scss";
import { FirebaseBooking } from "./Types";
import { bookingHours } from "./variables";

const Bookings: React.FC = () => {
  const db = firebase.firestore();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [day, setDay] = useState(new Date());
  const [daysBookings, setDaysBookings] = useState({});
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState({});

  useEffect(() => {
    setBookings({});
    setDaysBookings({});
    setLoading(true);
    const date = format(day, "dd-MM-yyyy");
    enqueueSnackbar(`Loading bookings for ${date}`, { variant: "info" });

    const newQuery = db
      .collection("bookings")
      .doc(date)
      .collection("smallBookings");

    const observer = newQuery.onSnapshot(
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          let tempBookings = {};
          querySnapshot.docs.forEach((doc) => {
            tempBookings[doc.id] = doc.data();
          });
          setBookings(tempBookings);
          updateBookingDisplay();
        }
        setLoading(false);
      },
      (err) => {
        enqueueSnackbar(`Error fetching bookings: ${err}`, {
          variant: "error",
        });
      }
    );

    return () => {
      observer();
    };
  }, [day]);

  useEffect(() => {
    updateBookingDisplay();
  }, [bookings]);

  const action = (key: React.ReactText) => (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      <CancelIcon htmlColor="#ffffff" />
    </Button>
  );

  const updateBookingDisplay = () => {
    let tempBookings = {};
    Object.entries(bookings).forEach((booking: [string, FirebaseBooking]) => {
      const time: string = booking[1].bookingTime;
      const id: string = booking[0];

      let allBookingsForTime = {};

      if (tempBookings[time] === undefined) {
        allBookingsForTime = { [id]: booking };
      } else {
        allBookingsForTime = { ...tempBookings[time], [id]: booking };
      }

      tempBookings = { ...tempBookings, [time]: allBookingsForTime };
      setDaysBookings(tempBookings);
    });
  };

  const renderHour = (hour: number) => {
    return (
      <div className={styles.hourInfo} key={hour}>
        <div className={styles.left}>
          <div className={styles.dot}></div>
          <div className={styles.hour}>{formatHour(hour)}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.groups}>
            {!loading ? (
              Object.keys(daysBookings[formatHour(hour)] || {}).length +
              " groups"
            ) : (
              <CircularProgress size="1em" />
            )}
          </div>
          <div className={styles.ropes}>0 ropes</div>
        </div>
      </div>
    );
  };

  const showAllBookings = () => {};

  return (
    <div className={styles.outerContainer}>
      <div className={styles.containerHeader}>
        <h1 className={styles.containerTitle}>
          {isToday(day)
            ? "Today"
            : isTomorrow(day)
            ? "Tomorrow"
            : isYesterday(day)
            ? "Yesterday"
            : format(day, "EEE do")}
        </h1>
        <div className={styles.arrows}>
          <Button
            onClick={() => {
              setDay((prevState) => addDays(prevState, -1));
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            onClick={() => {
              setDay(new Date());
            }}
          >
            <ReplayIcon />
          </Button>
          <Button
            onClick={() => {
              setDay((prevState) => addDays(prevState, 1));
            }}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className={styles.innerContainer}>
        {/* <Button onClick={fetchData}>FETCH DATA</Button> */}

        {bookingHours[formatDay(getDay(day))].map((e: number) => renderHour(e))}
        <Button onClick={showAllBookings}>Show All Bookings</Button>
      </div>
    </div>
  );
};

export default Bookings;
