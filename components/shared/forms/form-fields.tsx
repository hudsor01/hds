import {getFieldError} from '@/lib/forms/use-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';

interface FormFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  label: string;
}

export function FormInput({name, label, ...props}: FormFieldProps) {
  const {
    register,
    formState: {errors},
  } = useFormContext();
  const error = getFieldError(name, errors);

  return (
    <TextField
      {...register(name)}
      {...props}
      label={label}
      error={!!error}
      helperText={error}
      fullWidth
    />
  );
}

interface SelectFieldProps extends FormFieldProps {
  options: Array<{label: string; value: string | number}>;
}

export function FormSelect({name, label, options, ...props}: SelectFieldProps) {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const error = getFieldError(name, errors);

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label}>
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

interface CheckboxFieldProps {
  name: string;
  label: React.ReactNode;
}

export function FormCheckbox({name, label}: CheckboxFieldProps) {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const error = getFieldError(name, errors);

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <FormControl error={!!error} fullWidth>
          <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label={label} />
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
