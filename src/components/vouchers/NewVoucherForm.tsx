import { FormControl, FormControlLabel, Grid } from "@material-ui/core";
import React from "react";
import styles from "../../styles/vouchers/NewVoucherForm.module.scss";
import * as Controls from "../FormControls/Controls";
import { Form, useForm } from "../useForm";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

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

  const {
    values,
    setValues,
    handleInputChange,
    handleCheckboxChange,
  } = useForm(initialFormValues);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    enqueueSnackbar("submitted");
  };

  return (
    <Form onSubmit={submitForm} className={styles.root}>
      <Grid container spacing={2}>
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

        <Grid item xs={4}>
          <Controls.Checkbox
            name="harness"
            label="Harness"
            checked={values.harness}
            onChange={handleCheckboxChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Checkbox
            name="shoes"
            label="Shoes"
            checked={values.shoes}
            onChange={handleCheckboxChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Checkbox
            name="chalk"
            label="Chalk"
            checked={values.chalk}
            onChange={handleCheckboxChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Controls.SubmitButton />
        </Grid>
      </Grid>
    </Form>
  );
};

export default NewVoucherForm;
