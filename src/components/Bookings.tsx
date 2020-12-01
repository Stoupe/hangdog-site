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
import React, { useEffect, useState } from "react";
import { formatDay, formatHour } from "../functions/formatTime";
import styles from "../styles/Bookings.module.scss";
import { bookingHours } from "./variables";
import ReplayIcon from "@material-ui/icons/Replay";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Bookings: React.FC = () => {
  const [day, setDay] = useState(new Date());
  // const [data, setData] = useState([]);
  const [bookings, setBookings] = useState({});

  const updateBookingDisplay = (data: any[]) => {
    let tempBookings = {};

    data.forEach((booking) => {
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

    setBookings(tempBookings);
  };

  //! REFACTOR TO USE GENERIC FIREBASE FETCHING FUNCTION
  //TODO: make this function accessible throughout the app
  const fetchData = async () => {
    console.log("FETCHING DATA");
    const bookingsRef = firebase.firestore().collection("smallBookings");

    // //TODO: Get bookings on days either side of selected day to speed up loading times
    const bookings = await bookingsRef
      .where("bookingDate", "==", format(day, "dd/MM/yyyy"))
      .get();

    const bookingArray = [];

    bookings.forEach((doc) => {
      const id: string = doc.id;
      const bookingData = doc.data();

      bookingArray.push({ bookingId: id, ...bookingData });
    });

    updateBookingDisplay(bookingArray);
  };

  useEffect(() => {
    fetchData();
    //TODO figure out a way to automatically fetch data when new booking is created without too many db reads
    // const interval = setInterval(() => fetchData(), 10000);

    // return () => {
    //   clearInterval(interval);
    // };
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
            {Object.keys(bookings[formatHour(hour)] || {}).length} groups
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
