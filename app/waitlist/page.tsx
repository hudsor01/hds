import { Metadata } from 'next'
import JoinForm from '@/components/waitlist/join-form'
import { Container, Typography } from '@mui/material'

export const metadata: Metadata = {
  title: 'Join the Waitlist | Property Manager',
  description: 'Join our exclusive waitlist to get early access to Property Manager.',
}

export default function WaitlistPage() {
  return (
    <Container maxWidth="md" className="py-12">
      <div className="text-center mb-8">
        <Typography variant="h3" component="h1" className="mb-4">
          Join the Waitlist
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className="mb-8">
          Be among the first to experience our revolutionary property management platform.
        </Typography>
      </div>

      <div className="max-w-md mx-auto">
        <JoinForm />
      </div>

      <div className="mt-12 text-center">
        <Typography variant="body2" color="textSecondary">
          Already joined? <a href="/waitlist/status" className="text-blue-600 hover:text-blue-800">Check your status</a>
        </Typography>
      </div>
    </Container>
  )
}
