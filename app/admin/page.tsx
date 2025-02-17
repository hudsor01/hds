import { redirect } from 'next/navigation'
import { Typography, Paper, Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { SearchUsers } from './SearchUsers'
import { removeRole, setRole } from './_actions'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/db.types'

interface AdminPageProps {
  searchParams: { search?: string }
}

export default async function AdminDashboard({ searchParams }: AdminPageProps) {
  const supabase = createClient()

  // Check if user is admin
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user?.user_metadata['role'] || user.user_metadata['role'] !== 'admin') {
    redirect('/')
  }

  // Search users if query exists
  let users: Database['public']['Tables']['users']['Row'][] = []
  if (searchParams.search) {
    const { data, error } = await supabase.from('users').select('*').ilike('email', `%${searchParams.search}%`)

    if (!error) {
      users = data
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        This is the protected admin dashboard restricted to users with the `admin` role.
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <SearchUsers />
      </Paper>

      <Grid container spacing={3}>
        {users.map(user => (
          <Grid item xs={12} md={6} lg={4} key={user.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">{user.full_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role: {user.role || 'No role assigned'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <button
                    type="submit"
                    style={{
                      background: '#1976d2',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Make Admin
                  </button>
                </form>

                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="moderator" name="role" />
                  <button
                    type="submit"
                    style={{
                      background: '#2e7d32',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Make Moderator
                  </button>
                </form>

                <form action={removeRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <button
                    type="submit"
                    style={{
                      background: '#d32f2f',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove Role
                  </button>
                </form>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
