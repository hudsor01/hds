'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import type { SvgIconProps } from '@mui/material/SvgIcon'

export interface FeatureCardProps {
  title: string
  description: string
  icon: React.ComponentType<SvgIconProps>
  delay?: number
  onView?: () => void
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    '& .iconWrapper': {
      backgroundColor: theme.palette.primary.main + '33', // 20% opacity
      '& svg': {
        transform: 'scale(1.1)',
        color: theme.palette.primary.main
      }
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: `linear-gradient(to right, transparent, ${theme.palette.primary.main}33, transparent)`
  }
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main + '1A', // 10% opacity
  marginBottom: theme.spacing(2),
  '& svg': {
    width: 24,
    height: 24,
    transition: 'all 0.3s ease-in-out',
    color: theme.palette.primary.main
  }
}))

export function FeatureCard({ title, description, icon: Icon, delay = 0, onView }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && onView) {
      onView()
    }
  }, [isInView, onView])

  return (
    <Tooltip title={`Learn more about ${title}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        style={{ display: 'block' }}
      >
        <StyledCard elevation={0}>
          <IconWrapper className="iconWrapper">
            <Icon />
          </IconWrapper>
          <Typography variant="h6" component="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </StyledCard>
      </motion.div>
    </Tooltip>
  )
}
