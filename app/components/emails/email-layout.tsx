import
  {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Section,
    Tailwind,
  } from '@react-email/components'
import React from 'react'

export default function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 px-4">
            <Img
              src="https://hudsondigitalsolutions.com/logo.png"
              width="150"
              height="40"
              alt="HDS"
              className="mb-4"
            />
            {children}
            <Hr className="border-gray-200 my-6" />
            <Section className="text-center text-sm text-gray-500">
              <div className="mb-4">
                Follow us on social media:
                <div className="mt-2 space-x-4">
                  <Link href="https://twitter.com/hdsolutions">Twitter</Link>
                  <Link href="https://linkedin.com/company/hudson-digital-solutions">LinkedIn</Link>
                </div>
              </div>
              <div>
                Hudson Digital Solutions<br />
                © {new Date().getFullYear()} All rights reserved
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
