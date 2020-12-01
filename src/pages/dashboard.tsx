import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import BookingForm from "../components/BookingForm";
import { NewBookingContext, UserContext } from "../components/Contexts";
import styles from "../styles/Dashboard.module.scss";
import Router from "next/router";
import Bookings from "../components/Bookings";
import Notes from "./../components/Notes";
import { BookingTypes, Staff } from "../components/Types";

const Dashboard: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const [currentStaff, setCurrentStaff] = useState<Staff>();

  const [bookingType, setBookingType] = useState<BookingTypes>("basic");
  const [bookingDate, setBookingDate] = useState<Date>(new Date());

  const [numSerious, setNumSerious] = useState<number>(0);
  const [numBelayers, setNumBelayers] = useState<number>(0);
  const [numClimbers, setNumClimbers] = useState<number>(0);

  const [bookingName, setBookingName] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");

  const [numRopes, setNumRopes] = useState<number>();

  useEffect(() => {
    if (!user) {
      Router.replace("/");
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <div className={styles.dashboardContainer}>
        <Notes />
        <NewBookingContext.Provider
          value={{
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
          }}
        >
          <BookingForm />
          <Bookings />
        </NewBookingContext.Provider>
      </div>
    </div>
  );
};

export default Dashboard;
