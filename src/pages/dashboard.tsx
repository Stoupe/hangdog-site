import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  NewBookingContext,
  NotesContext,
  UserContext,
} from "../components/Contexts";
import BookingForm from "../components/Dashboard/BookingForm";
import Bookings from "../components/Dashboard/Bookings";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Notes from "../components/Dashboard/Notes";
import { BookingTypes } from "../components/Types";
import styles from "../styles/dashboard/Dashboard.module.scss";

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext);

  // const [currentStaff, setCurrentStaff] = useState<Staff>();

  const [bookingType, setBookingType] = useState<BookingTypes>("basic");
  const [bookingDate, setBookingDate] = useState<Date>(new Date());

  const [numSerious, setNumSerious] = useState<number>(0);
  const [numBelayers, setNumBelayers] = useState<number>(0);
  const [numClimbers, setNumClimbers] = useState<number>(0);

  const [bookingName, setBookingName] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");

  const [numRopes, setNumRopes] = useState<number>();

  const [addingNewNote, setAddingNewNote] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      Router.replace("/");
    }
  }, []);

  return (
    user && (
      <div className={styles.dashboard}>
        <DashboardHeader />
        <div className={styles.dashboardContainer}>
          <NotesContext.Provider value={{ addingNewNote, setAddingNewNote }}>
            <Notes />
          </NotesContext.Provider>

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
    )
  );
};

export default Dashboard;
