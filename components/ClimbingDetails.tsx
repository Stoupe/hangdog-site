import { Button } from "@material-ui/core";
import React from "react";
import styles from "../styles/NewBookingForm.module.scss";

const ClimbingDetails: React.FC = () => {
  return (
    <>
      <div className={styles.detailInput}>
        <h2>Serious</h2>
        <Button>0</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
      </div>
      <div className={styles.detailInput}>2</div>
      <div className={styles.detailInput}>3</div>
      <div className={styles.detailRightSide}>4</div>
    </>
  );
};

export default ClimbingDetails;
