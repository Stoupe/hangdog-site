import { FormControl, TextField as MuiTextField } from "@material-ui/core";
import styles from "../../styles/FormControls/Controls.module.scss";

import React from "react";

type Props = {
  name: string;
  value: string | number;
  label: string;
  onChange: any; //TODO: find type
  number?: boolean;
  variant?: "standard" | "outlined" | "filled";
};

const TextField = ({
  name,
  value,
  label,
  onChange,
  number = false,
  variant = "standard",
}: Props): JSX.Element => {
  return (
    <FormControl fullWidth>
      <MuiTextField
        type={number ? "number" : "string"}
        className={styles.textField}
        variant={variant}
        value={value}
        name={name}
        label={label}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default TextField;
