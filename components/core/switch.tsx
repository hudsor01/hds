'use client'

import type { SwitchProps as MuiSwitchProps } from '@mui/material/Switch'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'

export interface SwitchFieldProps extends Omit<MuiSwitchProps, 'onChange'> {
  label?: string
  helperText?: string
  error?: boolean
  onChange?: (checked: boolean) => void
}

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  '& .MuiSwitch-root': {
    marginRight: theme.spacing(1)
  }
}))

export function SwitchField({
  label,
  helperText,
  error,
  onChange,
  checked,
  ...props
}: SwitchFieldProps) {
  const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange?.(checked)
  }

  return (
    <StyledFormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            {...props}
          />
        }
        label={label}
      />
      {helperText && (
        <FormHelperText error={error}>
          {helperText}
        </FormHelperText>
      )}
    </StyledFormGroup>
  )
}
