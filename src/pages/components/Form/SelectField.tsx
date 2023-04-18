import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';

export type SelectItem = {
  itemLabel: string;
  itemValue: string;
};

type Props = {
  id: string;
  label: string;
  name: string;
  items: Array<SelectItem>;
  value: string;
  touched?: boolean;
  errors?: string;
  firstItemEmpty?: boolean;
  onChange: (e: SelectChangeEvent<any>) => void;
};

const SelectField = ({
  id,
  value,
  name,
  label,
  items = [],
  touched,
  errors,
  firstItemEmpty = true,
  onChange,
}: Props) => (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`label-${id}`} error={touched && Boolean(errors)}>
        {label}
      </InputLabel>

      <MuiSelect
        labelId={`label-${id}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        error={touched && Boolean(errors)}
        fullWidth
      >
        {firstItemEmpty && <MenuItem value=""></MenuItem>}
        {items.map((item) => (
          <MenuItem key={item.itemValue} value={item.itemValue}>
            {item.itemLabel}
          </MenuItem>
        ))}
      </MuiSelect>
      {touched && errors && <FormHelperText error>{errors}</FormHelperText>}
    </FormControl>
  );

export default SelectField;
