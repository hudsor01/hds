import { auth } from '@/auth/lib/auth'
import { signOut } from 'next-auth/react'

export default async function HomePage() {
  const session = await auth()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>

          {session ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Logged in as:</h2>
                <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>

              <form action={async () => { 'use server'; await signOut() }}>
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">Not logged in</p>
              <a
                href="/auth/login"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
