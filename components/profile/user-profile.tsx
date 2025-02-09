'use client'

import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'

export function UserProfile() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return <UserProfileSkeleton />
  }

  const handleEditProfile = () => {
    router.push('/user/settings')
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={user?.imageUrl} alt={user?.fullName || ''} sx={{ width: 72, height: 72 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5">{user?.fullName}</Typography>
          <Typography color="text.secondary">{user?.primaryEmailAddress?.emailAddress}</Typography>
        </Box>
        <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditProfile}>
          Edit Profile
        </Button>
      </Box>
    </Paper>
  )
}

function UserProfileSkeleton() {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton variant="circular" width={72} height={72} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width={200} sx={{ fontSize: '2rem' }} />
          <Skeleton variant="text" width={160} />
        </Box>
        <Skeleton variant="rectangular" width={120} height={36} />
      </Box>
    </Paper>
  )
}
