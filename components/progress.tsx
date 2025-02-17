'use client'

import {
  LinearProgress,
  CircularProgress,
  Box,
  Typography,
  styled,
  useTheme,
  type LinearProgressProps,
  type CircularProgressProps
} from '@mui/material'
import * as React from 'react'

// Styled Linear Progress
const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  [`&.MuiLinearProgress-root`]: {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 4,
    transition: theme.transitions.create(['transform', 'background-color'])
  }
}))

// Styled Circular Progress
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  transition: theme.transitions.create(['color'])
}))

export interface BaseProgressProps {
  /**
   * Current value
   */
  value?: number
  /**
   * Maximum value
   */
  max?: number
  /**
   * Show label
   */
  showLabel?: boolean
  /**
   * Custom label format
   */
  labelFormat?: (value: number, max: number) => string
  /**
   * Color of the progress indicator
   */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  /**
   * Size variant
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Additional CSS class names
   */
  className?: string
}

export interface LinearProgressBarProps extends BaseProgressProps, Omit<LinearProgressProps, 'value' | 'color'> {
  variant?: 'linear'
}

export interface CircularProgressBarProps extends BaseProgressProps, Omit<CircularProgressProps, 'value' | 'color'> {
  variant: 'circular'
}

export type ProgressProps = LinearProgressBarProps | CircularProgressBarProps

const getSize = (size: BaseProgressProps['size'], variant: 'linear' | 'circular') => {
  if (variant === 'linear') {
    switch (size) {
      case 'small':
        return 4
      case 'large':
        return 12
      default:
        return 8
    }
  } else {
    switch (size) {
      case 'small':
        return 24
      case 'large':
        return 48
      default:
        return 40
    }
  }
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const { value = 0, max = 100, showLabel = false, labelFormat, color = 'primary', size = 'medium', className, ...rest } = props

  const theme = useTheme()
  const normalizedValue = Math.min(Math.max((value / max) * 100, 0), 100)
  const variant = 'variant' in props ? props.variant : 'linear'

  const renderLabel = () => {
    if (!showLabel) return null

    const label = labelFormat ? labelFormat(value, max) : `${Math.round(normalizedValue)}%`

    return (
      <Typography variant="caption" color="textSecondary" sx={{ ml: variant === 'linear' ? 1 : 0 }}>
        {label}
      </Typography>
    )
  }

  if (variant === 'circular') {
    return (
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <StyledCircularProgress
          variant="determinate"
          value={normalizedValue}
          size={getSize(size, 'circular')}
          color={color}
          {...rest}
        />
        {showLabel && (
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {renderLabel()}
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <StyledLinearProgress
        variant="determinate"
        value={normalizedValue}
        color={color}
        sx={{
          height: getSize(size, 'linear'),
          flexGrow: 1
        }}
        {...rest}
      />
      {renderLabel()}
    </Box>
  )
})

Progress.displayName = 'Progress'

// Export types for better DX
export type { LinearProgressProps, CircularProgressProps }
