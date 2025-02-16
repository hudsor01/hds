'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Container,
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  Stack
} from '@mui/material'
import { 
  Email as EmailIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Copyright as CopyrightIcon
} from '@mui/icons-material'
import { format } from 'date-fns'

export function Footer() {
  const theme = useTheme()
  const year = format(new Date(), 'yyyy')

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

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: 'auto',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        background: theme.palette.background.paper
      }}
    >
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
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <CopyrightIcon fontSize="small" />
              {year} HDS Platform
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Link 
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </Stack>

          <Stack direction="row" spacing={1}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.div
                key={href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  aria-label={label}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      background: theme.palette.primary.main + '10'
                    }
                  }}
                >
                  <Icon />
                </IconButton>
              </motion.div>
            ))}
          </Stack>
        </Box>
      </Container>
    </motion.footer>
  )
}