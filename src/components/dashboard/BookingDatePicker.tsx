import { Button, TextField } from "@material-ui/core";
// import { DatePicker } from "@material-ui/pickers";
// import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"; // choose your lib
import { add } from "date-fns";
import React, { useContext } from "react";
import styles from "../../styles/dashboard/BookingForm.module.scss";
import { NewBookingContext } from "../Contexts";
import DatePicker from "@material-ui/lab/DatePicker";

const BookingDatePicker: React.FC = () => {
  const { bookingDate, setBookingDate } = useContext(NewBookingContext);

  return (
    <div className={styles.datePicker}>
      <Button
        onClick={() => {
          setBookingDate((bookingDate) => add(bookingDate, { days: -1 }));
        }}
      >
        {"<"}
      </Button>
      {/* <LocalizationProvider dateAdapter={DateFnsAdapter}> */}
      <DatePicker
        disablePast={true}
        inputFormat={"EEEE do MMM"}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            helperText={"Booking Date"}
            margin="none"
          />
        )}
        value={bookingDate}
        onChange={(bookingDate) => setBookingDate(bookingDate)}
      />
      {/* </LocalizationProvider> */}
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
