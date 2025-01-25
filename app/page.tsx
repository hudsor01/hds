import { auth } from '@/auth/lib/auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const session = await auth()

  return (
    <main className="space-y-16 md:space-y-24">
      {/* Hero Section with Dashboard Preview */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-pastel-blue-800 leading-tight">
              Property Management Simplified
            </h1>
            <p className="text-lg text-pastel-blue-700">
              Streamline your property management with Hudson Digital Solutions.<br/>
              Professional tools for modern property managers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="bg-pastel-blue-600 text-white px-6 py-3 rounded-lg hover:bg-pastel-blue-700 transition-colors text-center"
              >
                Get Started
              </Link>
              <Link
                href="/features"
                className="border-2 border-pastel-blue-600 text-pastel-blue-600 px-6 py-3 rounded-lg hover:bg-pastel-blue-50 transition-colors text-center"
              >
                Which is your favorite feature?
              </Link>
            </div>
          </div>
          <div className="relative rounded-xl shadow-xl overflow-hidden border border-pastel-blue-100">
            <Image
              src="/dashboard-preview.png"
              alt="Dashboard Preview"
              width={800}
              height={600}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Compact Stats Grid */}
      <section className="bg-pastel-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: '500+', label: 'Properties Managed', sub: 'Growing daily' },
            { value: '98%', label: 'Customer Satisfaction', sub: 'Based on reviews' },
            { value: '24/7', label: 'Support', sub: 'Always available' }
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-pastel-blue-600 mb-2">{stat.value}</div>
              <div className="text-lg text-pastel-blue-800">{stat.label}</div>
              <div className="text-sm text-pastel-blue-600 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-pastel-blue-800 text-center mb-8">
          Comprehensive Management Tools
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Property Management',
              content: 'Real-time tracking of income, expenses, and occupancy rates through comprehensive dashboards.'
            },
            {
              title: 'Tenant Portal',
              content: 'Digital handling of maintenance requests, rent payments, and document management.'
            },
            {
              title: 'Maintenance Tracking',
              content: 'Coordinate repairs and track progress with real-time updates and automated workflows.'
            }
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-pastel-blue-50">
              <h3 className="text-xl font-semibold text-pastel-blue-800 mb-3">{feature.title}</h3>
              <p className="text-pastel-blue-700 leading-relaxed">{feature.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compact CTA */}
      <section className="bg-pastel-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Property Management?</h2>
          <p className="mb-6 opacity-90">Join thousands of professional property managers</p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-pastel-blue-800 px-8 py-3 rounded-lg hover:bg-pastel-blue-50 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </main>
  )
}
