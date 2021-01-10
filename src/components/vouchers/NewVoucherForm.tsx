import { Grid, Table, TableCell, TableRow } from "@material-ui/core";
import { add } from "date-fns";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { createVoucher } from "../../functions/voucherFunctions";
import styles from "../../styles/vouchers/NewVoucherForm.module.scss";
import * as Controls from "../FormControls/Controls";
import { VoucherForm } from "../Schemas/Voucher";
import { Form, useForm } from "../useForm";
import { createTimestamp, useFirebase } from "./../../functions/firebase";
import { createRandomID } from "./../../functions/miscFunctions";
import { UserContext } from "./../Contexts";

const NewVoucherForm: React.FC = () => {
  const { user } = useContext(UserContext);
  const db = useFirebase();
  const { enqueueSnackbar } = useSnackbar();

  const defaultVoucher: VoucherForm = {
    activated: false,
    redeemed: false,
    createdAt: createTimestamp(new Date()),
    createdBy: db.collection("users").doc("Ctm4UQ2n71Qb5evRU7nAvPlgUry1"), // TODO: use custom staff auth to show creator or else will show 'Hangdog Gym' etc.
    details: "",
    expiry: add(new Date(), { months: 6 }),
    voucherId: createRandomID(),
    age: "Adult",
    numEntries: 0,
    shoeHire: false,
    harnessHire: false,
    chalkHire: false,
  };

  const {
    values,
    handleInputChange,
    handleCheckboxChange,
    handleDateChange,
    handleSelectChange,
  } = useForm<VoucherForm>(defaultVoucher);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    createVoucher(values)
      .then(() => {
        enqueueSnackbar("voucher " + values.voucherId + " created", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  return (
    <Form onSubmit={submitForm} className={styles.root}>
      <Grid container spacing={4}>
        {false && (
          <Grid item xs={12}>
            <Table size="small">
              {Object.entries(values).map((x) => (
                <TableRow key={x.toString()}>
                  <TableCell>{x[0].toString()}</TableCell>
                  <TableCell>{x[1].toString()}</TableCell>
                </TableRow>
              ))}
            </Table>
          </Grid>
        )}

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
          <Controls.Select
            name="age"
            label="Age"
            value={values.age}
            options={["Child/Student", "Adult"]}
            onChange={handleSelectChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Controls.DatePicker
            name="expiry"
            label="Expiry"
            value={values.expiry}
            onChange={handleDateChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Checkbox
            name="harnessHire"
            label="Harness"
            checked={values.harnessHire}
            onChange={handleCheckboxChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Checkbox
            name="shoeHire"
            label="Shoes"
            checked={values.shoeHire}
            onChange={handleCheckboxChange}
          />
        </Grid>

        <Grid item xs={12}>
          {/* <Controls.DatePicker /> */}
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
          <Controls.SubmitButton title="Create Voucher" />
        </Grid>
      </Grid>
    </Form>
  );
};

export default NewVoucherForm;
