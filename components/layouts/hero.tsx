'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import NextLogo from './next-logo'
import SupabaseLogo from './supabase-logo'

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(4),
}))

const StyledDivider = styled('span')(({ theme }) => ({
  height: 24,
  borderLeft: `1px solid ${theme.palette.divider}`,
  transform: 'rotate(45deg)',
}))

const HeroText = styled(Typography)(({ theme }) => ({
  maxWidth: '36rem', // max-w-xl
  textAlign: 'center',
  fontSize: theme.typography.h3.fontSize,
  lineHeight: 1.2,
  margin: '0 auto',
  [theme.breakpoints.up('lg')]: {
    fontSize: theme.typography.h2.fontSize,
  },
}))

const GradientDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(4, 0),
  background: `linear-gradient(to right, transparent, ${theme.palette.divider}, transparent)`,
}))

export default function Header() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 8 
    }}>
      <LogoWrapper>
        <Link
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </Link>
        <StyledDivider />
        <Link 
          href="https://nextjs.org/" 
          target="_blank" 
          rel="noreferrer"
        >
          <NextLogo />
        </Link>
      </LogoWrapper>

      <Typography variant="h1" sx={{ 
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}>
        Supabase and Next.js Starter Template
      </Typography>

      <HeroText component="p">
        The fastest way to build apps with{' '}
        <Link
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
          sx={{ 
            fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Supabase
        </Link>{' '}
        and{' '}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
          sx={{ 
            fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Next.js
        </Link>
      </HeroText>

      <GradientDivider />
    </Box>
  )
}
