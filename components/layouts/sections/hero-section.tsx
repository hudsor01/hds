'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Alert from '@mui/material/Alert'
import { motion } from 'framer-motion'
import { styled } from '@mui/material/styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Validation schema for the waitlist form
const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters')
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

// Styled components
const StyledHeroSection = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 0),
  backgroundColor: 'rgb(228, 242, 255)', // Pastel blue base
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(
      135deg,
      rgba(228, 242, 255, 0.9) 0%,
      rgba(208, 232, 255, 0.9) 50%,
      rgba(188, 222, 255, 0.9) 100%
    )`,
    zIndex: 1
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(16, 0)
  }
}))

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center'
}))

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 700,
  fontSize: '2.5rem',
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.dark} 0%, 
    ${theme.palette.primary.main} 50%, 
    ${theme.palette.primary.light} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.up('md')]: {
    fontSize: '3.5rem'
  }
}))

const WaitlistForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4]
}))

const StyledSuccessDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2)
  }
}))

export function HeroSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { control, handleSubmit, reset } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: '',
      name: ''
    }
  })

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Here you would typically make an API call to your waitlist endpoint
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Show success dialog
      setShowSuccess(true)
      reset()
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <StyledHeroSection>
      <Container maxWidth="lg">
        <ContentWrapper>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <HeroTitle variant="h1">Revolutionizing Property Management</HeroTitle>

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: 'text.secondary',
                maxWidth: 800,
                mx: 'auto',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Join the waitlist for early access to our comprehensive platform that streamlines your real estate operations.
            </Typography>

            <WaitlistForm elevation={0}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Your Name"
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        disabled={isSubmitting}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        disabled={isSubmitting}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      height: 48,
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '1.1rem'
                    }}
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </Button>
                </Box>
              </form>
            </WaitlistForm>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontFamily: 'Roboto, sans-serif' }}>
              No credit card required. Get notified when we launch.
            </Typography>
          </motion.div>
        </ContentWrapper>
      </Container>

      <StyledSuccessDialog
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false)
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: 'Roboto, sans-serif' }}>Welcome to the Waitlist! 🎉</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for joining our waitlist! We'll notify you as soon as we launch. In the meantime, check your email for a
            confirmation and updates about our progress.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSuccess(false)
            }}
            variant="contained"
            sx={{ textTransform: 'none', fontFamily: 'Roboto, sans-serif' }}
          >
            Got it
          </Button>
        </DialogActions>
      </StyledSuccessDialog>
    </StyledHeroSection>
  )
}
