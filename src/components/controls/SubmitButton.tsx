import { Button } from "@material-ui/core";
import styles from "../../styles/controls/Controls.module.scss";

import React from "react";

const SubmitButton = ({
  children,
  title,
}: {
  children?: any;
  title?: string;
}): JSX.Element => {
  return (
    <Button
      className={styles.submitButton}
      type="submit"
      variant="contained"
      color="primary"
    >
      {title || "Submit"}
      {children}
    </Button>
  );
};

export default SubmitButton;
