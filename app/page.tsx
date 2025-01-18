'use client'

import { signIn } from "next-auth/react"

export default function Home() {
  return (
    <main>
      <h1>Hudson Digital Solutions</h1>
      <button onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </main>
  )
}
