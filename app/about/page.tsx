'use client';

import {Box, Container, Grid, Paper, Typography} from '@mui/material';

export default function AboutPage() {
  return (
    <Box className='min-h-screen bg-gradient-to-b from-background to-muted/20 py-20'>
      <Container maxWidth='lg'>
        <Box className='space-y-12'>
          {/* Hero Section */}
          <Box className='text-center space-y-4'>
            <Typography variant='h1' className='gradient-text text-4xl font-bold sm:text-5xl'>
              About HDS
            </Typography>
            <Typography variant='h2' className='text-muted-foreground text-xl max-w-2xl mx-auto'>
              Transforming healthcare data management with modern technology and innovative
              solutions
            </Typography>
          </Box>

          {/* Mission Section */}
          <Paper elevation={3} className='p-8 hover-card'>
            <Typography variant='h3' className='text-2xl font-bold mb-4'>
              Our Mission
            </Typography>
            <Typography variant='body1' className='text-muted-foreground'>
              To provide healthcare professionals with powerful, intuitive tools for managing
              patient data, streamlining workflows, and improving patient care through better data
              management and analytics.
            </Typography>
          </Paper>

          {/* Values Section */}
          <Box className='space-y-6'>
            <Typography variant='h3' className='text-2xl font-bold text-center'>
              Our Values
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: 'Security First',
                  description:
                    'We prioritize the security and privacy of healthcare data above all else, ensuring HIPAA compliance and implementing industry-leading security measures.',
                },
                {
                  title: 'Innovation',
                  description:
                    'We continuously innovate and improve our solutions to meet the evolving needs of healthcare professionals.',
                },
                {
                  title: 'User-Centric',
                  description:
                    'We design our solutions with healthcare professionals in mind, focusing on intuitive interfaces and efficient workflows.',
                },
                {
                  title: 'Data Integrity',
                  description:
                    'We maintain the highest standards of data accuracy and reliability throughout our systems.',
                },
              ].map((value, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={2} className='h-full p-6 hover-card'>
                    <Typography variant='h5' className='mb-3 font-semibold'>
                      {value.title}
                    </Typography>
                    <Typography variant='body1' className='text-muted-foreground'>
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Team Section */}
          <Box className='space-y-6'>
            <Typography variant='h3' className='text-2xl font-bold text-center'>
              Our Team
            </Typography>
            <Typography
              variant='body1'
              className='text-muted-foreground text-center max-w-2xl mx-auto'
            >
              We are a team of dedicated professionals with extensive experience in healthcare
              technology, data security, and software development.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
