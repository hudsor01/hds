import { auth } from '@clerk/nextjs/server';
import { Box, Typography } from '@mui/material';

export async function ServerProfile() {
  const session = await auth();

  if (!session) {
    return (
      <Box p={3} textAlign='center'>
        <Typography variant='h6' color='text.secondary'>
          Please sign in to view server-side profile data
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant='h6' gutterBottom>
        Server-Side Profile Data
      </Typography>
      <Typography variant='body1'>User ID: {session.userId}</Typography>
      <Typography variant='body1'>Email: {session.emailAddresses?.[0]?.emailAddress}</Typography>
      {session.firstName && <Typography variant='body1'>Name: {session.firstName}</Typography>}
    </Box>
  );
}
