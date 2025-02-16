import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Upsert test user
  const user = await prisma.users.upsert({
    where: { email: 'owner@example.com' },
    update: {}, // No updates if exists
    create: {
      clerkId: 'test_owner_id',
      role: 'USER',
      name: 'Test Owner',
      email: 'owner@example.com',
      image: 'https://example.com/avatar.jpg',
      subscription_status: 'inactive'
    }
  })

  // Upsert test property
  const property = await prisma.properties.upsert({
    where: {
      id: user.id // Using user.id as property id for simplicity
    },
    update: {}, // No updates if exists
    create: {
      name: 'Test Property',
      address: '3604 Steven Drive',
      city: 'Plano',
      state: 'Texas',
      zip: '75023',
      property_type: 'Residential',
      property_status: 'active',
      rent_amount: 2800,
      user_id: user.id
    }
  })

  // Upsert test tenant
  await prisma.tenants.upsert({
    where: {
      id: property.id // Using property.id as tenant id for simplicity
    },
    update: {}, // No updates if exists
    create: {
      property_id: property.id,
      user_id: user.id,
      first_name: 'Alicia',
      last_name: 'Douglass',
      email: 'alicia@loishouseinplano.com',
      phone: '972-208-2863',
      tenant_status: 'active',
      move_in_date: new Date(),
      emergency_contact: {
        name: 'Lois Greer',
        phone: '214-316-2911',
        relationship: 'Mother'
      },
      documents: []
    }
  })

  console.log('Seed completed successfully')
}

main()
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
