import EmailLayout, { button, footer, link, text } from '../layout'
import { Button, Heading, Hr, Link, Section, Text } from '@react-email/components'

interface WelcomeEmailProps {
  position: number
  referralCode: string
}

export default function WelcomeEmail({ position, referralCode }: WelcomeEmailProps) {
  const previewText = `You're #${position} on our waitlist!`
  const shareUrl = `https://hudsondigitalsolutions.com/?ref=${referralCode}`

  return (
    <EmailLayout preview={previewText}>
      <Heading style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px' }}>
        Welcome to Property Manager!
      </Heading>

      <Text style={text}>
        Thanks for joining our waitlist. You're currently in position #{position}.
      </Text>

      <Section
        style={{
          padding: '24px',
          border: 'solid 1px #dedede',
          borderRadius: '8px',
          margin: '40px 0',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Text style={text}>Want to move up the list? Share your referral code with friends:</Text>
        <Text
          style={{
            fontFamily: 'monospace',
            fontSize: '32px',
            fontWeight: 'bold',
            letterSpacing: '4px',
            textAlign: 'center',
            color: '#007FFF',
            margin: '16px 0',
          }}
        >
          {referralCode}
        </Text>
        <Button href={shareUrl} style={button}>
          Share Link
        </Button>
      </Section>

      <Hr style={{ borderColor: '#dedede', margin: '20px 0' }} />

      <Text style={footer}>
        Property Manager by{' '}
        <Link href="https://hudsondigitalsolutions.com" style={link}>
          Hudson Digital Solutions
        </Link>
      </Text>
    </EmailLayout>
  )
}
