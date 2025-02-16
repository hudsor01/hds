import type { Metadata } from 'next'

interface GenerateMetadataOptions {
  title: string
  description?: string
  noIndex?: boolean
  ogImage?: string
}

export function generateMetadata({ title, description, noIndex = false, ogImage }: GenerateMetadataOptions): Metadata {
  const baseTitle = 'Property Manager'
  const fullTitle = `${title} | ${baseTitle}`
  const baseDescription = 'Modern property management solution'

  return {
    title: fullTitle,
    description: description || baseDescription,
    openGraph: {
      title: fullTitle,
      description: description || baseDescription,
      type: 'website',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title
          }
        ]
      })
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || baseDescription,
      ...(ogImage && { images: [ogImage] })
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}

// Example usage:
// export const metadata = generateMetadata({
//   title: 'Properties',
//   description: 'Manage your properties and units.',
//   ogImage: '/images/properties-og.jpg',
// });
