import { TextField as MuiTextField } from "@material-ui/core";
import styles from "../../styles/controls/Controls.module.scss";

import React from "react";

type Props = {
  name: string;
  value: string;
  label: string;
  onChange: any;
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
