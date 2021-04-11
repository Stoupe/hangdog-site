import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import {
  Field,
  FieldAttributes,
  FieldHookConfig,
  Form,
  Formik,
  useField,
} from "formik";
import React from "react";

type MyRadioProps = {
  label: string;
} & FieldHookConfig<unknown>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

type MyTextFieldProps = {
  placeholder?: string;
} & FieldHookConfig<unknown>;

const MyTextField: React.FC<MyTextFieldProps> = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField {...field} placeholder={placeholder} helperText={errorText} />
  );
};

/**
 *
 * @returns A Formik Form
 */
const FormikTestForm: React.FC = (): JSX.Element => {
  const initialValues = {
    firstName: "",
    lastName: "",
    isTall: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        // make async call
        console.log("Submitted data: ", data);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <MyTextField name="firstName" type="input" placeholder="First Name" />

          <MyTextField name="lastName" type="input" placeholder="Last Name" />

          <Field name="isTall" type="checkbox" as={Checkbox} />

          <div>Yoghurt</div>
          <MyRadio name="yoghurt" type="radio" value="peach" label="peach" />
          <MyRadio
            name="yoghurt"
            type="radio"
            value="strawberry"
            label="strawberry"
          />
          <MyRadio name="yoghurt" type="radio" value="apple" label="apple" />

          <Button
            disabled={isSubmitting}
            size={"large"}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default FormikTestForm;
