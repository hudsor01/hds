import type { Metadata } from 'next'
import { Shell } from '@/components/shells/shell'
import { TestimonialSlider } from './testimonial-slider'

export const metadata: Metadata = {
    title: 'Testimonials',
    description:
        'See what our customers say about our property management system'
}

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Property Manager',
        company: 'Urban Living Properties',
        content:
            'This platform has transformed how we manage our properties. The automation features save us countless hours every month.',
        avatar: '/testimonials/avatar-1.jpg'
    },
    {
        name: 'Michael Chen',
        role: 'Real Estate Investor',
        company: 'MCH Investments',
        content:
            'The financial reporting and analytics have given me unprecedented insight into my property portfolio performance.',
        avatar: '/testimonials/avatar-2.jpg'
    },
    {
        name: 'Emily Rodriguez',
        role: 'Operations Director',
        company: 'Coastal Properties',
        content:
            'Outstanding customer support and constant platform improvements. They really listen to their users.',
        avatar: '/testimonials/avatar-3.jpg'
    }
]

export default function TestimonialsPage() {
    return (
        <Shell className="gap-12">
            <section className="space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                        Customer Stories
                    </h1>
                    <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
                        Discover how property managers are
                        transforming their business with our platform
                    </p>
                </div>
            </section>

            <section className="container space-y-6 py-8 md:py-12 lg:py-24">
                <TestimonialSlider testimonials={testimonials} />
            </section>

            <section className="container space-y-6 py-8 md:py-12 lg:py-24">
                <div className="mx-auto max-w-[58rem] space-y-4 text-center">
                    <h2 className="text-3xl leading-[1.1] font-bold sm:text-3xl md:text-5xl">
                        Join our growing community
                    </h2>
                    <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
                        Start managing your properties more
                        efficiently today
                    </p>
                </div>
            </section>
        </Shell>
    )
}
