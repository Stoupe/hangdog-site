import React from "react";
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  FormControlLabelProps,
} from "@material-ui/core";
import styles from "../../styles/FormControls/Controls.module.scss";

type Props = {
  name: string;
  checked: boolean;
  label?: string;
  labelPlacement?: "bottom" | "end" | "start" | "top";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  name,
  checked,
  label = name,
  labelPlacement = "bottom",
  onChange,
}: Props): JSX.Element => {
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
      labelPlacement={labelPlacement}
    />
  );
};

export default Checkbox;
