import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getSession() {
  const supabase = createClient()
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = createClient()
  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/auth/signin')
  }
  return session
}

export async function checkAuth() {
  const cookieStore = cookies()
  const supabase = createClient()

  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()
    if (error) throw error
    return !!session
  } catch (error) {
    console.error('Error checking auth:', error)
    return false
  }
}
