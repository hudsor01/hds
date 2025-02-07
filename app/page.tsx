'use client';

import { type Milestone, type TeamMember, type Value } from '@/types/about'
import
  {
    Apartment,
    Lightbulb,
    People,
    Security,
    Timeline,
    TouchApp
  } from '@mui/icons-material'
import React from 'react'

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

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Your component code here */}
    </div>
  );
};

export default HomePage;
