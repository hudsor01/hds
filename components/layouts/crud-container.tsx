'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import { useProtectedRoute } from '@/hooks/use-protected-route'

// Base interface for CRUD items
export interface BaseCrudItem {
  id: string | number
  [key: string]: unknown
}

// Props interface for the CrudContainer
export interface CrudContainerProps<T extends BaseCrudItem> {
  title: string
  children: React.ReactNode
  loading?: boolean
  className?: string
  actions?: React.ReactNode
}

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}))

const HeaderBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(4),
  },
}))

const LoadingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 256, // equivalent to h-64
  padding: theme.spacing(4),
}))

export function CrudContainer<T extends BaseCrudItem>({
  title,
  children,
  loading = false,
  className = '',
  actions
}: CrudContainerProps<T>) {
  useProtectedRoute()

  return (
    <StyledContainer 
      maxWidth="xl"
      className={className}
    >
      <HeaderBox>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontWeight: 'bold',
            fontSize: {
              xs: '1.5rem', // text-2xl
              sm: '1.875rem', // text-3xl
            },
          }}
        >
          {title}
        </Typography>
        {actions && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {actions}
          </Box>
        )}
      </HeaderBox>

      {loading ? (
        <LoadingBox>
          <CircularProgress 
            size={40}
            thickness={4}
          />
        </LoadingBox>
      ) : (
        children
      )}
    </StyledContainer>
  )
}
