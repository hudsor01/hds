import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

import { Box, Typography } from '@mui/material';

export async function ServerProfile() {
  const session = await getServerSession(authOptions);

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
      <Typography variant='body1'>User ID: {session.user.id}</Typography>
      <Typography variant='body1'>Email: {session.user.email}</Typography>
      {session.user.name && <Typography variant='body1'>Name: {session.user.name}</Typography>}
    </Box>
  );
}
