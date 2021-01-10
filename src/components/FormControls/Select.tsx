import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";

import React from "react";
type Props = {
  name: string;
  value: string | number;
  label: string;
  onChange: (
    event: React.ChangeEvent<{
      name?: string;
      value: string;
    }>,
    child: React.ReactNode
  ) => void;
  options: string[];
};

const Select = ({
  name,
  label,
  onChange,
  value,
  options,
}: Props): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <MuiSelect value={value} name={name} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
