import { Button } from "@material-ui/core";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import styles from "../styles/DashboardHeader.module.scss";

const DashboardHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [currentStaff, setCurrentStaff] = useState("Henry");

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Dashboard</h1>
        <div className={styles.time}>
          {/* https://date-fns.org/v2.16.1/docs/format */}
          <p>{format(currentTime, "EEEE do MMM")}</p>
          <p>{format(currentTime, "h:mmaaaaa")}m</p>
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
