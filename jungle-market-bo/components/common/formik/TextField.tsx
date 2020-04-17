import React from "react";
import TextInput, { TextInputProps } from "../input/TextInput";

interface IProps extends TextInputProps {
  field: { [k: string]: any };
  form: {
    touched: { [field: string]: boolean };
    errors: { [field: string]: string };
  };
}

export default function TextField({
  field,
  form: { touched, errors },
  ...props
}: IProps) {
  return (
    <TextInput
      {...field}
      {...props}
      error={touched[field.name] && errors[field.name]}
    />
  );
}
