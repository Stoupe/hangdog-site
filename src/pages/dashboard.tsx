import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Container from "../components/BasicComponents/Container";
import {
  NewBookingContext,
  NotesContext,
  UserContext,
} from "../components/Contexts";
import BookingForm from "../components/dashboard/BookingForm";
import Bookings from "../components/dashboard/Bookings";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import NewBookingForm from "../components/dashboard/NewBookingForm";
import Notes from "../components/dashboard/Notes";
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
      // <Container fullPage invisible column props={{ fixed: true }}>
      <Container
        fullPage
        invisible
        column
        containerPropsObj={{ props: { fixed: true }, defaultComponent: "div" }}
      >
        <Container>
          <DashboardHeader />
        </Container>
        <Container invisible>
          <NotesContext.Provider value={{ addingNewNote, setAddingNewNote }}>
            <Container invisible className={"asdf"}>
              <Notes />
            </Container>
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
            <Container invisible>
              <BookingForm />
              {/* <NewBookingForm /> */}
            </Container>
            <Container invisible>
              <Bookings />
            </Container>
          </NewBookingContext.Provider>
        </Container>
      </Container>
    )
  );
};

export default Dashboard;
