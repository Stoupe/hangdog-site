import { Button, TextField } from "@material-ui/core";
import { LocalizationProvider, DatePicker } from "@material-ui/pickers";
import React, { useContext, useState } from "react";
import styles from "../styles/NewBookingForm.module.scss";
import { DateContext } from "./DateContext";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"; // choose your lib
import { add } from "date-fns";

const DaySelector: React.FC = () => {
  const { date, setDate } = useContext(DateContext);
  // const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className={styles.daySelector}>
      <Button
        onClick={() => {
          setDate((date) => add(date, { days: -1 }));
        }}
      >
        {"<"}
      </Button>
      <LocalizationProvider dateAdapter={DateFnsAdapter}>
        <DatePicker
          inputFormat={"EEEE do MMM"}
          renderInput={(props) => <TextField {...props} />}
          value={date}
          onChange={(date) => setDate(date)}
        />
      </LocalizationProvider>
      <Button
        onClick={() => {
          setDate((date) => add(date, { days: 1 }));
        }}
      >
        {">"}
      </Button>
    </div>
  );
};

export default DaySelector;
