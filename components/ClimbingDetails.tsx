import { Button, Input, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import styles from "../styles/BookingForm.module.scss";
import { ClimbingDetailsContext } from "./Contexts";

const ClimbingDetails: React.FC = () => {
  const values = [0, 1, 2, 3, 4, 5];

  const {
    numSerious,
    numBelayers,
    numClimbers,
    numRopes,
    bookingName,
    bookingNotes,
    setNumSerious,
    setNumBelayers,
    setNumClimbers,
    setNumRopes,
    setBookingName,
    setBookingNotes,
  } = useContext(ClimbingDetailsContext);

  return (
    <>
      <div className={styles.detailInputContainer}>
        <h3>Serious</h3>
        <div className={styles.detailInput}>
          {values.map((value: number) => {
            let selected = false;
            numSerious === value ? (selected = true) : (selected = false);

            return (
              <Button
                key={value + "-serious"}
                name={value.toString()}
                color={selected ? "primary" : "default"}
                variant={selected ? "contained" : "text"}
                onClick={() => {
                  setNumSerious(value);
                }}
              >
                {value}
              </Button>
            );
          })}
        </div>
      </div>

      <div className={styles.detailInputContainer}>
        <h3>Belayers</h3>
        <div className={styles.detailInput}>
          {values.map((value: number) => {
            let selected = false;
            numBelayers === value ? (selected = true) : (selected = false);

            return (
              <Button
                key={value + "-belayers"}
                name={value.toString()}
                color={selected ? "primary" : "default"}
                variant={selected ? "contained" : "text"}
                onClick={() => {
                  setNumBelayers(value);
                }}
              >
                {value}
              </Button>
            );
          })}
        </div>
      </div>

      <div className={styles.detailInputContainer}>
        <h3>Climbers</h3>
        <div className={styles.detailInput}>
          {values.map((value: number) => {
            let selected = false;
            numClimbers === value ? (selected = true) : (selected = false);

            return (
              <Button
                key={value + "-climbers"}
                name={value.toString()}
                color={selected ? "primary" : "default"}
                variant={selected ? "contained" : "text"}
                onClick={() => {
                  setNumClimbers(value);
                }}
              >
                {value}
              </Button>
            );
          })}
        </div>
      </div>

      <div className={styles.detailInput}>
        <div className={styles.ropesAvailable}>
          <h3>Ropes Required</h3>
          <h1>{numRopes}</h1>
        </div>
        <div className={styles.bookingName}>
          <h3>Name</h3>
          <TextField
            value={bookingName}
            variant="filled"
            size="small"
            required={true}
            onChange={(e) => setBookingName(e.target.value)}
          />
        </div>
        <div className={styles.bookingNotes}>
          <h3>Notes</h3>
          <TextField
            value={bookingNotes}
            variant="filled"
            size="small"
            required={false}
            multiline={true}
            onChange={(e) => setBookingNotes(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ClimbingDetails;
