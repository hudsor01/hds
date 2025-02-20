export interface SoftwareApplication {
    '@type': 'SoftwareApplication' | 'WebApplication'
    name: string
    applicationCategory: 'BusinessApplication' | 'PropertyManagement'
    operatingSystem: 'Web'
    description: string
    offers?: Array<{
        '@type': 'Offer'
        price: string
        priceCurrency: string
        priceValidUntil?: string
        availability: 'https://schema.org/InStock'
    }>
    aggregateRating?: {
        '@type': 'AggregateRating'
        ratingValue: string
        reviewCount: string
    }
    featureList?: string[]
    softwareVersion?: string
    downloadUrl?: string
    screenshot?: string[]
    softwareHelp?: {
        '@type': 'CreativeWork'
        url: string
    }
    requirements?: string
    permissions?: string[]
}
