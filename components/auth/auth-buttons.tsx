import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/auth-provider'

export function AuthButtons() {
  const { user, signOut } = useAuth()

  if (user) {
    return (
      <Button 
        variant="outline" 
        onClick={signOut}
        className="ml-4"
      >
        Sign Out
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        asChild
      >
        <Link href="/auth/signin">Sign In</Link>
      </Button>
      <Button 
        variant="default" 
        asChild
      >
        <Link href="/auth/signup">Sign Up</Link>
      </Button>
    </div>
  )
}