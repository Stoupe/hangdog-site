import React from "react";
import { Booking } from "../Schemas/Booking";
import { Form, useForm } from "../useForm";
import * as Controls from "../FormControls/Controls";
import Container from "./../BasicComponents/Container";
import { createTimestamp } from "../../functions/firebase";
import { useSnackbar } from "notistack";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Icon,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import styles from "../../styles/dashboard/NewBookingForm.module.scss";
// import { TabPanel } from "@material-ui/lab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const NewBookingForm: React.FC = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  const defaultNewBooking: Booking = {
    bookingType: "basic",
    bookingDate: new Date(),
    bookingName: "",
    bookingNotes: "",
    bookingTime: "",
    createdAt: createTimestamp(new Date()),
    createdBy: "henry - hardcoded",
    numSerious: 0,
    numBelayers: 0,
    numClimbers: 0,
    numRopes: 0,
    totalNumInGym: 0,
  };

  const {
    values,
    setValues,
    handleInputChange,
    handleCheckboxChange,
    handleDateChange,
    handleSelectChange,
  } = useForm(defaultNewBooking);

  const handleSubmit = (e) => {
    enqueueSnackbar(e);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container invisible column className={styles.root}>
      <h1>Booking</h1>

      <Container>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <Form className={"form"} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controls.DatePicker
                name="bookingDate"
                label="Booking Date"
                value={values.bookingDate}
                onChange={handleDateChange}
                arrows
              />
            </Grid>

            <Grid item>
              <Button>Basic</Button>
            </Grid>
            <Grid item>
              <Button>Complex</Button>
            </Grid>
            <Grid item>
              <Button>Birthday</Button>
            </Grid>

            <Grid item xs={6}>
              <Controls.TextField
                name="bookingName"
                value={values.bookingName}
                onChange={handleInputChange}
                label="Booking Name"
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.TextField
                name="bookingName"
                value={values.bookingName}
                onChange={handleInputChange}
                label="Booking Name"
              />
            </Grid>
          </Grid>
        </Form>
      </Container>
    </Container>
  );
};

export default NewBookingForm;
