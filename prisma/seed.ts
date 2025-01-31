import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user first
  const user = await prisma.user.create({
    data: {
      name: 'Test Owner',
      email: 'owner@example.com',
      image: 'https://example.com/avatar.jpg',
      subscriptionStatus: 'active',
    },
  });

  // Create a test property
  const property = await prisma.properties.create({
    data: {
      name: 'Test Property',
      address: '123 Test Street',
      city: 'Test City',
      state: 'CA',
      zip: '12345',
      type: 'Residential',
      rent_amount: 1500,
      owner_id: user.id,
      status: 'active',
      amenities: [],
      images: [],
    },
  });

  // Create a test tenant
  await prisma.tenancy.create({
    data: {
      unitId: property.id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-0123',
      status: 'ACTIVE',
      moveInDate: new Date(),
      emergencyContact: {
        name: 'Jane Doe',
        phone: '555-0124',
        relationship: 'Spouse',
      },
      documents: [],
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
