import { Button } from "@material-ui/core";
import React from "react";
import styles from "../styles/NewBookingForm.module.scss";

const DaySelector: React.FC = () => {
  return (
    <div className={styles.daySelector}>
      <Button>{"<"}</Button>
      <span>Today</span>
      <Button>{">"}</Button>
    </div>
  );
};

export default DaySelector;
