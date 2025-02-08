import { Box, Typography } from '@mui/material';
import { useUser } from '../../app/auth/lib/auth/config';

export function UserProfile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <UserButton afterSignOutUrl="/" />
      <Typography>Welcome, {user?.firstName}</Typography>
    </Box>
  );
}
