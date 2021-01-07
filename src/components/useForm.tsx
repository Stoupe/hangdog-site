import React, { useState } from "react";

type FormReturnTypes = {
  values: Record<string, unknown>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const useForm = (
  initialFormValues: Record<string, unknown>
): FormReturnTypes => {
  const [values, setValues] = useState(initialFormValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: checked }));
  };

  return {
    values,
    setValues,
    handleInputChange,
    handleCheckboxChange,
  };
};

type Props = {
  children: React.ReactNode;
  onSubmit: any;
  className: string;
};

// TODO: find type of props
const Form = (props: Props): JSX.Element => {
  const { children, onSubmit, className } = props;
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export { useForm, Form };
