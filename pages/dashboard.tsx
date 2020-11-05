import React from "react";
import BookingForm from "../components/BookingForm";

import DashboardHeader from "../components/DashboardHeader";
import NewBookingForm from "../components/NewBookingForm";
import styles from "../styles/Dashboard.module.scss";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <div className={styles.dashboardContainer}>
        <NewBookingForm />
        <BookingForm />
      </div>
    </div>
  );
};

export default Dashboard;
