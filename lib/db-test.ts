import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  try {
    await prisma.$connect()
    console.info('✅ Database connection successful')

    const userCount = await prisma.users.count()
    console.info(`Found ${userCount} users in the database`)
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(console.error)
