import {SignUp} from '@clerk/nextjs';
import {Box, Container, Paper, Typography} from '@mui/material';

export default function SignUpPage() {
  return (
    <Container
      maxWidth='sm'
      className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'
    >
      <Paper elevation={3} className='w-full p-8 space-y-8 hover-card'>
        <Box className='text-center'>
          <Typography variant='h4' component='h1' className='gradient-text font-bold'>
            Create Your Account
          </Typography>
          <Typography variant='body1' className='mt-2 text-muted-foreground'>
            Join us to manage your properties efficiently
          </Typography>
        </Box>

        <SignUp
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-none p-0 w-full',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 'hover:opacity-80 transition-opacity',
              formButtonPrimary: 'btn-primary rounded-md',
              formFieldInput: 'bg-background border-input',
              footer: 'hidden',
            },
          }}
        />
      </Paper>
    </Container>
  );
}
