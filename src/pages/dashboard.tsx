import React, { useContext, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import BookingForm from "../components/BookingForm";
import { UserContext } from "../components/Contexts";
import styles from "../styles/Dashboard.module.scss";
import Router from "next/router";
import Bookings from "../components/Bookings";
import Notes from "./../components/Notes";

const Dashboard: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      Router.replace("/");
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <div className={styles.dashboardContainer}>
        {/* <Notes /> */}
        <BookingForm />
        <Bookings />
      </div>
    </div>
  );
};

export default Dashboard;
