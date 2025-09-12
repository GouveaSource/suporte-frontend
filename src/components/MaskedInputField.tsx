'use client';

import React from 'react';
import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

interface MaskedInputFieldProps {
  mask: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
}

const MaskedInputField: React.FC<MaskedInputFieldProps> = ({
  mask,
  name,
  label,
  value,
  onChange,
  required = false,
  autoFocus = false,
}) => {
  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={onChange}
      name={name}
      disabled={false}
    >
      {(inputProps: any) => (
        <TextField
          {...inputProps}
          margin="normal"
          fullWidth
          id={name}
          label={label}
          required={required}
          autoFocus={autoFocus}
        />
      )}
    </InputMask>
  );
};

export default MaskedInputField;
