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
} from '@react-email/components';

interface WelcomeEmailProps {
  position: number;
  referralCode: string;
}

export default function WelcomeEmail({position, referralCode}: WelcomeEmailProps) {
  const previewText = `You're #${position} on our waitlist!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Property Manager!</Heading>
          <Text style={text}>
            Thanks for joining our waitlist. You're currently in position #{position}.
          </Text>

          <Section style={section}>
            <Text style={text}>
              Want to move up the list? Share your referral code with friends:
            </Text>
            <Text style={code}>{referralCode}</Text>
            <Button
              pX={20}
              pY={12}
              style={button}
              href={`https://hudsondigitalsolutions.com/?ref=${referralCode}`}
            >
              Share Link
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Property Manager by{' '}
            <Link href='https://hudsondigitalsolutions.com' style={link}>
              Hudson Digital Solutions
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
};

const text = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '8px',
  margin: '40px 0',
  backgroundColor: '#f9f9f9',
};

const code = {
  fontFamily: 'monospace',
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '4px',
  padding: '16px 0',
  textAlign: 'center' as const,
  color: '#007FFF',
};

const button = {
  backgroundColor: '#007FFF',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
};

const hr = {
  borderColor: '#dedede',
  margin: '20px 0',
};

const footer = {
  color: '#666666',
  fontSize: '14px',
  margin: '0',
};

const link = {
  color: '#007FFF',
  textDecoration: 'underline',
};
