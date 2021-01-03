import { TextField as MuiTextField } from "@material-ui/core";
import styles from "../../styles/FormControls/Controls.module.scss";

import React from "react";

type Props = {
  name: string;
  value: string | number;
  label: string;
  onChange: any; //TODO: find type
  number?: boolean;
};

const TextField = ({
  name,
  value,
  label,
  onChange,
  number = false,
}: Props): JSX.Element => {
  return (
    <MuiTextField
      type={number ? "number" : "string"}
      className={styles.textField}
      variant="outlined"
      value={value}
      name={name}
      label={label}
      onChange={onChange}
    />
  );
};

export default TextField;
