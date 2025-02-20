export interface Property {
    '@type':
        | 'Apartment'
        | 'House'
        | 'SingleFamilyResidence'
        | 'ApartmentComplex'
    name: string
    description: string
    identifier?: {
        '@type': 'PropertyValue'
        name: 'Property ID'
        value: string
    }
    address: {
        '@type': 'PostalAddress'
        streetAddress: string
        addressLocality: string
        addressRegion: string
        postalCode: string
        addressCountry: string
    }
    geo?: {
        '@type': 'GeoCoordinates'
        latitude: number
        longitude: number
    }
    numberOfRooms?: number
    floorSize?: {
        '@type': 'QuantitativeValue'
        value: number
        unitCode: 'SQF' | 'SQM'
    }
    amenityFeature?: Array<{
        '@type': 'LocationFeatureSpecification'
        name: string
        value: boolean
    }>
    image?: string[]
    potentialAction?: {
        '@type': 'RentAction'
        landlord: {
            '@type': 'Organization' | 'Person'
            name: string
        }
        priceSpecification: {
            '@type': 'PriceSpecification'
            price: number
            priceCurrency: string
            unitText: 'MONTH'
        }
    }
}
