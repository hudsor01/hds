'use client'

import {
  FormControl,
  FormControlLabel,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  styled
} from '@mui/material'
import * as React from 'react'

const StyledRadio = styled(MuiRadio)(({ theme }) => ({
  padding: theme.spacing(1),
  '&.Mui-checked': {
    color: theme.palette.primary.main
  }
}))

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    marginLeft: theme.spacing(1)
  }
}))

export interface RadioGroupProps
  extends Omit<React.ComponentProps<typeof MuiRadioGroup>, 'defaultValue'> {
  defaultValue?: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, defaultValue, children, ...props }, ref) => {
    return (
      <FormControl ref={ref} className={className}>
        <MuiRadioGroup defaultValue={defaultValue} {...props}>
          {children}
        </MuiRadioGroup>
      </FormControl>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

export interface RadioProps extends React.ComponentProps<typeof StyledRadio> {
  label?: string
}

const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    const radio = <StyledRadio ref={ref} className={className} {...props} />
    if (label) {
      return <StyledFormControlLabel control={radio} label={label} />
    }
    return radio
  }
)
Radio.displayName = 'Radio'

export { Radio, RadioGroup }
