import { Button, TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"; // choose your lib
import { add } from "date-fns";
import React, { useContext } from "react";
import styles from "../styles/BookingForm.module.scss";
import { DateContext } from "./Contexts";

const BookingDatePicker: React.FC = () => {
  const { bookingDate, setBookingDate } = useContext(DateContext);

  return (
    <div className={styles.datePicker}>
      <Button
        onClick={() => {
          setBookingDate((bookingDate) => add(bookingDate, { days: -1 }));
        }}
      >
        {"<"}
      </Button>
      <LocalizationProvider dateAdapter={DateFnsAdapter}>
        <DatePicker
          disablePast={true}
          inputFormat={"EEEE do MMM"}
          renderInput={(props) => <TextField {...props} />}
          value={bookingDate}
          onChange={(bookingDate) => setBookingDate(bookingDate)}
        />
      </LocalizationProvider>
      <Button
        onClick={() => {
          setBookingDate((bookingDate) => add(bookingDate, { days: 1 }));
        }}
      >
        {">"}
      </Button>
    </div>
  );
};

export default BookingDatePicker;
