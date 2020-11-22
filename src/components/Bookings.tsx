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

const Bookings: React.FC = () => {
  // const test: BookingType = {
  //   id: "",
  //   createdAt: null,
  //   bookingDate: "",
  //   bookingName: "string",
  //   bookingNotes: "",
  //   bookingTime: "", //TODO time?
  //   createdBy: "",
  //   numSerious: 1,
  //   numBelayers: 1,
  //   numClimbing: 1,
  //   numRopes: 1,
  //   totalNumInGym: 1,
  // };

  let timeData = {};

  // const [data, setData] = useState<[BookingType[]] | []>([]);
  const [data, setData] = useState([]);

  const updateBookingDisplay = () => {

    data.forEach(booking => {
      const time = booking.bookingTime;

      timeData[time] = {
        
      }
    })

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

      bookingArray.push({ id: id, ...bookingData });
    });

    setData(bookingArray);

    updateBookingDisplay();
  };

  useEffect(() => {
    fetchData();
    // const interval = setInterval(() => fetchData(), 10000); //TODO: fetches data every 10 seconds, causing too many db reads? Should fetch automatically when a booking is created.

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  console.log(data);

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
