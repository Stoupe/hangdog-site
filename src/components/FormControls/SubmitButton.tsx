import { Button, FormControl } from "@material-ui/core";
import styles from "../../styles/FormControls/Controls.module.scss";

import React from "react";

const SubmitButton = ({
  children,
  title,
}: {
  children?: any;
  title?: string;
}): JSX.Element => {
  return (
    <FormControl fullWidth>
      <Button
        className={styles.submitButton}
        type="submit"
        variant="contained"
        color="primary"
      >
        {title || "Submit"}
        {children}
      </Button>
    </FormControl>
  );
};

export default SubmitButton;
