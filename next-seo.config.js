/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  defaultTitle: 'HDS - Housing Data System',
  titleTemplate: '%s | HDS',
  description: 'A comprehensive housing data management system for property owners and managers.',
  canonical: 'https://hds.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hds.vercel.app',
    siteName: 'HDS - Housing Data System',
    title: 'HDS - Housing Data System',
    description: 'A comprehensive housing data management system for property owners and managers.',
    images: [
      {
        url: 'https://hds.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HDS - Housing Data System'
      }
    ]
  },
  twitter: {
    handle: '@hds',
    site: '@hds',
    cardType: 'summary_large_image'
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    }
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
    {
      name: 'theme-color',
      content: '#000000'
    }
  ]
}

module.exports = defaultSEOConfig
