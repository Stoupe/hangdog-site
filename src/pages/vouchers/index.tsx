import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Container } from "../../components/BasicComponents/BasicComponents";
import NavBar from "../../components/NavBar";
import NewVoucherForm from "../../components/vouchers/NewVoucherForm";
import styles from "../../styles/vouchers/Vouchers.module.scss";
import RedeemVoucherForm from "./../../components/vouchers/RedeemVoucherForm";

const Vouchers = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  const [formState, setFormState] = useState({
    numEntries: 1,
    name: null,
    message: null,
  });

  const createVoucher = () => {
    enqueueSnackbar("sumbitted form");
  };

  return (
    <div className={styles.root}>
      <NavBar />
      <Container fullPage invisible>
        <Container column>
          <h1>New Voucher</h1>
          <NewVoucherForm />
        </Container>

        {/* <Container column>
          <Button color="inherit" variant="contained">
            Create Vouchers
          </Button>
          <Button color="inherit" variant="contained">
            Create Custom Voucher
          </Button>
          <Button color="inherit" variant="contained">
            Activate Voucher
          </Button>
          <Button color="inherit" variant="contained">
            Redeem Voucher
          </Button>
        </Container> */}

        <Container column>
          <h1>Redeem Voucher</h1>
          <RedeemVoucherForm />
        </Container>
      </Container>
    </div>
  );
};

export default Vouchers;
