'use client'

import { cn } from '@/auth/lib/utils'
import type { SliderProps as MuiSliderProps } from '@mui/material'
import { Slider as MuiSlider, styled } from '@mui/material'
import * as React from 'react'

const StyledSlider = styled(MuiSlider)(({ theme }) => ({
  height: 4,
  '& .MuiSlider-thumb': {
    width: 16,
    height: 16,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`,
    },
    '&.Mui-active': {
      boxShadow: `0 0 0 12px ${theme.palette.primary.main}20`,
    },
  },
  '& .MuiSlider-track': {
    height: 4,
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSlider-rail': {
    height: 4,
    backgroundColor: theme.palette.primary.light,
    opacity: 0.38,
  },
  '& .MuiSlider-mark': {
    backgroundColor: theme.palette.primary.main,
    height: 8,
    width: 1,
    marginTop: -2,
  },
  '& .MuiSlider-markActive': {
    backgroundColor: theme.palette.background.paper,
  },
}))

export interface SliderProps extends MuiSliderProps {
  onValueChange?: (value: number | number[]) => void
}

export const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  ({ className, onValueChange, onChange, ...props }, ref) => {
    const handleChange = React.useCallback(
      (_: Event, value: number | number[], activeThumb: number) => {
        onChange?.(_ as any, value, activeThumb)
        onValueChange?.(value)
      },
      [onChange, onValueChange]
    )

    return (
      <StyledSlider
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className
        )}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Slider.displayName = 'Slider'

export default Slider
