'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { WaitlistForm } from '@/components/forms/waitlist-form';
import { gradientStyles } from '@/utils/styles';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Property Management',
    description: 'Streamline your property management with our intuitive dashboard.',
  },
  {
    title: 'Payment Processing',
    description: 'Accept rent payments with multiple payment methods.',
  },
  {
    title: 'Tenant Portal',
    description: 'Give your tenants a modern portal to manage their lease.',
  },
  {
    title: 'Maintenance Tracking',
    description: 'Track and manage maintenance requests efficiently.',
  },
];

export default function WaitlistPage() {
  return (
    <Container maxWidth='lg' sx={{py: {xs: 8, md: 12}}}>
      <Box sx={{textAlign: 'center', mb: 8}}>
        <FadeIn delay={0.2}>
          <Typography
            variant='h1'
            sx={{
              fontSize: {xs: '2.5rem', md: '3.5rem'},
              fontWeight: 700,
              mb: 2,
              ...gradientStyles.text,
            }}
          >
            Modern Property Management
          </Typography>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Typography
            variant='h2'
            sx={{
              fontSize: {xs: '1.5rem', md: '2rem'},
              fontWeight: 500,
              color: 'text.secondary',
              mb: 4,
            }}
          >
            Join the waitlist for early access
          </Typography>
        </FadeIn>

        <FadeIn delay={0.6}>
          <WaitlistForm />
        </FadeIn>
      </Box>

      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.8}}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'},
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={feature.title}
              sx={{
                p: 4,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 2,
                  borderColor: 'primary.main',
                },
              }}
            >
              <Typography variant='h6' gutterBottom>
                {feature.title}
              </Typography>
              <Typography color='text.secondary'>{feature.description}</Typography>
            </Box>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
}
