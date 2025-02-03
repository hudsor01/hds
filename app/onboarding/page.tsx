'use client';

import {createClerkSupabaseClient} from '@/utils/supabase';
import {useUser} from '@clerk/nextjs';
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const steps = ['Basic Information', 'Property Details', 'Preferences'];

export default function OnboardingPage() {
  const {user} = useUser();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: '',
    companyName: '',
    propertyType: '',
    numberOfProperties: '',
    preferredContactMethod: '',
  });

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const supabase = createClerkSupabaseClient();

      // Save onboarding data to Supabase
      const {error} = await supabase.from('user_profiles').insert([
        {
          user_id: user?.id,
          ...formData,
        },
      ]);

      if (error) throw error;

      // Update user metadata in Clerk
      await user?.update({
        firstName: formData.fullName.split(' ')[0],
        lastName: formData.fullName.split(' ').slice(1).join(' '),
        unsafeMetadata: {
          phoneNumber: formData.phoneNumber,
          companyName: formData.companyName,
        },
      });

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Onboarding error:', err);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className='space-y-4'>
            <TextField
              fullWidth
              label='Full Name'
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              className='bg-background'
            />
            <TextField
              fullWidth
              label='Phone Number'
              value={formData.phoneNumber}
              onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
              className='bg-background'
            />
            <TextField
              fullWidth
              label='Company Name'
              value={formData.companyName}
              onChange={e => setFormData({...formData, companyName: e.target.value})}
              className='bg-background'
            />
          </Box>
        );
      case 1:
        return (
          <Box className='space-y-4'>
            <TextField
              fullWidth
              label='Property Type'
              value={formData.propertyType}
              onChange={e => setFormData({...formData, propertyType: e.target.value})}
              className='bg-background'
            />
            <TextField
              fullWidth
              label='Number of Properties'
              type='number'
              value={formData.numberOfProperties}
              onChange={e => setFormData({...formData, numberOfProperties: e.target.value})}
              className='bg-background'
            />
          </Box>
        );
      case 2:
        return (
          <Box className='space-y-4'>
            <TextField
              fullWidth
              label='Preferred Contact Method'
              value={formData.preferredContactMethod}
              onChange={e => setFormData({...formData, preferredContactMethod: e.target.value})}
              className='bg-background'
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth='md' className='min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <Paper elevation={3} className='p-8 space-y-8 hover-card'>
        <Box className='text-center'>
          <Typography variant='h4' component='h1' className='gradient-text font-bold'>
            Complete Your Profile
          </Typography>
          <Typography variant='body1' className='mt-2 text-muted-foreground'>
            Help us personalize your experience
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} className='py-8'>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : undefined}>
          {renderStepContent(activeStep)}

          <Box className='mt-8 flex justify-between'>
            <Button disabled={activeStep === 0} onClick={handleBack} className='btn-outline'>
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button type='submit' variant='contained' className='btn-primary'>
                Complete
              </Button>
            ) : (
              <Button onClick={handleNext} variant='contained' className='btn-primary'>
                Next
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
