import React, { useState } from "react";

type FormReturnTypes<T> = {
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (name: string, date: Date) => void;
  handleSelectChange: (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => void;
};

function useForm<T>(initialFormValues: T): FormReturnTypes<T> {
  const [values, setValues] = useState<T>(initialFormValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleDateChange = (name: string, date: Date) => {
    // const { name, checked } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: date }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{
      name?: string;
      value: string;
    }>
  ) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    values,
    setValues,
    handleInputChange,
    handleCheckboxChange,
    handleDateChange,
    handleSelectChange,
  };
}

type Props = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
