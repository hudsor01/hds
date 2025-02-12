'use client'

import { Box, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useVirtualizer } from '@tanstack/react-virtual'
import { motion } from 'framer-motion'
import { useRef } from 'react'

interface VirtualizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  estimateSize?: number
  overscan?: number
}

export function VirtualizedList<T>({
  items,
  renderItem,
  estimateSize = 64,
  overscan = 5
}: VirtualizedListProps<T>) {
  const theme = useTheme()
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan
  })

  return (
    <Paper
      ref={parentRef}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        height: '100%',
        overflow: 'auto',
        position: 'relative',
        '&::-webkit-scrollbar': {
          width: 6,
          height: 6
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.divider,
          borderRadius: 3
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.text.disabled
        }
      }}
    >
      <Box
        sx={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map(virtualItem => (
          <Box
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
