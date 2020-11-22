import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Bookings.module.scss";
import { UserContext } from "./Contexts";
import firebase from "firebase/app";
import "firebase/firestore";
import { BookingType } from "./Types";
import { add, addDays, format, getDay } from "date-fns";
import { formatDay, formatHour } from "../functions/formatTime";
import { bookingHours } from "./variables";
import { Button } from "@material-ui/core";
import { time } from "console";

const Bookings: React.FC = () => {
  const sampleBooking = {
    bookingId: "LhQlmzK3UsbrcRHbJMyI",
    bookingTime: "5pm",
    numSerious: 0,
    createdAt: { seconds: 1606045996, nanoseconds: 874000000 },
    bookingNotes: "",
    bookingName: "Test",
    totalNumInGym: 4,
    numBelayers: 1,
    numClimbers: 3,
    bookingDate: "23/11/2020",
    numRopes: 1,
    createdBy: "Henry Stoupe",
  };

  const a = {
    "5pm": {
      bookingId: "aS2nfjUWzRUxHi8Mr0Rj",
      bookingTime: "5pm",
      numBelayers: 4,
      numRopes: 5,
      createdAt: { seconds: 1606084615, nanoseconds: 736000000 },
      bookingNotes: "",
      createdBy: "Henry Stoupe",
      bookingName: "Sal",
      numClimbers: 2,
      numSerious: 2,
      bookingDate: "23/11/2020",
      totalNumInGym: 8,
    },
  };

  type DayBookings = {
    "0000"?: BookingType[];
    "0100"?: BookingType[];
    "0200"?: BookingType[];
    "0300"?: BookingType[];
    "0400"?: BookingType[];
    "0500"?: BookingType[];
    "0600"?: BookingType[];
    "0700"?: BookingType[];
    "0800"?: BookingType[];
    "0900"?: BookingType[];
    "1000"?: BookingType[];
    "1100"?: BookingType[];
    "1200"?: BookingType[];
    "1300"?: BookingType[];
    "1400"?: BookingType[];
    "1500"?: BookingType[];
    "1600"?: BookingType[];
    "1700"?: BookingType[];
    "1800"?: BookingType[];
    "1900"?: BookingType[];
    "2000"?: BookingType[];
    "2100"?: BookingType[];
    "2200"?: BookingType[];
    "2300"?: BookingType[];
    "2400"?: BookingType[];
  };

  // let timeData = {};

  // const [data, setData] = useState<[BookingType[]] | []>([]);
  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState({});

  const updateBookingDisplay = () => {
    data.forEach((booking) => {
      const time: string = booking.bookingTime;

      const allBookingsForTime = bookings[time] || [];

      setBookings((prevState) => ({
        ...prevState,
        [time]: [allBookingsForTime],
      }));
    });
  };

  const fetchData = async () => {
    console.log("FETCHING DATA");
    const bookingsRef = firebase.firestore().collection("smallBookings");

    const today = format(new Date(), "dd/MM/yyyy");

    // //TODO: Get bookings on days either side of selected day to speed up loading times
    const bookings = await bookingsRef.where("bookingDate", "==", today).get();

    const bookingArray = [];

    bookings.forEach((doc) => {
      const id: string = doc.id;
      const bookingData = doc.data();

      bookingArray.push({ bookingId: id, ...bookingData });
    });

    setData(bookingArray);

    updateBookingDisplay();
  };

  useEffect(() => {
    updateBookingDisplay();
  }, [data]);

  useEffect(() => {
    fetchData();
    // const interval = setInterval(() => fetchData(), 10000); //TODO: fetches data every 10 seconds, causing too many db reads? Should fetch automatically when a booking is created.

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const renderHour = (hour: number) => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value.bookingTime == formatHour(hour)) {
          // console.log(value);
        }
      });
    }
    return (
      <div className={styles.hourInfo} key={hour}>
        <div className={styles.left}>
          <div className={styles.dot}></div>
          <div className={styles.hour}>{formatHour(hour)}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.groups}>0 groups</div>
          <div className={styles.ropes}>0 ropes</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.outerContainer}>
      <h1 className={styles.containerTitle}>Today</h1>
      <div className={styles.innerContainer}>
        <p>{JSON.stringify(data)}</p>
        <p>{JSON.stringify(bookings)}</p>
        <Button onClick={fetchData}>FETCH DATA</Button>
        {bookingHours[formatDay(getDay(addDays(new Date(), 0)))].map(
          (e: number) => {
            return renderHour(e);
          }
        )}

        {/* {Object.values(data).map((booking: BookingType) => (
          <div className={styles.hourInfo} key={booking.id}>
            <div className={styles.left}>
              <div className={styles.dot}></div>
              <div className={styles.hour}>{booking.bookingTime}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.groups}>{booking.numSerious} serious</div>
              <div className={styles.ropes}>{booking.numRopes} ropes</div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Bookings;
