import { Input } from '@/components/ui/input'
import { getFieldError } from '@/lib/forms/use-form'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface FormFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string
  label: string
}

export function FormInput({ name, label, ...props }: FormFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  const error = getFieldError(name, errors)

  return (
    <TextField
      {...register(name)}
      {...props}
      label={label}
      error={!!error}
      helperText={error}
      fullWidth
    />
  )
}

interface SelectFieldProps extends FormFieldProps {
  options: Array<{ label: string; value: string | number }>
}

export function FormSelect({ name, label, options, ...props }: SelectFieldProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const error = getFieldError(name, errors)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select variant="filled" {...field} {...props} label={label}>
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
  )
}

interface DateFieldProps extends FormFieldProps {
  minDate?: Date
  maxDate?: Date
}

export function FormDatePicker({ name, label, minDate, maxDate, ...props }: DateFieldProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const error = getFieldError(name, errors)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          type="date"
          label={label}
          error={!!error}
          helperText={error}
          fullWidth
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: minDate?.toISOString().split('T')[0],
            max: maxDate?.toISOString().split('T')[0]
          }}
        />
      )}
    />
  )
}

interface CheckboxFieldProps extends Omit<FormFieldProps, 'label'> {
  label: React.ReactNode
}

export function FormCheckbox({ name, label, ...props }: CheckboxFieldProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const error = getFieldError(name, errors)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={!!error}>
          <label>
            <Input type="checkbox" {...field} {...props} checked={field.value} />
            {label}
          </label>
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
