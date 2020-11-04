import React from "react";
import BookingForm from "../components/BookingForm";

import DashboardHeader from "../components/DashboardHeader";
import styles from "../styles/Dashboard.module.scss";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <div className={styles.dashboardContainer}>
        <BookingForm />
        <BookingForm />
      </div>
    </div>
  );
};

export default Dashboard;
