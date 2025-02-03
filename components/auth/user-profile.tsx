import {UserButton, useUser} from '@clerk/nextjs';
import {Box, Typography} from '@mui/material';

export function UserProfile() {
  const {user, isLoaded} = useUser();

  if (!isLoaded) return null;

  return (
    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
      <UserButton afterSignOutUrl='/' />
      <Typography>Welcome, {user?.firstName}</Typography>
    </Box>
  );
}
