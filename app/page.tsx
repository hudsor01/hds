import { Button } from '@/components/ui/button'
import { getSession } from '@auth0/nextjs-auth0'

export default async function Home() {
  const session = await getSession();

  return (
    <main className="container mx-auto px-4 py-8">
      {!session ? (
        <div className="flex gap-4">
          <a href="/api/auth/login?returnTo=/dashboard">
            <Button variant="outline">Log in</Button>
          </a>
          <a href="/api/auth/login?screen_hint=signup&returnTo=/dashboard">
            <Button>Sign up</Button>
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
          <a href="/api/auth/logout">
            <Button variant="outline">Log out</Button>
          </a>
        </div>
      )}
    </main>
  );
}
