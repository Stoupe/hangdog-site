import React from "react";
import { Form, useForm } from "../useForm";
import styles from "../../styles/vouchers/RedeemVoucherForm.module.scss";
// import TextField from './../FormControls/TextField';
import * as Controls from "../FormControls/Controls";
import { redeemVoucher } from "../../functions/voucherFunctions";
import { Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";

const RedeemVoucherForm: React.FC = (): JSX.Element => {
  const { values, handleInputChange } = useForm({ voucherCode: "" });
  const { enqueueSnackbar } = useSnackbar();

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();

    redeemVoucher(values.voucherCode)
      .then(() => {
        enqueueSnackbar("redeemed");
      })
      .catch((err) => {
        enqueueSnackbar(err);
      });
  };

  return (
    <Form className={styles.root} onSubmit={handleSumbit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Controls.TextField
            name="voucherCode"
            label="Voucher Code"
            onChange={handleInputChange}
            value={values.voucherCode}
          />
        </Grid>
        <Grid item>
          <Controls.SubmitButton />
        </Grid>
      </Grid>
    </Form>
  );
};

export default RedeemVoucherForm;
