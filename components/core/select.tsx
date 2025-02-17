'use client'

import type { SelectProps as MuiSelectProps, SelectChangeEvent } from '@mui/material/Select'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends Omit<MuiSelectProps, 'onChange'> {
  options: SelectOption[]
  label?: string
  helperText?: string
  error?: boolean
  onChange?: (value: string | number) => void
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius
  }
}))

export function SelectField({ options, label, helperText, error, onChange, value, ...props }: SelectProps) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange?.(event.target.value)
  }

  const labelId = `${props.id || 'select'}-label`

  return (
    <StyledFormControl fullWidth error={error}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select labelId={labelId} value={value} label={label} onChange={handleChange} {...props}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  )
}
