import {Box, CircularProgress, Typography} from '@mui/material';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LoadingState({message = 'Loading...', size = 'medium'}: LoadingStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        gap: 2,
      }}
    >
      <CircularProgress size={size === 'small' ? 24 : size === 'medium' ? 40 : 56} />
      <Typography color='text.secondary'>{message}</Typography>
    </Box>
  );
}
