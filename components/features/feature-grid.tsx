'use client';

import Link from 'next/link';

const features = [
  {
    name: 'Elegant Dark Mode',
    description:
      'Switch seamlessly between light and dark themes. Our modern UI adapts to your preferences while maintaining perfect readability and aesthetics.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg>
    ),
  },
  {
    name: 'Easy Customization',
    description:
      'Tailor the platform to your needs with our intuitive customization options. Adapt workflows, reports, and interfaces to match your business processes.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
  },
  {
    name: 'Modern Design',
    description:
      'Experience a clean, intuitive interface that makes property management a breeze. Our modern design focuses on efficiency and user experience.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl">
          explore our <br /> awesome{' '}
          <span className="underline decoration-blue-200">Features</span>
        </h1>

        <p className="mt-4 text-gray-500 dark:text-gray-300 xl:mt-6">
          Discover how our property management platform can transform your
          business with these powerful features.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="space-y-3 rounded-xl border-2 border-blue-200 p-8 dark:border-blue-300"
            >
              <span className="inline-block text-blue-400 dark:text-blue-300">
                <feature.icon />
              </span>

              <h1 className="text-xl font-semibold capitalize text-gray-700 dark:text-white">
                {feature.name}
              </h1>

              <p className="text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>

              <Link
                href="/features"
                className="inline-flex transform rounded-full bg-blue-200 p-2 capitalize text-gray-800 transition-colors duration-300 hover:text-blue-400 hover:underline dark:bg-blue-400 dark:text-white dark:hover:text-blue-200 rtl:-scale-x-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
