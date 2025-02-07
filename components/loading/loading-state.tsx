'use client';

import {Box, CircularProgress, Container, Typography} from '@mui/material';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export default function LoadingState({
  message = 'Loading...',
  fullPage = false,
}: LoadingStateProps) {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <CircularProgress
        size={40}
        sx={{
          color: theme => theme.palette.primary.main,
          mb: 2,
        }}
      />
      <Typography color='text.secondary'>{message}</Typography>
    </Box>
  );

  if (fullPage) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.default',
          zIndex: theme => theme.zIndex.modal - 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {content}
      </Box>
    );
  }

  return <Container maxWidth='md'>{content}</Container>;
}
