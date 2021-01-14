import { Button, Link } from "@material-ui/core";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard/DashboardHeader.module.scss";
import Container from "../BasicComponents/Container";

const DashboardHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  // const [currentStaff, setCurrentStaff] = useState("Henry");

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Container invisible>
        <h1>Dashboard</h1>
      </Container>

      {/* <header className={styles.header}>
        <div className={styles.left}>
          <h1>Dashboard</h1>
          <div className={styles.time}>
            <p>{format(currentTime, "EEEE do MMM")}</p>
            <p>{format(currentTime, "h:mmaaaaa")}m</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.staffSelect}>
            <Button color="inherit" variant="contained">
              +
            </Button>
            <Button variant="contained" color="primary">
              Henry
            </Button>
            <Button color="inherit" variant="contained">
              George
            </Button>
            <Button color="inherit" variant="contained">
              Lindsay
            </Button>
          </div>

          <Link href="/">
            <img src="hangdog-logo.png" height="120px"></img>
          </Link>
        </div>
      </header> */}
    </>
  );
};

export default DashboardHeader;
