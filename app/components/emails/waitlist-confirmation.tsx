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

export default function WaitlistConfirmation({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the HDS Waitlist</Preview>
      <Body style={{ fontFamily: 'system-ui' }}>
        <Container>
          <Heading>Welcome to HDS, {name}!</Heading>
          <Text>Thank you for joining our waitlist.</Text>
          <Text>
            We're excited to have you on board. We'll notify you as soon as we launch
            with exclusive early access.
          </Text>
          <Text style={{ color: '#666', marginTop: '24px' }}>
            Best regards,<br />
            The HDS Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}