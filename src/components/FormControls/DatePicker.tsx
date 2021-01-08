import React from "react";
import { default as MuiDatePicker } from "@material-ui/lab/DatePicker";
import { FormControl, InputLabel, TextField } from "@material-ui/core";

type Props = {
  name: string;
  value: Date;
  label: string;
  onChange: (name: string, date: Date) => void;
  format?: string;
  disablePast?: boolean;
};

const DatePicker = ({
  name,
  value,
  label,
  onChange,
  format = "dd/MM/yyyy",
  disablePast = true,
}: Props): JSX.Element => {
  return (
    <FormControl fullWidth>
      <MuiDatePicker
        disablePast={disablePast}
        inputFormat={format}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={label}
            variant="standard"
            helperText={null}
            margin="none"
          />
        )}
        value={value}
        onChange={(date) => onChange(name, date)}
        // onChange={onChange}
      />
    </FormControl>
  );
};

export default DatePicker;
