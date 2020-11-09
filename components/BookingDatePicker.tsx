import React from "react";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import styles from "../styles/BookingDatePicker.module.scss";

const BookingDatePicker: React.FC = () => {
  const [selectedDate, handleDateChange] = React.useState(new Date());

  return (
    <div className={styles.datePicker}>
      <LocalizationProvider dateAdapter={DateFnsAdapter}>
        <DatePicker
          renderInput={(props) => <TextField {...props} />}
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
        />
        {/* <TimePicker
          renderInput={(props) => <TextField {...props} />}
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
        />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
        /> */}
      </LocalizationProvider>
    </div>
  );
};

export default BookingDatePicker;
