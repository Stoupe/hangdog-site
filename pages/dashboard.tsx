import React, { useContext, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import NewBookingForm from "../components/NewBookingForm";
import { UserContext } from "../components/Contexts";
import styles from "../styles/Dashboard.module.scss";
import Router from "next/router";

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
        <NewBookingForm />
        {/* <BookingForm /> */}
      </div>
    </div>
  );
};

export default Dashboard;
