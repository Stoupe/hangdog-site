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
import * as Controls from "../controls/Controls";

type NewVoucherFormInputs = {
  numEntries: number;
  numVouchers: number;
  name: string;
  message: string;
  expiry: Date;
  shoeHire: boolean;
  harnessHire: boolean;
  chalkHire: boolean;
};

const NewVoucherForm: React.FC = () => {
  const initialFormValues: NewVoucherFormInputs = {
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
        <Grid item xs={6}>
          <Controls.TextField
            name="numEntries"
            value={values.numEntries}
            label="Number of Entries"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.TextField
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.SubmitButton />
        </Grid>

        {/* <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox name="shoes" color="primary" />}
            label="Shoes"
            labelPlacement="bottom"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox name="harness" color="primary" />}
            label="Harness"
            labelPlacement="bottom"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox name="harness" color="primary" />}
            label="Chalk"
            labelPlacement="bottom"
          />
        </Grid> */}
      </Grid>
    </Form>
  );
};

export default NewVoucherForm;
