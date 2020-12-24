import React, { useState } from "react";

const useForm = (initialFormValues: Record<string, unknown>) => {
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
const Form = ({ children, onSubmit, className }) => {
  // const {onSubmit} = props;
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export { useForm, Form };
