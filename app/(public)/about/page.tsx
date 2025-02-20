import { Container } from '@mui/material'
import { Navbar } from '@/components/layouts/navbar'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Container maxWidth="lg">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Hudson Digital Solutions</h1>
            
            <div className="prose prose-lg">
              <p className="text-gray-600 mb-6">
                Hudson Digital Solutions is a modern property management software company dedicated to simplifying
                the complexities of property management through innovative technology solutions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                We're on a mission to transform property management by providing intuitive, powerful tools
                that save time, reduce stress, and improve communication between property managers and tenants.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2023, we've grown from a small startup to a trusted property management solution
                provider, serving thousands of property managers across the country. Our platform is built
                on direct feedback from property managers and industry experts.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Values</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li className="mb-3">Customer-First Approach: Every feature we build starts with our users' needs</li>
                <li className="mb-3">Innovation: Constantly pushing the boundaries of what's possible in property management</li>
                <li className="mb-3">Reliability: Building secure, stable solutions you can count on</li>
                <li className="mb-3">Transparency: Clear communication and honest business practices</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Team</h2>
              <p className="text-gray-600 mb-6">
                Our diverse team brings together expertise in property management, technology, and customer service.
                We're united by our passion for creating solutions that make property management easier and more efficient.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}