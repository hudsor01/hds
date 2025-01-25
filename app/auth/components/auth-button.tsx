'use client'

import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"

export function AuthButton() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  if (isLoading) {
    return <Button disabled>Loading...</Button>
  }

  if (session) {
    return (
      <Button
        variant="outline"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    )
  }

  return (
    <Button
      onClick={() => signIn("google")}
    >
      Sign In with Google
    </Button>
  )
}
