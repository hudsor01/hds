'use client';

import {Card} from '@/components/ui/card';
import {Box, Container, Grid, Typography} from '@mui/material';
import {Mail, MapPin, Phone} from 'react-feather';

const contactInfo = [
  {
    title: 'Email',
    value: 'info@hudsondigitalsolutions.com',
    icon: Mail,
  },
  {
    title: 'Phone',
    value: '+1 (555) 123-4567',
    icon: Phone,
  },
  {
    title: 'Address',
    value: '123 Business Street, Suite 100, New York, NY 10001',
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <Box className='min-h-screen bg-gradient-to-b from-background to-muted/20 py-20'>
      <Container maxWidth='lg'>
        <Box className='text-center mb-16'>
          <Typography variant='h2' className='font-bold mb-4'>
            Contact Us
          </Typography>
          <Typography variant='h5' color='text.secondary' className='max-w-3xl mx-auto'>
            Get in touch with our team to learn more about how we can help you manage your
            properties
          </Typography>
        </Box>

        <Grid container spacing={4} className='mb-16'>
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Grid item xs={12} md={4} key={info.title}>
                <Card className='p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1'>
                  <Box className='flex flex-col items-center text-center'>
                    <div className='rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4'>
                      <Icon className='h-6 w-6 text-primary' />
                    </div>
                    <Typography variant='h6' className='font-semibold mb-2'>
                      {info.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {info.value}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Card className='w-full p-6'>
          <Box className='aspect-video relative'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1832416846336!2d-73.98784532342246!3d40.75479597138413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca05ca48ab0c3a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1709701234567!5m2!1sen!2sus'
              width='100%'
              height='100%'
              style={{border: 0}}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='absolute inset-0'
            />
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
