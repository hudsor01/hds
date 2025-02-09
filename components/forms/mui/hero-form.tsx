import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function HeroForm() {
  const theme = useTheme()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    // Handle email submission
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', gap: 2, maxWidth: 600 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter your email"
          {...register('email', { required: true })}
          error={!!errors.email}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 1,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            borderRadius: 2,
            px: 4,
            bgcolor: theme.palette.secondary.main,
            '&:hover': { bgcolor: theme.palette.secondary.dark },
          }}
        >
          Get Early Access
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
        Join our beta program. No credit card required.
      </Typography>
    </form>
  )
}
