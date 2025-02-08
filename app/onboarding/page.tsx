'use client';

import { Button } from '@/components/ui/buttons/button';
import { Card } from '@/components/ui/cards/card';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const steps = ['Personal Information', 'Property Details', 'Preferences'];

interface OnboardingData {
  firstName: string;
  lastName: string;
  state: string;
  propertyCount: string;
  propertyTypes: string[];
  managementStyle: string;
}

const initialData: OnboardingData = {
  firstName: '',
  lastName: '',
  state: '',
  propertyCount: '',
  propertyTypes: [],
  managementStyle: '',
};

const states = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

const propertyTypes = [
  'Single Family Home',
  'Multi-Family Home',
  'Apartment Building',
  'Condominium',
  'Townhouse',
  'Commercial Property',
];

const managementStyles = [
  'Hands-on (Self-managed)',
  'Partially delegated',
  'Fully delegated to property manager',
];

export default function OnboardingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        // Update user metadata
        await user?.update({
          firstName: formData.firstName,
          lastName: formData.lastName,
          unsafeMetadata: {
            state: formData.state,
            propertyCount: formData.propertyCount,
            propertyTypes: formData.propertyTypes,
            managementStyle: formData.managementStyle,
            onboardingCompleted: true,
          },
        });

        toast.success('Profile updated successfully!');
        router.push('/dashboard');
      } catch (error) {
        toast.error('Failed to update profile. Please try again.');
        console.error('Error updating profile:', error);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleTextChange =
    (field: keyof OnboardingData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSelectChange =
    (field: keyof OnboardingData) =>
    (event: SelectChangeEvent<string | string[]>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.firstName && formData.lastName;
      case 1:
        return formData.state && formData.propertyCount;
      case 2:
        return formData.propertyTypes.length > 0 && formData.managementStyle;
      default:
        return true;
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box className="space-y-4">
            <TextField
              fullWidth
              label="First Name"
              value={formData.firstName}
              onChange={handleTextChange('firstName')}
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={handleTextChange('lastName')}
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box className="space-y-4">
            <FormControl fullWidth required>
              <InputLabel>State</InputLabel>
              <Select
                value={formData.state}
                label="State"
                onChange={handleSelectChange('state')}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Number of Properties</InputLabel>
              <Select
                value={formData.propertyCount}
                label="Number of Properties"
                onChange={handleSelectChange('propertyCount')}
              >
                {['1-5', '6-10', '11-20', '21-50', '50+'].map((count) => (
                  <MenuItem key={count} value={count}>
                    {count}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box className="space-y-4">
            <FormControl fullWidth required>
              <InputLabel>Property Types</InputLabel>
              <Select
                multiple
                value={formData.propertyTypes}
                label="Property Types"
                onChange={handleSelectChange('propertyTypes')}
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select all that apply</FormHelperText>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Management Style</InputLabel>
              <Select
                value={formData.managementStyle}
                label="Management Style"
                onChange={handleSelectChange('managementStyle')}
              >
                {managementStyles.map((style) => (
                  <MenuItem key={style} value={style}>
                    {style}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <Container maxWidth="md" className="min-h-screen py-12">
      <Card className="p-8">
        <Box className="mb-8 text-center">
          <Typography variant="h4" component="h1" className="mb-2 font-bold">
            Welcome to HDS
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Let's set up your profile to get started
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box className="mb-8">{getStepContent(activeStep)}</Box>

        <Box className="flex justify-between">
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outline"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            variant="default"
          >
            {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
