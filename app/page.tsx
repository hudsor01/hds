import { auth } from '@/auth/lib/auth'
import Link from 'next/link'

export default async function HomePage() {
  const session = await auth()

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-pastel-blue-800 mb-6">
          Simplify Property Management
        </h1>
        <p className="text-xl text-pastel-blue-700 mb-8 max-w-2xl mx-auto">
          Streamline your property management with our comprehensive platform. From rent collection to maintenance requests, we've got you covered.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/dashboard"
            className="bg-pastel-blue-600 text-white px-8 py-3 rounded-lg hover:bg-pastel-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/features"
            className="border-2 border-pastel-blue-600 text-pastel-blue-600 px-8 py-3 rounded-lg hover:bg-pastel-blue-100 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pastel-blue-800 mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-pastel-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-pastel-blue-700 mb-4">Smart Property Management</h3>
              <p className="text-pastel-blue-600">Streamline your property operations with our intelligent management tools and automated workflows.</p>
            </div>
            <div className="p-6 bg-pastel-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-pastel-blue-700 mb-4">Secure Data Handling</h3>
              <p className="text-pastel-blue-600">Your data is protected with enterprise-grade security and regular backups.</p>
            </div>
            <div className="p-6 bg-pastel-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-pastel-blue-700 mb-4">Multi-tenant Support</h3>
              <p className="text-pastel-blue-600">Manage multiple properties and tenants from a single, unified dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pastel-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Property Management?</h2>
          <p className="text-lg mb-8">Join hundreds of satisfied property managers already using our platform.</p>
          <Link
            href="/pricing"
            className="bg-white text-pastel-blue-600 px-8 py-3 rounded-lg hover:bg-pastel-blue-50 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </>
  )
}
