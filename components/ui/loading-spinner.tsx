'use client'

import { CircularProgress, Box } from '@mui/material'
import { motion } from 'framer-motion'
import { scaleInOut } from '@/lib/animation-variants'

const MotionBox = motion(Box)

export function LoadingSpinner() {
  return (
    <MotionBox
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4
      }}
      variants={scaleInOut}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <CircularProgress />
    </MotionBox>
  )
}
