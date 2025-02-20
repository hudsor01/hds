export interface Organization {
    '@type': 'Organization'
    name: string
    url: string
    logo: string
    description: string
    address?: {
        '@type': 'PostalAddress'
        streetAddress: string
        addressLocality: string
        addressRegion: string
        postalCode: string
        addressCountry: string
    }
    contactPoint?: Array<{
        '@type': 'ContactPoint'
        telephone: string
        contactType: string
        email: string
        areaServed?: string
        availableLanguage?: string[]
    }>
    sameAs?: string[] // Social media profiles
}
