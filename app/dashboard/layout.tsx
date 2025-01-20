'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Box, Container } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useState } from 'react'

const DRAWER_WIDTH = 260

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
}

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.2 } }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
        bgcolor: theme => alpha(theme.palette.primary.main, 0.02)
      }}
    >
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Header onOpenSidebar={() => setOpen(true)} />

        <Container
          component={motion.div}
          variants={contentVariants}
          maxWidth="xl"
          sx={{
            py: { xs: 3, sm: 5, md: 6 },
            px: { xs: 2, sm: 3 },
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}
