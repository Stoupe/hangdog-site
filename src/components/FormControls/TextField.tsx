import { TextField as MuiTextField } from "@material-ui/core";
import styles from "../../styles/FormControls/Controls.module.scss";

import React from "react";

type Props = {
  name: string;
  value: string;
  label: string;
  onChange: any; //TODO: find type
};

const TextField = ({ name, value, label, onChange }: Props): JSX.Element => {
  return (
    <MuiTextField
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
