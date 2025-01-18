import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Hudson Digital Solutions
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Streamline your property management with our comprehensive digital solutions.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
