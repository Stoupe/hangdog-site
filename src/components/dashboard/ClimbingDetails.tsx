import { Button, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { NewBookingContext } from "../Contexts";
import styles from "../../styles/dashboard/BookingForm.module.scss";

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
    setBookingName,
    setBookingNotes,
  } = useContext(NewBookingContext);

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
                color={selected ? "primary" : "inherit"}
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
                color={selected ? "primary" : "inherit"}
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
                color={selected ? "primary" : "inherit"}
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
        <div className={styles.ropesRequired}>
          <h3>Ropes Required</h3>
          <h1>{numRopes}</h1>
        </div>

        <TextField
          className={styles.bookingName}
          placeholder="Name"
          value={bookingName}
          required={true}
          multiline={true}
          onChange={(e) => setBookingName(e.target.value)}
        />

        <TextField
          className={styles.bookingNotes}
          placeholder="Notes"
          value={bookingNotes}
          required={false}
          multiline={true}
          onChange={(e) => setBookingNotes(e.target.value)}
        />
      </div>
    </>
  );
};

export default ClimbingDetails;
