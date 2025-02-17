'use client'

import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress, 
  Paper,
  useTheme,
  type Theme,
  type SxProps,
  type TextFieldProps
} from '@mui/material'
import { CheckCircle, Email, Phone } from '@mui/icons-material'
import { type ReactNode } from 'react'
import { useFormState } from '@/hooks/use-form-state'

type VerificationType = 'email' | 'phone'
type VerificationStep = 'input' | 'verify' | 'success'

interface VerificationFormState {
  value: string
  code: string
  step: VerificationStep
}

interface VerificationFormProps {
  title: string
  description: string
  icon: ReactNode
  onSubmit: (value: string) => Promise<void>
  type: VerificationType
  inputProps?: Partial<TextFieldProps>
}

interface FormStyles {
  container: SxProps<Theme>
  paper: SxProps<Theme>
  form: SxProps<Theme>
  contentBox: SxProps<Theme>
  icon: SxProps<Theme>
  alert: SxProps<Theme>
}

const INITIAL_STATE: VerificationFormState = {
  value: '',
  code: '',
  step: 'input'
}

const styles: FormStyles = {
  container: {
    py: 8
  },
  paper: {
    p: 6,
    width: '100%',
    maxWidth: 480,
    mx: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    textAlign: 'center'
  },
  icon: {
    fontSize: 48,
    mb: 2
  },
  alert: {
    mt: 2
  }
}

const getVerificationIcon = (type: VerificationType): ReactNode => {
  switch (type) {
    case 'email':
      return <Email />
    case 'phone':
      return <Phone />
    default:
      return null
  }
}

export function VerificationForm({ 
  title, 
  description, 
  icon, 
  onSubmit, 
  type, 
  inputProps 
}: VerificationFormProps) {
  const theme = useTheme()
  const { 
    state, 
    setFormData, 
    startSubmitting, 
    setError, 
    endSubmitting 
  } = useFormState<VerificationFormState>(INITIAL_STATE)

  const handleInitialSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    startSubmitting()
    try {
      await onSubmit(state.data.value)
      setFormData({ step: 'verify' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      endSubmitting()
    }
  }

  const handleVerifySubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    startSubmitting()
    try {
      // Verification logic here
      setFormData({ step: 'success' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      endSubmitting()
    }
  }

  if (state.data.step === 'success') {
    return (
      <Box sx={styles.container}>
        <Paper sx={styles.paper}>
          <Box sx={styles.contentBox}>
            <CheckCircle color="success" sx={styles.icon} />
            <Typography variant="h4" component="h1">
              Verification Successful
            </Typography>
            <Typography color="text.secondary">
              Your {type} has been verified and added to your account
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  }

  const isInputStep = state.data.step === 'input'
  const fieldValue = isInputStep ? state.data.value : state.data.code
  const isSubmitDisabled = state.isSubmitting || !fieldValue

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paper}>
        <Box
          component="form"
          onSubmit={isInputStep ? handleInitialSubmit : handleVerifySubmit}
          sx={styles.form}
          noValidate
        >
          <Box sx={styles.contentBox}>
            {icon}
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
            <Typography color="text.secondary">
              {description}
            </Typography>
          </Box>

          {state.error && (
            <Alert severity="error" sx={styles.alert}>
              {state.error}
            </Alert>
          )}

          <TextField
            fullWidth
            label={isInputStep ? (type === 'email' ? 'Email Address' : 'Phone Number') : 'Verification Code'}
            value={fieldValue}
            onChange={(e) => {
              setFormData({ 
                [isInputStep ? 'value' : 'code']: e.target.value 
              })
            }}
            disabled={state.isSubmitting}
            placeholder={isInputStep ? undefined : 'Enter verification code'}
            helperText={!isInputStep ? `Enter the code sent to your ${type}` : undefined}
            error={!!state.error}
            size="small"
            InputProps={{
              startAdornment: isInputStep ? getVerificationIcon(type) : undefined
            }}
            {...inputProps}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isSubmitDisabled}
            startIcon={state.isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              icon
            )}
          >
            {state.isSubmitting
              ? 'Submitting...'
              : isInputStep
                ? `Add ${type === 'email' ? 'Email' : 'Phone'}`
                : 'Verify Code'}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

// Export types for potential consumers
export type { 
  VerificationFormProps, 
  VerificationFormState, 
  VerificationType, 
  VerificationStep 
}
