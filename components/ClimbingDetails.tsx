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
    setNumSerious,
    setNumBelayers,
    setNumClimbers,
  } = useContext(ClimbingDetailsContext);

  return (
    <>
      <div className={styles.detailInputContainer}>
        <h2>Serious</h2>
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
        <h2>Belayers</h2>
        <div className={styles.detailInput}>
          <Button>0</Button>
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
          <Button>5</Button>
        </div>
      </div>

      <div className={styles.detailInputContainer}>
        <h2>Climbers</h2>
        <div className={styles.detailInput}>
          <Button>0</Button>
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
          <Button>5</Button>
        </div>
      </div>
      <div className={styles.detailInput}>
        <div className={styles.ropesAvailable}>
          <h2>Ropes Available</h2>
          <h1>3</h1>
        </div>
        <div className={styles.ropesAvailable}>
          <h2>Ropes Available</h2>
          <h1>3</h1>
        </div>
      </div>
    </>
  );
};

export default ClimbingDetails;
