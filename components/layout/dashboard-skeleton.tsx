import {Box, Container, Grid, Skeleton} from '@mui/material';

export function DashboardSkeleton() {
  return (
    <Container maxWidth='xl' sx={{py: 6}}>
      <Box sx={{mb: 8}}>
        <Skeleton variant='text' width={200} height={40} />
        <Skeleton variant='text' width={300} height={24} sx={{mt: 1}} />
      </Box>

      <Grid container spacing={4}>
        {[1, 2, 3, 4].map(i => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box sx={{p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1}}>
              <Skeleton variant='text' width={100} height={32} />
              <Skeleton variant='text' width={60} height={24} sx={{mt: 1}} />
              <Box sx={{mt: 4, display: 'flex', alignItems: 'center'}}>
                <Skeleton variant='text' width={60} />
                <Skeleton variant='text' width={100} sx={{ml: 1}} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
