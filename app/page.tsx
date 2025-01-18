import '@/globals.css'
import { auth0 } from "../lib/auth0"

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="space-x-4">
          <a href="/auth/login?screen_hint=signup">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign up
            </button>
          </a>
          <a href="/auth/login">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Log in
            </button>
          </a>
        </div>
      </main>
    );
  }

  // If session exists, show a welcome message and logout button
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome, {session.user.name}!</h1>
      <a href="/auth/logout">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Log out
        </button>
      </a>
    </main>
  );
}
