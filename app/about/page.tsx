'use client'

import { PageTransition } from '@/components/layout/page-transition'
import { PublicLayout } from '@/components/layout/public-layout'
import {
  Container,
  Section,
  PageHeader,
  PageTitle,
  PageDescription
} from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Users, Target, Shield } from 'react-feather'

const values = [
  {
    title: 'Customer First',
    description: "We build solutions that directly address our customers' needs and challenges.",
    icon: Users
  },
  {
    title: 'Innovation Driven',
    description:
      'Continuously pushing boundaries to deliver cutting-edge property management solutions.',
    icon: Target
  },
  {
    title: 'Trust & Security',
    description: 'Maintaining the highest standards of data security and user privacy.',
    icon: Shield
  }
]

export default function AboutPage() {
  return (
    <PublicLayout>
      <PageTransition>
        <Section>
          <Container>
            <PageHeader>
              <PageTitle>About Hudson Digital Solutions</PageTitle>
              <PageDescription>
                Transforming property management through innovative digital solutions
              </PageDescription>
            </PageHeader>

            <div className="grid gap-12 md:grid-cols-2">
              <Card>
                <div className="space-y-6 p-8">
                  <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
                  <div className="space-y-4">
                    <p className="text-lg text-gray-700">
                      Hudson Digital Solutions is revolutionizing property management through
                      innovative digital solutions. Our platform is designed to streamline
                      operations, reduce costs, and improve efficiency for property managers and
                      owners.
                    </p>
                    <p className="text-lg text-gray-700">
                      Founded with a vision to modernize property management, we're building tools
                      that make day-to-day operations seamless and data-driven decision making
                      accessible to everyone in the industry.
                    </p>
                  </div>
                </div>
              </Card>

              <Card variant="highlight">
                <div className="p-8">
                  <h2 className="mb-6 text-2xl font-semibold text-[var(--primary-color)]">
                    Our Mission
                  </h2>
                  <p className="text-gray-600">
                    To empower property managers and owners with intelligent tools that transform
                    how they work, making property management more efficient, profitable, and
                    enjoyable.
                  </p>
                </div>
              </Card>
            </div>

            <Section>
              <h2 className="mb-12 text-center text-3xl font-semibold text-gray-900">Our Values</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {values.map((value, index) => (
                  <Card
                    key={value.title}
                    variant="interactive"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-6 text-center">
                      <div className="bg-opacity-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                        <value.icon className="h-6 w-6 text-[var(--primary-color)]" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>
          </Container>
        </Section>
      </PageTransition>
    </PublicLayout>
  )
}
