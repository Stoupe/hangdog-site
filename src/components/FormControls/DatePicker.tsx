import React from "react";
import { default as MuiDatePicker } from "@material-ui/lab/DatePicker";
import { FormControl, InputLabel, TextField } from "@material-ui/core";

type Props = {
  name: string;
  value: Date;
  label: string;
  onChange: any; //TODO: find type,
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
            variant="standard"
            helperText={label}
            margin="none"
          />
        )}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default DatePicker;
