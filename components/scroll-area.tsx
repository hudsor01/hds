'use client'

import React from 'react'
import { Box, styled, useTheme, type Theme, type BoxProps, type SxProps } from '@mui/material'

type Orientation = 'vertical' | 'horizontal' | 'both'

interface StyledScrollAreaProps extends BoxProps {
  hideScrollbar?: boolean
  orientation?: Orientation
}

// Styled components with proper type safety
const StyledScrollArea = styled(Box, {
  shouldForwardProp: (prop): prop is keyof BoxProps => !['hideScrollbar', 'orientation'].includes(prop as string)
})<StyledScrollAreaProps>(({ theme, hideScrollbar, orientation = 'vertical' }) => ({
  position: 'relative',
  overflow: 'auto',

  ...(hideScrollbar && {
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }),

  ...(!hideScrollbar && {
    scrollbarWidth: 'thin' as const,
    scrollbarColor: `${theme.palette.divider} transparent`,

    '&::-webkit-scrollbar': {
      width: orientation !== 'horizontal' ? '8px' : '0px',
      height: orientation !== 'vertical' ? '8px' : '0px',
      backgroundColor: 'transparent'
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      margin: theme.spacing(1)
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.divider,
      borderRadius: '4px',
      border: '2px solid transparent',
      backgroundClip: 'padding-box' as const,

      '&:hover': {
        backgroundColor: theme.palette.action.hover
      },

      '&:active': {
        backgroundColor: theme.palette.action.selected
      }
    }
  })
}))

interface ScrollAreaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'css'> {
  hideScrollbar?: boolean
  orientation?: Orientation
  maxHeight?: string | number
  maxWidth?: string | number
  viewportRef?: React.RefObject<HTMLDivElement>
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
  sx?: SxProps<Theme>
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    { children, hideScrollbar = false, orientation = 'vertical', maxHeight, maxWidth, viewportRef, onScroll, sx, ...props },
    ref
  ) => {
    const theme = useTheme()

    return (
      <StyledScrollArea
        ref={ref}
        hideScrollbar={hideScrollbar}
        orientation={orientation}
        sx={{
          maxHeight,
          maxWidth,
          ...sx
        }}
        onScroll={onScroll}
        {...props}
      >
        <Box ref={viewportRef}>{children}</Box>
      </StyledScrollArea>
    )
  }
)

ScrollArea.displayName = 'ScrollArea'

// Export types
export type { ScrollAreaProps, Orientation }

// Type-safe utility function for common scroll area configurations
interface ScrollAreaConfig {
  maxHeight?: string | number
  maxWidth?: string | number
  orientation?: Orientation
  hideScrollbar?: boolean
}

export const createScrollArea = (config: ScrollAreaConfig): typeof ScrollArea => {
  const StyledComponent = styled(ScrollArea)(() => ({
    maxHeight: config.maxHeight,
    maxWidth: config.maxWidth
  }))

  // Preserve component name and ref forwarding
  StyledComponent.displayName = 'CreatedScrollArea'

  return React.forwardRef<HTMLDivElement, ScrollAreaProps>((props, ref) => <StyledComponent {...config} {...props} ref={ref} />)
}
