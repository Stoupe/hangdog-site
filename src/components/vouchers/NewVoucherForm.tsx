import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Form, useForm } from "../useForm";
import styles from "../../styles/vouchers/Vouchers.module.scss";

const NewVoucherForm: React.FC = () => {
  const initialFormValues = {
    numEntries: 1,
    numVouchers: 1,
    name: "",
    message: "",
    expiry: new Date(),
    shoeHire: true,
    harnessHire: true,
    chalkHire: false,
  };

  const { values, setValues, handleInputChange } = useForm(initialFormValues);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    alert("submitted");
  };

  return (
    <Form onSubmit={submitForm} className={styles.form}>
      <Grid container spacing={3} xs>
        <Grid item xs="auto">
          <TextField
            variant="outlined"
            value={values.name}
            name="name"
            label="Name"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs="auto">
          <TextField
            variant="outlined"
            value={values.name}
            name="name"
            label="Name"
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item>
          <TextField
            variant="outlined"
            value={values.numEntries}
            name="numEntries"
            label="Number of Entries"
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item>
          <FormControlLabel
            control={<Checkbox name="shoes" color="primary" />}
            label="Shoes"
            labelPlacement="bottom"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox name="harness" color="primary" />}
            label="Harness"
            labelPlacement="bottom"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox name="harness" color="primary" />}
            label="Chalk"
            labelPlacement="bottom"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default NewVoucherForm;
