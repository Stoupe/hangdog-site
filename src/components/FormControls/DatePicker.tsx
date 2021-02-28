import React from "react";
import { default as MuiDatePicker } from "@material-ui/lab/DatePicker";
import { Button, FormControl, TextField } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { add } from "date-fns";
import styles from "../../styles/FormControls/Controls.module.scss";
import Container from "./../BasicComponents/Container";

type Props = {
  name: string;
  value: Date;
  label: string;
  onChange: (name: string, date: Date) => void;
  format?: string;
  disablePast?: boolean;
  arrows?: boolean;
};

const DatePicker = ({
  name,
  value,
  label,
  onChange,
  format = "dd/MM/yyyy",
  disablePast = true,
  arrows = false,
}: Props): JSX.Element => {
  return (
    <Container invisible>
      {arrows && (
        <Button
          color="inherit"
          onClick={(e) => {
            e.preventDefault();
            onChange(name, add(value, { days: -1 }));
          }}
        >
          <ChevronLeftIcon />
        </Button>
      )}
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
        />
      </FormControl>
      {arrows && (
        <Button
          color="inherit"
          onClick={(e) => {
            e.preventDefault();
            onChange(name, add(value, { days: 1 }));
          }}
        >
          <ChevronRightIcon />
        </Button>
      )}
    </Container>
  );
};

export default DatePicker;
