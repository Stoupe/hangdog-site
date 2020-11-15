import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Bookings.module.scss";
import { UserContext } from "./Contexts";
import firebase from "firebase/app";
import "firebase/firestore";
import { BookingType } from "./Types";

const Bookings: React.FC = () => {
  const [data, setData] = useState<BookingType | {}>({});

  const fetchData = async () => {
    const bookingsRef = firebase.firestore().collection("smallBookings");

    const bookings = await bookingsRef.get(); //TODO get bookings only from certain day (default today) with firebase query

    bookings.forEach((doc) => {
      const id: string = doc.id;
      const bookingData = doc.data();

      if (id in data) {
        console.log("id already in data");
      } else {
        setData((prevState) => ({
          ...prevState,
          [id]: { id: id, ...bookingData },
        }));
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => fetchData(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.outerContainer}>
      <h1 className={styles.containerTitle}>Today</h1>
      <div className={styles.innerContainer}>
        {Object.values(data).map((booking: BookingType) => (
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
        ))}
      </div>
    </div>
  );
};

export default Bookings;
