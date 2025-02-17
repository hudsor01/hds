'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Box, Container, Typography, Button, useTheme, Paper } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import Link from 'next/link'

interface ContactSuccessProps {
  message?: string
  title?: string
}

export function ContactSuccess({
  message = "We've received your message and will get back to you shortly.",
  title = 'Thank You!'
}: ContactSuccessProps) {
  const theme = useTheme()

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
            >
              <CheckCircle
                color="success"
                sx={{
                  fontSize: 64,
                  mb: 2
                }}
              />
            </motion.div>
          </Box>

          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {message}
          </Typography>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Back to Home
            </Button>
          </motion.div>
        </Paper>
      </motion.div>
    </Container>
  )
}
