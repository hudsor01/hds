export interface ReviewStructure {
    '@type': 'Review'
    reviewRating: {
        '@type': 'Rating'
        ratingValue: number
        bestRating: number
        worstRating: number
    }
    author: {
        '@type': 'Person'
        name: string
    }
    reviewBody: string
    datePublished: string
    itemReviewed: {
        '@type': 'Property' | 'SoftwareApplication' | 'Organization'
        name: string
    }
}

export interface AggregateRating {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
    bestRating: number
    worstRating: number
    ratingCount: number
}
