import React, { useState } from "react";

const useForm = (initialFormValues) => {
  const [values, setValues] = useState(initialFormValues);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    values,
    setValues,
    handleInputChange,
  };
};

// TODO: find type of props
const Form = (props) => {
  const { children, onSubmit, className } = props;
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export { useForm, Form };
