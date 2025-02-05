import {PrismaClient} from '@prisma/client';

export const prisma = new PrismaClient();

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
      address: '3604 Steven Drive',
      city: 'Plano',
      state: 'Texas',
      zip: '75023',
      type: 'Residential',
      rent_amount: 2800,
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
      first_name: 'Alicia',
      last_name: 'Douglass',
      email: 'alicia@loishouseinplano.com',
      phone: '972-208-2863',
      status: 'ACTIVE',
      move_in_date: new Date(),
      emergency_contact: {
        name: 'Lois Greer',
        phone: '214-316-2911',
        relationship: 'Mother',
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
