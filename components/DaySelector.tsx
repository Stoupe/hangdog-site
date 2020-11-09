import { Button, TextField } from "@material-ui/core";
import { LocalizationProvider, DatePicker } from "@material-ui/pickers";
import React, { useContext, useState } from "react";
import styles from "../styles/NewBookingForm.module.scss";
import { DateContext } from "./DateContext";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"; // choose your lib

const DaySelector: React.FC = () => {
  const { day, setDay } = useContext(DateContext);
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className={styles.daySelector}>
      <Button>{"<"}</Button> {/*TODO: onclick just change selectedDate*/}
      <LocalizationProvider dateAdapter={DateFnsAdapter}>
        <DatePicker
          renderInput={(props) => <TextField {...props} />}
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
        />
      </LocalizationProvider>
      {/* <span>Today</span> */}
      <Button>{">"}</Button>
    </div>
  );
};

export default DaySelector;
