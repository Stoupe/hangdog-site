import React from "react";
// import DatePicker as MuiDatePicker from "@material-ui/lab/DatePicker";
import { TextField } from "@material-ui/core";

const DatePicker: React.FC = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    // <MuiDatePicker
    //   disableToolbar
    //   variant="static"
    //   format="dd/MM/yyyy"
    //   margin="normal"
    //   id="date-picker-inline"
    //   label="Date picker inline"
    //   value={selectedDate}
    //   onChange={handleDateChange}
    //   KeyboardButtonProps={{
    //     "aria-label": "change date",
    //   }}
    //   renderInput={(params) => <TextField {...params} variant="standard" />}
    // />
    <></>
  );
};

export default DatePicker;
