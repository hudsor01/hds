import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface VerificationEmailProps {
  verificationUrl: string
  expiresIn: string
}

export default function VerificationEmail({ verificationUrl, expiresIn }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for Property Manager waitlist</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Verify your email address</Heading>
          <Text style={text}>
            Thank you for joining the Property Manager waitlist! Please verify your email address by
            clicking the button below:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={verificationUrl}>
              Verify Email Address
            </Button>
          </Section>
          <Text style={text}>
            Or copy and paste this URL into your browser:{' '}
            <Link href={verificationUrl} style={link}>
              {verificationUrl}
            </Link>
          </Text>
          <Text style={text}>This verification link will expire in {expiresIn}.</Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you didn't request this verification, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
}

const text = {
  color: '#444444',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px',
}

const buttonContainer = {
  margin: '30px 0',
}

const button = {
  backgroundColor: '#007FFF',
  borderRadius: '4px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '50px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '100%',
  maxWidth: '260px',
}

const link = {
  color: '#007FFF',
  textDecoration: 'underline',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#898989',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
}
