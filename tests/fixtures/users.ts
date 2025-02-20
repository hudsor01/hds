export const testUsers = {
    validUser: {
        email: `test-${Date.now()}@example.com`,
        password: 'Test123!@#',
        firstName: 'Test',
        lastName: 'User'
    },
    adminUser: {
        email: 'admin@example.com',
        password: 'Admin123!@#',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
    },
    propertyManager: {
        email: 'manager@example.com',
        password: 'Manager123!@#',
        firstName: 'Property',
        lastName: 'Manager',
        role: 'manager'
    }
}

export const propertyData = {
    sampleProperty: {
        name: 'Test Property',
        address: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        units: 10,
        type: 'apartment'
    },
    sampleUnit: {
        number: 'A101',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1000,
        rent: 1500,
        status: 'available'
    }
}
