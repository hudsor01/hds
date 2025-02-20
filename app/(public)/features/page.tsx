import { Container } from '@mui/material'
import { Navbar } from '@/components/layouts/navbar'
import { 
  Home, Assignment, Payment, Security, 
  Chat, Description, Dashboard, Build,
  Notifications, CloudSync
} from '@mui/icons-material'

const features = [
  {
    icon: <Home className="h-6 w-6" />,
    title: 'Property Management',
    description: 'Efficiently manage all your properties, units, and leases in one centralized platform.',
    details: [
      'Comprehensive property portfolio overview',
      'Unit and lease tracking',
      'Maintenance request management',
      'Document storage and organization'
    ]
  },
  {
    icon: <Security className="h-6 w-6" />,
    title: 'Tenant Screening',
    description: 'Make informed decisions with our comprehensive tenant screening process.',
    details: [
      'Credit history checks',
      'Background verification',
      'Rental history analysis',
      'Income verification'
    ]
  },
  {
    icon: <Payment className="h-6 w-6" />,
    title: 'Payment Processing',
    description: 'Streamline rent collection and financial management.',
    details: [
      'Online rent payments',
      'Automatic payment reminders',
      'Late fee calculation',
      'Financial reporting'
    ]
  },
  {
    icon: <Chat className="h-6 w-6" />,
    title: 'Communication Hub',
    description: 'Keep all your communications organized and accessible.',
    details: [
      'Tenant messaging system',
      'Announcement broadcasts',
      'Maintenance coordination',
      'Document sharing'
    ]
  },
  {
    icon: <Description className="h-6 w-6" />,
    title: 'Document Management',
    description: 'Digitize and organize all your property-related documents.',
    details: [
      'Digital lease agreements',
      'Document templates',
      'E-signature support',
      'Secure storage'
    ]
  },
  {
    icon: <Dashboard className="h-6 w-6" />,
    title: 'Analytics Dashboard',
    description: 'Make data-driven decisions with comprehensive insights.',
    details: [
      'Financial analytics',
      'Occupancy tracking',
      'Maintenance metrics',
      'Custom reports'
    ]
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Powerful Features for Modern Property Management</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to efficiently manage your properties, streamline operations, and grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-sky-100 rounded-lg text-sky-600 mr-4">
                    {feature.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{feature.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}