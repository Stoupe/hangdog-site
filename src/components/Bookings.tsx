import { Button } from "@material-ui/core";
import {
  addDays,
  format,
  getDay,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";
import firebase from "firebase/app";
import "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { formatDay, formatHour } from "../functions/formatTime";
import styles from "../styles/Bookings.module.scss";
import { bookingHours } from "./variables";
import ReplayIcon from "@material-ui/icons/Replay";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { fetchFirebaseData } from "../functions/useFetch";
import { useSnackbar } from "notistack";
import CancelIcon from "@material-ui/icons/Cancel";

const Bookings: React.FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [day, setDay] = useState(new Date());
  // const [data, setData] = useState([]);
  const { data: bookings, loading } = fetchFirebaseData("staffNotes", [
    "bookingDate",
    "==",
    format(day, "dd/MM/yyyy"),
  ]);

  const [daysBookings, setDaysBookings] = useState({});

  const action = (key) => (
    <Button
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      <CancelIcon htmlColor="#ffffff" />
    </Button>
  );

  const updateBookingDisplay = () => {
    if (loading) return;
    enqueueSnackbar("updating bookings display", {
      variant: "info",
      autoHideDuration: 2000,
      action,
    });

    console.log("UPDATING BOOKINGS DISPLAY, BOOKINGS:");
    console.log(bookings);

    let tempBookings = {};

    bookings.forEach((booking) => {
      const time: string = booking.bookingTime;
      const id: string = booking.bookingId;

      let allBookingsForTime = {};

      console.log("bookings[time]");
      console.log(tempBookings[time]);
      if (tempBookings[time] === undefined) {
        allBookingsForTime = { [id]: booking };
      } else {
        // if (bookings[time].includes(id))
        allBookingsForTime = { ...tempBookings[time], [id]: booking };
      }

      tempBookings = { ...tempBookings, [time]: allBookingsForTime };

      console.log("bookings after");
      console.log(tempBookings);
    });

    setDaysBookings(tempBookings);
  };

  useEffect(() => {
    // fetchData();
    //TODO figure out a way to automatically fetch data when new booking is created without too many db reads
    // const interval = setInterval(() => fetchData(), 10000);

    // return () => {
    //   clearInterval(interval);
    // };
    updateBookingDisplay();
  }, [day]);

  const renderHour = (hour: number) => {
    return (
      <div className={styles.hourInfo} key={hour}>
        <div className={styles.left}>
          <div className={styles.dot}></div>
          <div className={styles.hour}>{formatHour(hour)}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.groups}>
            {Object.keys(daysBookings[formatHour(hour)] || {}).length} groups
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
        {bookingHours[formatDay(getDay(day))].map((e: number) => {
          return renderHour(e);
        })}
        <Button onClick={showAllBookings}>Show All Bookings</Button>
      </div>
    </div>
  );
};

export default Bookings;
