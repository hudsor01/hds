import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <nav className="flex w-full justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">Property Manager</h1>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
                <form action="/api/auth/signout" method="post">
                  <Button variant="outline">Sign out</Button>
                </form>
              </div>
            ) : (
              <form action="/api/auth/signin" method="post">
                <Button>Sign in</Button>
              </form>
            )}
          </div>
        </nav>
      </div>

      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold">
          <span className="text-blue-500">Simplify</span> Property Management
        </h1>
        <p className="text-xl text-gray-600">
          Streamline your property management with our comprehensive platform. From
          rent collection to maintenance requests, we've got you covered.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Powerful <span className="text-blue-500">Features</span>
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Everything you need to manage your properties efficiently
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Property Management</h3>
            <p className="text-gray-600">Streamline your property operations with our intelligent management tools and automated workflows.</p>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Data Handling</h3>
            <p className="text-gray-600">Your data is protected with enterprise-grade security and regular backups.</p>
          </div>

          <div className="p-6 border rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-tenant Support</h3>
            <p className="text-gray-600">Manage multiple properties and tenants from a single, unified dashboard.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
