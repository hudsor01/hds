'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

interface FormLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg'
  elevation?: number
}

const FormPaper = styled(Paper)(({ theme }) => ({
  maxWidth: '100%',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    borderRadius: theme.shape.borderRadius * 2
  }
}))

const FormBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

const FormContent = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
}))

const ActionsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3)
}))

const getMaxWidth = (size?: 'xs' | 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'xs':
      return '400px'
    case 'sm':
      return '600px'
    case 'md':
      return '800px'
    case 'lg':
      return '1000px'
    default:
      return '600px'
  }
}

export function FormLayout({ title, description, children, actions, maxWidth = 'sm', elevation = 1 }: FormLayoutProps) {
  return (
    <FormPaper elevation={elevation} sx={{ maxWidth: getMaxWidth(maxWidth) }}>
      <FormBox>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: '1.25rem',
              sm: '1.5rem'
            }
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>
        )}

        <Divider />

        <FormContent noValidate autoComplete="off">
          {children}
        </FormContent>

        {actions && (
          <>
            <Divider sx={{ mt: 3 }} />
            <ActionsBox>{actions}</ActionsBox>
          </>
        )}
      </FormBox>
    </FormPaper>
  )
}
