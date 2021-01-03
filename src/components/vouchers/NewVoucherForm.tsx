import { Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import styles from "../../styles/vouchers/NewVoucherForm.module.scss";
import * as Controls from "../FormControls/Controls";
import { Form, useForm } from "../useForm";
import { createTimestamp, useFirebase } from "./../../functions/firebase";
import { Voucher } from "../Schemas/Voucher";
import { UserContext } from "./../Contexts";
import firebase from "firebase/app";
import { add } from "date-fns";
import { createRandomID } from "./../../functions/miscFunctions";

const NewVoucherForm: React.FC = () => {
  const { user } = useContext(UserContext);
  const db = useFirebase();
  const { enqueueSnackbar } = useSnackbar();

  const voucher: Voucher = {
    activated: false,
    redeemed: false,
    createdAt: createTimestamp(new Date()),
    createdBy: db.collection("users").doc("Ctm4UQ2n71Qb5evRU7nAvPlgUry1"), // TODO: use custom staff auth to show creator or else will show 'Hangdog Gym' etc.
    details: "",
    expiry: createTimestamp(add(new Date(), { months: 6 })),
    voucherId: createRandomID(),
    voucherDetails: {
      entries: [
        { age: "adult", shoeHire: false, harnessHire: true, chalkHire: false },
      ],
    },
  };

  const {
    values,
    setValues,
    handleInputChange,
    handleCheckboxChange,
  } = useForm(voucher);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    db.collection("vouchers")
      .add(voucher)
      .then(() => {
        enqueueSnackbar("submitted");
      })
      .catch((err) => {
        enqueueSnackbar(err);
      });
  };

  return (
    <Form onSubmit={submitForm} className={styles.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controls.TextField
            number
            name="numEntries"
            value={values.numEntries}
            label="Number of Entries"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.TextField
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.TextField
            name="age"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <Controls.Checkbox
            name="harnessHire"
            label="Harness"
            checked={values.harnessHire}
            onChange={handleCheckboxChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Checkbox
            name="shoeHire"
            label="Shoes"
            checked={values.shoeHire}
            onChange={handleCheckboxChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Checkbox
            name="chalkHire"
            label="Chalk"
            checked={values.chalkHire}
            onChange={handleCheckboxChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Controls.DatePicker />
        </Grid>

        <Grid item xs={2} />
        <Grid item xs={5}>
          <Controls.Checkbox
            name="activated"
            label="Activate Now"
            checked={values.activated}
            onChange={handleCheckboxChange}
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={5}>
          <Controls.SubmitButton />
        </Grid>
      </Grid>
    </Form>
  );
};

export default NewVoucherForm;
