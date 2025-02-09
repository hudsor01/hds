import EmailLayout from './email-layout'
import { type WaitlistEntry } from '@prisma/client'
import { Container, Head, Heading, Preview, Section, Text } from '@react-email/components'

export default function WaitlistNotification({
  entry,
  totalSignups,
}: {
  entry: WaitlistEntry
  totalSignups: number
}) {
  return (
    <EmailLayout>
      <Head />
      <Preview>New Waitlist Registration #{totalSignups.toString()} for HDS</Preview>
      <Container>
        <Heading className="mb-4 text-2xl font-bold">New Waitlist Registration</Heading>
        <Section className="mb-4 rounded-lg bg-gray-50 p-4">
          <Text className="font-semibold">Total Signups: {totalSignups.toString()}</Text>
          <Text>Name: {entry.name}</Text>
          <Text>Email: {entry.email}</Text>
          {entry.company && <Text>Company: {entry.company}</Text>}
          <Text>Registered at: {entry.createdAt.toLocaleString()}</Text>
        </Section>
      </Container>
    </EmailLayout>
  )
}
