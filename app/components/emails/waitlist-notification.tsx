import { type WaitlistEntry } from '@prisma/client'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import EmailLayout from './email-layout'

export default function WaitlistNotification({ entry }: { entry: WaitlistEntry }) {
  return (
    <Html>
      <Head />
      <Preview>New Waitlist Registration for HDS</Preview>
      <Body style={{ fontFamily: 'system-ui' }}>
        <Container>
          <Heading>New Waitlist Registration</Heading>
          <Text>Name: {entry.name}</Text>
          <Text>Email: {entry.email}</Text>
          {entry.company && <Text>Company: {entry.company}</Text>}
          <Text>Registered at: {entry.createdAt.toLocaleString()}</Text>
        </Container>
      </Body>
    </Html>
  )
}