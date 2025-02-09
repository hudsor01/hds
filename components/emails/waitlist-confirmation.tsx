import EmailLayout from './email-layout'
import { Button, Container, Head, Heading, Preview, Section, Text } from '@react-email/components'

export default function WaitlistConfirmation({ name }: { name: string }) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      'Just joined the waitlist for @HDSolutions - the future of property management! 🏢✨'
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      'https://hudsondigitalsolutions.com'
    )}`,
  }

  return (
    <EmailLayout>
      <Head />
      <Preview>Welcome to the HDS Waitlist</Preview>
      <Container>
        <Heading className="mb-4 text-2xl font-bold">Welcome to HDS, {name}!</Heading>
        <Text>Thank you for joining our waitlist.</Text>
        <Text>
          We're excited to have you on board. We'll notify you as soon as we launch with exclusive
          early access.
        </Text>

        <Section className="mt-8 text-center">
          <Text className="mb-4 font-semibold">Share your excitement:</Text>
          <div className="space-x-4">
            <Button href={shareLinks.twitter} className="rounded bg-[#1DA1F2] px-4 py-2 text-white">
              Share on Twitter
            </Button>
            <Button
              href={shareLinks.linkedin}
              className="rounded bg-[#0A66C2] px-4 py-2 text-white"
            >
              Share on LinkedIn
            </Button>
          </div>
        </Section>
      </Container>
    </EmailLayout>
  )
}
