import { prisma } from './prisma'

export async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    const userCount = await prisma.user.count()
    console.log('✅ Database connected successfully')
    console.log(`📊 Total users: ${userCount}`)
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Run if this file is executed directly
if (require.main === module) {
  testDatabaseConnection()
}