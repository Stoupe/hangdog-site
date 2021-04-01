import React from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";

const FormikTestForm: React.FC = (): JSX.Element => {
  return (
    <Formik
      initialValues={{ firstName: "" }}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        // make async call
        console.log("Submitted data: ", data);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            disabled={isSubmitting}
            size={"large"}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    </Formik>
  );
};

export default FormikTestForm;
