import { Button, Checkbox, FormHelperText, TextField } from "@material-ui/core";
import React, { useState } from "react";
import styles from "../../styles/vouchers/Vouchers.module.scss";
import { useSnackbar } from "notistack";

import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Vouchers: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  //!================================================
  //TODO: Refactor forms to use more generic and well-structured syntax: https://www.youtube.com/watch?v=-XKaSCU0ZLM
  //!================================================

  const [formState, setFormState] = useState({
    numEntries: 1,
    name: null,
    message: null,
  });

  const createVoucher = () => {
    enqueueSnackbar("sumbitted form");
  };

  return (
    <div className={styles.Vouchers}>
      <div className="centered">
        <div className="container">
          <Button variant="contained">Create Vouchers</Button>
          <Button variant="contained">Create Custom Voucher</Button>
          <Button variant="contained">Activate Voucher</Button>
          <Button variant="contained">Redeem Voucher</Button>
        </div>
        <div className="container">
          {/* <form onSubmit={}> */}
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
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Vouchers;
