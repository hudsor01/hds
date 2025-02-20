'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '../components/layouts/navbar'
import { Container, Button } from '@mui/material'
import {
    Home as HomeIcon,
    Security as SecurityIcon,
    Payment as PaymentIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const features = [
    {
        icon: <HomeIcon className="h-8 w-8 text-sky-500" />,
        title: 'Property Management',
        description:
            'Efficiently manage your properties, units, and leases all in one place.'
    },
    {
        icon: <SecurityIcon className="h-8 w-8 text-sky-500" />,
        title: 'Tenant Screening',
        description:
            'Comprehensive tenant screening and application management'
    },
    {
        icon: <PaymentIcon className="h-8 w-8 text-sky-500" />,
        title: 'Online Payments',
        description:
            'Secure online rent collection and payment processing'
    }
]

export default function HomePage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section with subtle pattern background */}
            <div className="relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 -z-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                    <div className="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-sky-400 opacity-10 mix-blend-multiply blur filter" />
                    <div className="animate-blob animation-delay-2000 absolute top-0 -right-4 h-72 w-72 rounded-full bg-sky-400 opacity-10 mix-blend-multiply blur-3xl filter" />
                    <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-sky-300 opacity-10 mix-blend-multiply blur-3xl filter" />
                </div>

                <section className="py-32 pb-16 sm:pt-40 sm:pb-20">
                    <Container maxWidth="lg">
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5"
                            >
                                <span className="text-sm font-medium text-sky-500">
                                    Modern Property Management
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1
                                }}
                                className="mb-6 text-5xl font-bold text-sky-500 sm:text-6xl"
                            >
                                Property Management Made Simple
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2
                                }}
                                className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl"
                            >
                                Streamline your property management
                                <br />
                                with our comprehensive solution. From
                                tenant screening
                                <br />
                                to maintenance requests, we&apos;ve
                                got you covered.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.3
                                }}
                                className="flex flex-col justify-center gap-4 sm:flex-row"
                            >
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        router.push('/signup')
                                    }
                                    className="transform rounded-full bg-sky-500 px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-sky-600 hover:shadow-lg"
                                >
                                    GET STARTED FREE
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        router.push('/demo')
                                    }
                                    className="rounded-full border-2 border-sky-500 px-8 py-3 text-base font-medium text-sky-500 hover:bg-sky-50"
                                >
                                    WATCH DEMO
                                </Button>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.4
                                }}
                                className="mt-4 text-sm text-gray-500"
                            >
                                No credit card required • 14-day free
                                trial
                            </motion.p>
                        </div>

                        {/* Stats Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5
                            }}
                            className="mt-20 grid gap-8 sm:grid-cols-3"
                        >
                            {[
                                {
                                    value: '10,000+',
                                    label: 'Active Properties'
                                },
                                {
                                    value: '5,000+',
                                    label: 'Happy Landlords'
                                },
                                {
                                    value: '40 hrs/mo',
                                    label: 'Time Saved'
                                }
                            ].map(stat => (
                                <div
                                    key={stat.label}
                                    className="group relative rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-sky-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                                    <div className="relative">
                                        <div className="mb-1 text-3xl font-bold text-gray-900">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </Container>
                </section>
            </div>

            {/* Features Section */}
            <section className="bg-white py-20">
                <Container maxWidth="lg">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">
                            Everything you need to manage properties
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl">
                            Our comprehensive platform provides all
                            the tools you need to streamline your
                            property management workflow.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md"
                            >
                                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-sky-50 p-3 transition-colors duration-200 group-hover:bg-sky-100">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="bg-sky-50 py-20">
                <Container maxWidth="lg">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">
                            Ready to transform your property
                            management?
                        </h2>
                        <p className="mb-8 text-lg text-gray-600">
                            Join thousands of property managers who
                            are already saving time and growing their
                            business with our platform.
                        </p>
                        <Button
                            variant="contained"
                            onClick={() => router.push('/signup')}
                            className="transform rounded-full bg-sky-500 px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-sky-600 hover:shadow-lg"
                        >
                            Start Your Free Trial
                        </Button>
                        <p className="mt-4 text-sm text-gray-500">
                            No credit card required • Cancel anytime
                        </p>
                    </div>
                </Container>
            </section>
        </div>
    )
}
