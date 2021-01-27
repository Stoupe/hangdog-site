import React from "react";
import { Booking } from "../Schemas/Booking";
import { Form, useForm } from "../useForm";
import * as Controls from "../FormControls/Controls";
import Container from "./../BasicComponents/Container";

const NewBookingForm: React.FC = (): JSX.Element => {
  const defaultNewBooking: Booking = {
    bookingType: "basic",
    bookingDate: new Date().toString(),
    bookingName: "",
    bookingNotes: "",
    bookingTime: "",
    createdAt: new Date().toString(),
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

  return (
    <Container invisible column>
      <h1>Booking</h1>
      <Container>
        <Form className={"form"} onSubmit={() => null}>
          <Controls.Checkbox
            checked={false}
            name="test"
            onChange={() => null}
          />
        </Form>
      </Container>
    </Container>
  );
};

export default NewBookingForm;
