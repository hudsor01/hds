'use client'

import { motion } from 'framer-motion'
import NextLink from 'next/link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { format } from 'date-fns'

const StyledFooter = styled(motion.footer)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: 'auto',
  padding: theme.spacing(3, 0),
  backgroundColor: theme.palette.background.paper
}))

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontSize: theme.typography.body2.fontSize,
  '&:hover': {
    color: theme.palette.text.primary
  }
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(['color', 'background-color']),
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main + '10'
  }
}))

const socialLinks = [
  {
    icon: EmailIcon,
    href: 'mailto:contact@hdsplatform.com',
    label: 'Email'
  },
  {
    icon: TwitterIcon,
    href: 'https://twitter.com/hdsplatform',
    label: 'Twitter'
  },
  {
    icon: GitHubIcon,
    href: 'https://github.com/hdsplatform',
    label: 'GitHub'
  },
  {
    icon: LinkedInIcon,
    href: 'https://linkedin.com/company/hdsplatform',
    label: 'LinkedIn'
  }
]

export function Footer() {
  const year = format(new Date(), 'yyyy')

  return (
    <StyledFooter initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <CopyrightIcon fontSize="small" />
              {year} HDS Platform
            </Typography>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />

            <NextLink href="/privacy" passHref legacyBehavior>
              <StyledLink>Privacy Policy</StyledLink>
            </NextLink>

            <NextLink href="/terms" passHref legacyBehavior>
              <StyledLink>Terms of Service</StyledLink>
            </NextLink>
          </Stack>

          <Stack direction="row" spacing={1}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.div key={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <StyledIconButton component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </StyledIconButton>
              </motion.div>
            ))}
          </Stack>
        </Box>
      </Container>
    </StyledFooter>
  )
}
