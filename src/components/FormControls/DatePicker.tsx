import React from "react";
import { default as MuiDatePicker } from "@material-ui/lab/DatePicker";
import { TextField } from "@material-ui/core";

const DatePicker: React.FC = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiDatePicker
      disablePast={true}
      inputFormat={"EEEE do MMM"}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          helperText={"Voucher Date"}
          margin="none"
        />
      )}
      value={selectedDate}
      onChange={handleDateChange}
    />

    // <></>
  );
};

export default DatePicker;
