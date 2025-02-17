'use client'

import type { SliderProps as MuiSliderProps } from '@mui/material/Slider'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'

export interface SliderFieldProps extends Omit<MuiSliderProps, 'onChange'> {
  label?: string
  helperText?: string
  error?: boolean
  onChange?: (value: number | number[]) => void
}

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0)
}))

export function SliderField({ label, helperText, error, onChange, value, ...props }: SliderFieldProps) {
  const handleChange = (_: Event, value: number | number[]) => {
    onChange?.(value)
  }

  return (
    <StyledBox>
      {label && <Typography gutterBottom>{label}</Typography>}
      <Slider value={value} onChange={handleChange} valueLabelDisplay="auto" {...props} />
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </StyledBox>
  )
}
