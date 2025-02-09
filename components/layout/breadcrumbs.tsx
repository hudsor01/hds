'use client'

import HomeIcon from '@mui/icons-material/Home'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export function BreadcrumbNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Generate breadcrumb items from pathname
  const pathSegments = pathname.split('/').filter((segment) => segment)
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === pathSegments.length - 1

    return isLast ? (
      <Typography key={href} color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
        {label}
      </Typography>
    ) : (
      <Link key={href} href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {label}
        </Typography>
      </Link>
    )
  })

  // Add home link at the beginning
  breadcrumbs.unshift(
    <Link key="home" href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
        Dashboard
      </Typography>
    </Link>
  )

  return (
    <Box sx={{ mb: 3, mt: 1 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  )
}
