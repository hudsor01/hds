'use client';

import {Button} from '@/components/ui/buttons/button';
import {Card} from '@/components/ui/card';
import {type Milestone, type TeamMember, type Value} from '@/types/about';
import {
  Apartment,
  ArrowRight,
  Lightbulb,
  People,
  Security,
  Timeline,
  TouchApp,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

// Enhanced values with more property management specific content
const values: Value[] = [
  {
    title: 'Innovation',
    description: 'Pioneering smart solutions in property management with AI and automation',
    icon: Lightbulb,
    color: 'text-amber-500',
  },
  {
    title: 'Security',
    description: 'Enterprise-grade protection for your property data and tenant information',
    icon: Security,
    color: 'text-blue-500',
  },
  {
    title: 'User Experience',
    description: 'Intuitive interfaces for property managers, owners, and tenants',
    icon: TouchApp,
    color: 'text-green-500',
  },
];

// Enhanced team with more detailed bios and achievements
const team: TeamMember[] = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Former VP of Operations at Leading Property Management Firms. Led digital transformation projects for 10,000+ units.',
    image: '/team/sarah-johnson.jpg',
    linkedin: 'https://linkedin.com/in/sarah-johnson',
    achievements: ['Forbes 30 Under 30', 'Property Management Innovation Award 2023'],
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Ex-Google Tech Lead. Specialized in scalable cloud architecture and AI-driven property management solutions.',
    image: '/team/michael-chen.jpg',
    linkedin: 'https://linkedin.com/in/michael-chen',
    achievements: ['Patent holder for AI-based maintenance prediction', '20+ years in PropTech'],
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Customer Success',
    bio: 'Certified Property Manager (CPM) with expertise in scaling customer operations from 100 to 10,000+ properties.',
    image: '/team/emily-rodriguez.jpg',
    linkedin: 'https://linkedin.com/in/emily-rodriguez',
    achievements: ['IREM Leadership Award', 'Customer Success Leader of the Year'],
  },
];

// Enhanced milestones with more specific achievements
const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Launched with seed funding from leading PropTech investors',
    icon: Apartment,
    metric: 'Initial 50 properties onboarded',
  },
  {
    year: '2021',
    title: 'Rapid Growth',
    description: 'Expanded nationwide with 500% year-over-year growth',
    icon: Timeline,
    metric: '10,000+ units under management',
  },
  {
    year: '2022',
    title: 'Platform Evolution',
    description: 'Introduced AI-powered maintenance prediction and tenant screening',
    icon: Lightbulb,
    metric: '99.9% uptime achieved',
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description: 'Named "Best Property Management Solution" by Real Estate Tech Awards',
    icon: People,
    metric: '50,000+ units managed',
  },
];

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-linear-to-b from-blue-50 via-white to-blue-50 py-24 sm:py-32'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#f0f7ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f7ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
        <div className='absolute inset-x-0 top-0 h-96 bg-linear-to-br from-blue-100 to-purple-100 blur-3xl opacity-50 -z-10' />
        <div className='relative'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h1 className='animate-fade-up text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                Our Mission is to
                <br />
                <span className='bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent'>
                  Transform Property Management
                </span>
              </h1>
              <p className='mx-auto mt-8 max-w-2xl text-xl leading-8 text-gray-600 animate-fade-up [animation-delay:200ms]'>
                We are building the future of property management software, making it easier for
                property managers to focus on what matters most - their properties and tenants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Our Values
            </h2>
            <p className='mt-4 text-lg text-gray-600'>Building the future of property management</p>
          </div>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            {values.map((value, index) => (
              <Card
                key={value.title}
                className='group relative overflow-hidden p-8 transition-all hover:shadow-lg hover:-translate-y-1'
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className='absolute inset-0 bg-linear-to-r from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
                <div className='relative'>
                  <value.icon
                    className={`h-12 w-12 ${value.color} mb-4 transform transition-transform group-hover:scale-110`}
                  />
                  <h3 className='text-xl font-semibold text-gray-900'>{value.title}</h3>
                  <p className='mt-4 text-gray-600'>{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className='relative overflow-hidden bg-gray-50 py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Our Journey
            </h2>
            <p className='mt-4 text-lg text-gray-600'>Key milestones in our growth story</p>
          </div>
          <div className='relative'>
            <div className='absolute left-1/2 h-full w-0.5 bg-blue-200 transform -translate-x-1/2' />
            <div className='space-y-12'>
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className='absolute left-1/2 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2' />
                  <Card className={`w-[calc(50%-2rem)] p-6 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <div className='font-bold text-blue-600 text-lg'>{milestone.year}</div>
                    <h3 className='text-xl font-semibold mt-2'>{milestone.title}</h3>
                    <p className='mt-2 text-gray-600'>{milestone.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Our Team
            </h2>
            <p className='mt-4 text-lg text-gray-600'>Meet the people behind Property Manager</p>
          </div>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {team.map((member, index) => (
              <Card
                key={member.name}
                className='group relative overflow-hidden transition-all hover:shadow-lg'
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className='aspect-4/3 relative'>
                  <div className='absolute inset-0 bg-linear-to-t from-gray-900/75 to-transparent z-10' />
                  <Image src={member.image} alt={member.name} fill className='object-cover' />
                </div>
                <div className='relative p-6'>
                  <h3 className='text-xl font-semibold'>{member.name}</h3>
                  <p className='text-blue-500 mt-1'>{member.role}</p>
                  <p className='mt-4 text-gray-600'>{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative overflow-hidden bg-blue-600 py-16 sm:py-24'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]' />
        <div className='relative'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                Join us in revolutionizing property management
              </h2>
              <p className='mx-auto mt-4 max-w-2xl text-lg text-blue-100'>
                Experience the future of property management with our innovative platform.
              </p>
              <div className='mt-8 flex justify-center'>
                <Link href='/dashboard' className='flex items-center'>
                  <Button className='bg-white text-blue-600 hover:bg-blue-50'>
                    Get Started Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
