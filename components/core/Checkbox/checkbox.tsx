'use client'

import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'

export interface CheckboxFieldProps extends Omit<MuiCheckboxProps, 'onChange'> {
  label?: string
  helperText?: string
  error?: boolean
  onChange?: (checked: boolean) => void
}

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  '& .MuiCheckbox-root': {
    marginRight: theme.spacing(1)
  }
}))

export function CheckboxField({ label, helperText, error, onChange, checked, ...props }: CheckboxFieldProps) {
  const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange?.(checked)
  }

  return (
    <StyledFormGroup>
      <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} {...props} />} label={label} />
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </StyledFormGroup>
  )
}
