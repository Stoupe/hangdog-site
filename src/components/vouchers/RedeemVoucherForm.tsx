import React from "react";
import { Form, useForm } from "../useForm";
import styles from "../../styles/vouchers/RedeemVoucherForm.module.scss";
// import TextField from './../FormControls/TextField';
import * as Controls from "../FormControls/Controls";

const RedeemVoucherForm: React.FC = (): JSX.Element => {
  const redeemVoucher = (e) => {
    e.preventDefault();
    alert("redeem");
  };

  const { values, handleInputChange } = useForm({ voucherCode: "" });

  return (
    <Form className={styles.root} onSubmit={redeemVoucher}>
      <Controls.TextField
        name="voucherCode"
        label="Voucher Code"
        onChange={handleInputChange}
        value={values.voucherCode}
      />
    </Form>
  );
};

export default RedeemVoucherForm;
