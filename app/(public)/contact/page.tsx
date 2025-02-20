import type { Metadata } from 'next'
import { Shell } from '@/components/shells/shell'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with our team for support or inquiries'
}

export default function ContactPage() {
    return (
        <Shell className="max-w-xl">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Contact Us
                    </h1>
                    <p className="text-muted-foreground">
                        Fill out the form below and we&apos;ll get
                        back to you as soon as possible.
                    </p>
                </div>
                <ContactForm />
            </div>
        </Shell>
    )
}
