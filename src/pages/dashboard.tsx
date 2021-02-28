// import styles from "../styles/dashboard/Dashboard.module.scss";
import { Box, makeStyles } from "@material-ui/core";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Container from "../components/BasicComponents/Container";
import { NotesContext, UserContext } from "../components/Contexts";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import NewBookingForm from "../components/dashboard/NewBookingForm";
import NewBookings from "../components/dashboard/NewBookings";
import Notes from "../components/dashboard/Notes";
import DashboardContentBox from "./../components/dashboard/DashboardContentBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flexDirection: "row",
  },
}));

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext);
  const [addingNewNote, setAddingNewNote] = useState<boolean>(false);

  // const dashboardWindows = [<Notes />, <NewBookingForm />, <NewBookings />];

  useEffect(() => {
    if (!user) {
      Router.replace("/");
    }
  }, []);

  const classes = useStyles();

  return (
    user && (
      <Box className={classes.root}>
        <DashboardHeader />
        <Box className={classes.main}>
          <DashboardContentBox title="test">
            <p>Inners :)</p>
          </DashboardContentBox>
        </Box>
      </Box>
    )
  );

  return (
    user && (
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
          <Container invisible className="root">
            {/* <BookingForm /> */}
            <NewBookingForm />
          </Container>
          <Container invisible>
            {/* <Bookings /> */}
            <NewBookings />
          </Container>
        </Container>
      </Container>
    )
  );
};

export default Dashboard;
