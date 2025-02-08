import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Property Manager',
  description: 'Sign in to your Property Manager account',
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
