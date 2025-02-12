'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const StyledAuthContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3)
}))

export function EnhancedSignIn() {
  return (
    <StyledAuthContainer>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: {
                  fontSize: '16px',
                  fontWeight: 500,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                },
                card: {
                  boxShadow: 'none',
                  backgroundColor: 'transparent'
                },
                headerTitle: {
                  fontSize: '24px',
                  fontWeight: 600
                },
                headerSubtitle: {
                  fontSize: '16px'
                },
                socialButtonsBlockButton: {
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }
              }
            }}
          />
        </Paper>
      </Container>
    </StyledAuthContainer>
  )
}
