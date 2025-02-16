'use client'

import { Box, styled } from '@mui/material'
import * as React from 'react'

const StyledScrollArea = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    backgroundColor: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))

const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <StyledScrollArea ref={ref} className={className} {...props}>
      {children}
    </StyledScrollArea>
  )
)
ScrollArea.displayName = 'ScrollArea'

export { ScrollArea }
