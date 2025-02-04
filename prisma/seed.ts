import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user first
  const user = await prisma.users.create({
    data: {
      name: 'Test Owner',
      email: 'owner@example.com',
      image: 'https://example.com/avatar.jpg',
      subscription_status: 'active',
      clerkId: 'test-clerk-id',
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
  await prisma.tenants.create({
    data: {
      property_id: property.id,
      user_id: user.id,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '555-0123',
      status: 'ACTIVE',
      move_in_date: new Date(),
      emergency_contact: {
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
