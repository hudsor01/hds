'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type FormValues = z.infer<typeof formSchema>

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create(['box-shadow', 'background-color']),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[2],
    },
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1.5, 4),
  whiteSpace: 'nowrap',
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}))

export default function HeroForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)
      // Handle email submission
      console.log(data)
      // Add your email submission logic here
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
      }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <StyledTextField
              fullWidth
              placeholder="Enter your email"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
              {...field}
            />
          )}
        />
        
        <StyledButton
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Get Early Access'}
        </StyledButton>
      </Box>
      
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ 
          mt: 1,
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        Join our beta program. No credit card required.
      </Typography>
    </StyledForm>
  )
}
