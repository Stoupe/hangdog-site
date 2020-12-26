import React from "react";
import { Checkbox as MuiCheckbox, FormControlLabel } from "@material-ui/core";
import styles from "../../styles/FormControls/Controls.module.scss";

type Props = {
  name: string;
  checked: boolean;
  label: string;
  onChange: any; //TODO: find type
};

const Checkbox = ({ name, checked, label, onChange }: Props): JSX.Element => {
  return (
    <FormControlLabel
      className={styles.checkbox}
      control={
        <MuiCheckbox
          name={name}
          checked={checked}
          color="primary"
          onChange={onChange}
        />
      }
      label={label}
      labelPlacement="bottom"
    />
  );
};

export default Checkbox;
