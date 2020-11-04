import { Button } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import BookingForm from "./BookingForm";
import styles from "../styles/DashboardHeader.module.scss";

const DashboardHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Dashboard</h1>
        <div className={styles.time}>
          {/* https://date-fns.org/v2.16.1/docs/format */}
          <p>{format(Date.now(), "EEEE do MMM")}</p>
          <p>{format(Date.now(), "h:mmaaaaa")}m</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.staffSelect}>
          <Button variant="contained">+</Button>
          <Button variant="contained" color="primary">
            Henry
          </Button>
          <Button variant="contained">George</Button>
          <Button variant="contained">Lindsay</Button>
        </div>

        <img src="hangdog-logo.png" height="120px"></img>
      </div>
    </header>
  );
};

export default DashboardHeader;
