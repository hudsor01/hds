import { routes } from './routes'

export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to sign out')
    }

    // Redirect to home page after successful sign out
    window.location.href = routes.home
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}
