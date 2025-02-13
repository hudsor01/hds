import { supabase } from '@/utils/supabase/server'
import { Box, Typography } from '@mui/material'

export async function ServerProfile() {
  const supabase = await supabase()
  const {
    data: { user }
  } = await supabase.auth.getCurrentUser()

  if (!user) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6" color="text.secondary">
          Please sign in to view server-side profile data
        </Typography>
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Server-Side Profile Data
      </Typography>
      <Typography variant="body1">User ID: {user.id}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      {user.user_metadata.firstName && (
        <Typography variant="body1">Name: {user.user_metadata.firstName}</Typography>
      )}
    </Box>
  )
}
