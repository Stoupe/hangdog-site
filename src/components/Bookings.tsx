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
  isYesterday,
} from "date-fns";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { formatDay, formatHour } from "../functions/formatTime";
import { fetchFirebaseData } from "../functions/useFetch";
import styles from "../styles/Bookings.module.scss";
import { bookingHours } from "./variables";
import { fetchFirebaseDataNew } from "./../functions/useFetch";

const Bookings: React.FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [day, setDay] = useState(new Date());
  const [daysBookings, setDaysBookings] = useState({});
  const [loading, setLoading] = useState(true);

  // let { data: bookings, loading } = fetchFirebaseData("smallBookings", [
  //   "bookingDate",
  //   "==",
  //   format(day, "dd/MM/yyyy"),
  // ]);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setLoading(true);
    enqueueSnackbar(`Loading bookings for ${day}`, { variant: "info" });
    fetchFirebaseDataNew("smallBookings", [
      "bookingDate",
      "==",
      format(day, "dd/MM/yyyy"),
    ])
      .then((newData) => {
        setLoading(false);
        enqueueSnackbar(`Fetched Bookings`, {
          variant: "success",
        });
        setBookings(newData);
      })
      .catch((err) => {
        //TODO: error messages showing up as snacks is ugly for end user
        enqueueSnackbar(`Error fetching bookings: ${err}`, {
          variant: "error",
        });
      });
  }, [day]);

  useEffect(() => {
    //TODO figure out a way to automatically fetch data when new booking is created without too many db reads
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
    if (!bookings) return;

    // if (loading) return;
    // enqueueSnackbar("updating bookings display", {
    //   variant: "info",
    //   autoHideDuration: 2000,
    //   action,
    // });

    let tempBookings = {};

    bookings.forEach((booking) => {
      const time: string = booking.bookingTime;
      const id: string = booking.bookingId;

      let allBookingsForTime = {};

      // console.log("bookings[time]");
      // console.log(tempBookings[time]);

      if (tempBookings[time] === undefined) {
        allBookingsForTime = { [id]: booking };
      } else {
        allBookingsForTime = { ...tempBookings[time], [id]: booking };
      }

      tempBookings = { ...tempBookings, [time]: allBookingsForTime };

      // console.log("bookings after");
      // console.log(tempBookings);
    });

    // console.log(day);
    // console.log(tempBookings);
    setDaysBookings(tempBookings);
  };

  // useEffect(() => {
  //   console.log(day);
  //   setDaysBookings({});
  // }, [day]);

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
        {!loading ? (
          <>
            {bookingHours[formatDay(getDay(day))].map((e: number) =>
              renderHour(e)
            )}
            <Button onClick={showAllBookings}>Show All Bookings</Button>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Bookings;
