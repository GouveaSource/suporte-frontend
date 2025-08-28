"use client";

import React from "react";
import { TextField } from "@mui/material";

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
}
const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  value,
  onChange,
  required = false,
  autoFocus = false,
}) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      id={name}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      autoFocus={autoFocus}
    />
  );
};

export default InputField;