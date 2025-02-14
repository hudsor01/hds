import { redirect } from 'next/navigation'
import { SearchUsers } from './SearchUsers'
import { removeRole, setRole } from './_actions'
import supabase from '../../lib/supabase'
import { Auth } from '@/types/types' // Import the namespace

const { User, EmailAddress } = Auth // Destructure the types from the namespace

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>
}) {
  if (!(await checkRole('admin'))) {
    redirect('/')
  }

  const query = (await params.searchParams).search

  const users = query ? (await supabase.users.getCurrentUserList({ query })).data : []

  return (
    <>
      <p>This is the protected admin dashboard restricted to users with the `admin` role.</p>

      <SearchUsers />

      {users.map((user: User) => {
        return (
          <div key={user.id}>
            <div>
              {user.firstName} {user.lastName}
            </div>

            <div>
              {
                user.emailAddresses.find(
                  (email: EmailAddress) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>

            <div>{user.publicMetadata.role as string}</div>

            <form action={setRole}>
              <input type="hidden" value={user.id} name="id" />
              <input type="hidden" value="admin" name="role" />
              <button type="submit">Make Admin</button>
            </form>

            <form action={setRole}>
              <input type="hidden" value={user.id} name="id" />
              <input type="hidden" value="moderator" name="role" />
              <button type="submit">Make Moderator</button>
            </form>

            <form action={removeRole}>
              <input type="hidden" value={user.id} name="id" />
              <button type="submit">Remove Role</button>
            </form>
          </div>
        )
      })}
    </>
  )
}

async function checkRole(role: string) {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user?.user_metadata?.role === role
}
