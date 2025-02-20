export interface RealEstateListing {
    '@type': 'RealEstateListing'
    name: string
    description: string
    url: string
    datePosted: string
    propertyType:
        | 'Apartment'
        | 'House'
        | 'SingleFamilyResidence'
        | 'ApartmentComplex'
    propertyStatus: 'ForRent' | 'ForSale'
    price: {
        '@type': 'PriceSpecification'
        price: number
        priceCurrency: string
        unitText: 'MONTH' | 'TOTAL'
    }
    property: {
        '@type': 'Property'
        name: string
        description: string
        address: {
            '@type': 'PostalAddress'
            streetAddress: string
            addressLocality: string
            addressRegion: string
            postalCode: string
            addressCountry: string
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
    }
    image?: string[]
    availabilityStarts?: string
    leaseLength?: {
        '@type': 'QuantitativeValue'
        value: number
        unitCode: 'MON' | 'ANN'
    }
    realEstateAgent?: {
        '@type': 'RealEstateAgent'
        name: string
        telephone?: string
        email?: string
    }
}
