import React from "react";
import styles from "../styles/Bookings.module.scss";

interface BookingsProps {}

const Bookings: React.FC<BookingsProps> = () => {
  return (
    <div className={styles.outerContainer}>
      <h1>Bookings</h1>
      <div className={styles.innerContainer}>bookings here</div>
    </div>
  );
};

export default Bookings;
