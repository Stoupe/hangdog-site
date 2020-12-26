import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Container } from "../../components/BasicComponents/BasicComponents";
import NavBar from "../../components/NavBar";
import NewVoucherForm from "../../components/vouchers/NewVoucherForm";
import styles from "../../styles/vouchers/Vouchers.module.scss";

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
        <Container>
          <NewVoucherForm />
        </Container>

        <Container column>
          <Button variant="contained">Create Vouchers</Button>
          <Button variant="contained">Create Custom Voucher</Button>
          <Button variant="contained">Activate Voucher</Button>
          <Button variant="contained">Redeem Voucher</Button>
        </Container>
        {/* <Container>
          <FormGroup>
            <TextField
              required
              defaultValue={1}
              type="number"
              label="Number of Entries"
            />
            <TextField required label="Name" />
            <TextField label="Message" />
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox name="shoes" color="primary" />}
                label="Shoes"
                labelPlacement="bottom"
              />
              <FormControlLabel
                control={<Checkbox name="harness" color="primary" />}
                label="Harness"
                labelPlacement="bottom"
              />
              <FormControlLabel
                control={<Checkbox name="harness" color="primary" />}
                label="Chalk"
                labelPlacement="bottom"
              />
            </FormGroup>

            <FormHelperText>You can display an error</FormHelperText>
            <Button
              onClick={createVoucher}
              variant="contained"
              color="primary"
              type="submit"
            >
              Sumbit
            </Button>
          </FormGroup>
        </Container> */}
      </Container>
    </div>
  );
};

export default Vouchers;
