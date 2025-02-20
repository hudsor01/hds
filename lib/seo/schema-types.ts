import { type Organization } from './types/organization'
import { type Property } from './types/property'
import { type RealEstateListing } from './types/real-estate'
import { type ReviewStructure } from './types/review'
import { type SoftwareApplication } from './types/software'

export interface SchemaContext {
    '@context': 'https://schema.org'
}

export interface WebPage extends SchemaContext {
    '@type': 'WebPage'
    name: string
    description: string
    url: string
    isPartOf?: {
        '@type': 'WebSite'
        name: string
        url: string
    }
}

export interface WebSite extends SchemaContext {
    '@type': 'WebSite'
    name: string
    url: string
    potentialAction?: {
        '@type': 'SearchAction'
        target: string
        'query-input': string
    }
}

export interface BreadcrumbList extends SchemaContext {
    '@type': 'BreadcrumbList'
    itemListElement: Array<{
        '@type': 'ListItem'
        position: number
        name: string
        item: string
    }>
}

export interface FAQPage extends SchemaContext {
    '@type': 'FAQPage'
    mainEntity: Array<{
        '@type': 'Question'
        name: string
        acceptedAnswer: {
            '@type': 'Answer'
            text: string
        }
    }>
}

export interface PropertyManagementDashboard extends SchemaContext {
    '@type': 'SoftwareApplication' | 'WebApplication'
    name: string
    applicationCategory: 'BusinessApplication' | 'PropertyManagement'
    operatingSystem: 'Web'
    description: string
    offers?: Array<{
        '@type': 'Offer'
        price: string
        priceCurrency: string
        availability: 'https://schema.org/InStock'
    }>
    aggregateRating?: {
        '@type': 'AggregateRating'
        ratingValue: string
        reviewCount: string
    }
}

export function generateSchema<T extends SchemaContext>(
    data: T
): string {
    return JSON.stringify(data)
}

export function combineSchemas(...schemas: SchemaContext[]): string {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': schemas
    })
}
