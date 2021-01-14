import React from "react";
import { Booking } from "../Schemas/Booking";
import { useForm } from "../useForm";
import * as Controls from "../FormControls/Controls";

const NewBookingForm: React.FC = (): JSX.Element => {
  const defaultNewBooking: Booking = {
    bookingType: "basic",
    bookingDate: new Date(),
    bookingName: "",
    bookingNotes: "",
    bookingTime: "",
    createdAt: new Date(),
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

  return <Controls.SubmitButton />;
};

export default NewBookingForm;
