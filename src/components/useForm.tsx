import React, { useState } from "react";

const useForm = (initialFormValues) => {
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
