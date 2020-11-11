import { Button, TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"; // choose your lib
import { add } from "date-fns";
import React, { useContext } from "react";
import styles from "../styles/NewBookingForm.module.scss";
import { DateContext } from "./Contexts";

const DaySelector: React.FC = () => {
  const { date, setDate } = useContext(DateContext);

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
