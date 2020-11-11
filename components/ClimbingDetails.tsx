import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import styles from "../styles/NewBookingForm.module.scss";
import { ClimbingDetailsContext } from "./Contexts";

const ClimbingDetails: React.FC = () => {
  const values = [0, 1, 2, 3, 4, 5];

  const {
    numSerious,
    numBelayers,
    numClimbers,
    numRopes,
    setNumSerious,
    setNumBelayers,
    setNumClimbers,
    setNumRopes,
  } = useContext(ClimbingDetailsContext);

  return (
    <>
      <div className={styles.detailInputContainer}>
        <h3>Serious</h3>
        <div className={styles.detailInput}>
          {values.map((e: number) => {
            let selected = false;
            numSerious === e ? (selected = true) : (selected = false);

            return (
              <Button
                name={e.toString()}
                color={selected ? "primary" : "default"}
                variant={selected ? "contained" : "text"}
                onClick={() => {
                  setNumSerious(e);
                }}
              >
                {e}
              </Button>
            );
          })}
        </div>
      </div>

      <div className={styles.detailInputContainer}>
        <h3>Belayers</h3>
        <div className={styles.detailInput}>
          {values.map((e: number) => {
            let selected = false;
            numBelayers === e ? (selected = true) : (selected = false);

            return (
              <Button
                name={e.toString()}
                color={selected ? "primary" : "default"}
                variant={selected ? "contained" : "text"}
                onClick={() => {
                  setNumBelayers(e);
                }}
              >
                {e}
              </Button>
            );
          })}
        </div>
      </div>

      <div className={styles.detailInputContainer}>
        <h3>Climbers</h3>
        <div className={styles.detailInput}>
          {values.map((e: number) => {
            let selected = false;
            numClimbers === e ? (selected = true) : (selected = false);

            return (
              <Button
                name={e.toString()}
                color={selected ? "primary" : "default"}
                variant={selected ? "contained" : "text"}
                onClick={() => {
                  setNumClimbers(e);
                }}
              >
                {e}
              </Button>
            );
          })}
        </div>
      </div>

      <div className={styles.detailInput}>
        <div className={styles.ropesAvailable}>
          <h3>Ropes Available</h3>
          <h1>{numRopes}</h1>
        </div>
      </div>
    </>
  );
};

export default ClimbingDetails;
