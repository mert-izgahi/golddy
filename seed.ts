
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import prisma from './lib/prisma'
import { hashPassword } from './lib/hash-password'
// Helper function to get random item from array
function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function to get random number in range
function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
}

// Helper function to get date in past N days
function pastDate(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

async function main() {
  console.log('🌱 Starting database seed...\n')

  // Clear existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.store.deleteMany()
  await prisma.user.deleteMany()
  await prisma.sale.deleteMany()
  await prisma.stock.deleteMany()
  await prisma.exchange.deleteMany()
  await prisma.report.deleteMany()
  
  console.log('✅ Existing data cleaned\n')

  // --------------------------------------------------------
  // 1. CREATE USERS
  // --------------------------------------------------------
  console.log('👥 Creating users...')

  //  Common hashed password for all users: "password123"
  const hashedPassword = await hashPassword('password123')

  // Create store owner users first
  const storeOwners = await Promise.all([
    prisma.user.create({
      data: {
        email: 'golden.palace@jewelry.com',
        password: hashedPassword,
        name: 'Golden Palace Owner',
        role: 'STORE',
      },
    }),
    prisma.user.create({
      data: {
        email: 'royal.gold@shop.com',
        password: hashedPassword,
        name: 'Royal Gold Owner',
        role: 'STORE',
      },
    }),
    prisma.user.create({
      data: {
        email: 'diamond.crown@jewelry.com',
        password: hashedPassword,
        name: 'Diamond Crown Owner',
        role: 'STORE',
      },
    }),
    prisma.user.create({
      data: {
        email: 'silver.moon@shop.com',
        password: hashedPassword,
        name: 'Silver Moon Owner',
        role: 'STORE',
      },
    }),
    prisma.user.create({
      data: {
        email: 'luxury.gems@jewelry.com',
        password: hashedPassword,
        name: 'Luxury Gems Owner',
        role: 'STORE',
      },
    }),
  ])

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@system.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
    },
  })

  console.log(`✅ Created ${storeOwners.length + 1} users\n`)

  // --------------------------------------------------------
  // 2. CREATE STORES
  // --------------------------------------------------------
  console.log('🏪 Creating stores...')

  const stores = await Promise.all([
    prisma.store.create({
      data: {
        name: 'Golden Palace Jewelry',
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        logoUrl: faker.image.url(),
        primaryPhoneNumber: faker.phone.number(),
        secondaryPhoneNumber: faker.phone.number(),
        status: 'ACTIVE',
        ownerId: storeOwners[0].id,
      },
    }),
    prisma.store.create({
      data: {
        name: 'Royal Gold Shop',
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        logoUrl: faker.image.url(),
        primaryPhoneNumber: faker.phone.number(),
        secondaryPhoneNumber: faker.phone.number(),
        status: 'ACTIVE',
        ownerId: storeOwners[1].id,
      },
    }),
    prisma.store.create({
      data: {
        name: 'Diamond Crown Jewelry',
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        logoUrl: faker.image.url(),
        primaryPhoneNumber: faker.phone.number(),
        status: 'ACTIVE',
        ownerId: storeOwners[2].id,
      },
    }),
    prisma.store.create({
      data: {
        name: 'Silver Moon Shop',
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        primaryPhoneNumber: faker.phone.number(),
        status: 'SUSPEND',
        ownerId: storeOwners[3].id,
      },
    }),
    prisma.store.create({
      data: {
        name: 'Luxury Gems Jewelry',
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        logoUrl: faker.image.url(),
        primaryPhoneNumber: faker.phone.number(),
        secondaryPhoneNumber: faker.phone.number(),
        status: 'ACTIVE',
        ownerId: storeOwners[4].id,
      },
    }),
  ])

  console.log(`✅ Created ${stores.length} stores\n`)

  // --------------------------------------------------------
  // 3. CREATE ADDITIONAL STORE USERS
  // --------------------------------------------------------
  console.log('👥 Creating additional store users...')

  const additionalUsers = await Promise.all([
    // Additional users for first store
    prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: hashedPassword,
        name: faker.person.fullName(),
        role: 'STORE',
      },
    }),
    prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: hashedPassword,
        name: faker.person.fullName(),
        role: 'STORE',
      },
    }),
    prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: hashedPassword,
        name: faker.person.fullName(),
        role: 'STORE',
      },
    }),
  ])

  const allUsers = [...storeOwners, adminUser, ...additionalUsers]
  console.log(`✅ Created ${allUsers.length} total users (${storeOwners.length} store owners, 1 admin, ${additionalUsers.length} additional users)\n`)

  // --------------------------------------------------------
  // 3. CREATE REPORTS WITH TRANSACTIONS
  // --------------------------------------------------------
  console.log('📊 Creating daily reports with transactions...')

  const goldTypes: Array<'GOLD_14' | 'GOLD_18' | 'GOLD_21' | 'GOLD_24'> = [
    'GOLD_14',
    'GOLD_18',
    'GOLD_21',
    'GOLD_24',
  ]

  const currencies: Array<'USD' | 'SYP'> = ['USD', 'SYP']
  const paymentTypes: Array<'CASH' | 'TRANSFER' | 'OTHER'> = ['CASH', 'TRANSFER', 'OTHER']

  let totalReports = 0
  let totalSales = 0
  let totalStocks = 0
  let totalExchanges = 0

  // Create reports for each active store for the last 30 days
  for (const store of stores.filter(s => s.status === 'ACTIVE')) {
    console.log(`  📈 Processing store: ${store.name}`)

    for (let daysAgo = 29; daysAgo >= 0; daysAgo--) {
      const reportDate = pastDate(daysAgo)

      // Gold prices (fluctuate slightly)
      const goldPrice14 = randomFloat(50, 60)
      const goldPrice18 = randomFloat(65, 75)
      const goldPrice21 = randomFloat(80, 90)
      const goldPrice24 = randomFloat(95, 105)
      const dollarRate = randomFloat(14, 16)

      // Opening balances (use previous day's closing or default for first day)
      const isFirstDay = daysAgo === 29
      const openingUSD = isFirstDay ? randomFloat(5000, 10000) : randomFloat(8000, 12000)
      const openingSYP = isFirstDay ? randomFloat(80000, 150000) : randomFloat(100000, 200000)
      const openingGold14 = isFirstDay ? randomFloat(500, 1000) : randomFloat(400, 800)
      const openingGold18 = isFirstDay ? randomFloat(400, 800) : randomFloat(300, 700)
      const openingGold21 = isFirstDay ? randomFloat(600, 1200) : randomFloat(500, 1000)
      const openingGold24 = isFirstDay ? randomFloat(800, 1500) : randomFloat(700, 1300)

      // Create report
      const report = await prisma.report.create({
        data: {
          date: reportDate,
          storeId: store.id,
          openingUSD,
          openingSYP,
          openingGold14,
          openingGold18,
          openingGold21,
          openingGold24,
          goldPrice14,
          goldPrice18,
          goldPrice21,
          goldPrice24,
          dollarRate,
          status: daysAgo === 0 ? 'Opening' : 'Closed',
        },
      })

      totalReports++

      // Generate 3-10 sales per day
      const numSales = Math.floor(Math.random() * 8) + 3
      const sales = []

      for (let i = 0; i < numSales; i++) {
        const goldType = randomItem(goldTypes)
        const weight = randomFloat(5, 50, 2)

        // Price per gram based on gold type
        let pricePerGram: number
        switch (goldType) {
          case 'GOLD_14':
            pricePerGram = goldPrice14 + randomFloat(-2, 2)
            break
          case 'GOLD_18':
            pricePerGram = goldPrice18 + randomFloat(-2, 2)
            break
          case 'GOLD_21':
            pricePerGram = goldPrice21 + randomFloat(-2, 2)
            break
          case 'GOLD_24':
            pricePerGram = goldPrice24 + randomFloat(-2, 2)
            break
        }

        const currency = randomItem(currencies)
        const total = weight * pricePerGram

        const sale = await prisma.sale.create({
          data: {
            date: new Date(reportDate.getTime() + Math.random() * 86400000), // Random time within day
            weight,
            goldType,
            pricePerGram,
            total,
            currency,
            customerName: Math.random() > 0.3 ? faker.person.fullName() : null,
            description: Math.random() > 0.5 ? faker.commerce.productDescription() : null,
            paymentType: randomItem(paymentTypes),
            storeId: store.id,
            reportId: report.id,
          },
        })

        sales.push(sale)
        totalSales++
      }

      // Generate 2-5 stock movements per day
      const numStocks = Math.floor(Math.random() * 4) + 2

      for (let i = 0; i < numStocks; i++) {
        const goldType = randomItem(goldTypes)
        const type = randomItem<'ADD' | 'REMOVE'>(['ADD', 'REMOVE'])
        const quantity = randomFloat(10, 100, 2)

        await prisma.stock.create({
          data: {
            date: new Date(reportDate.getTime() + Math.random() * 86400000),
            goldType,
            type,
            quantity,
            note: Math.random() > 0.5 ? faker.lorem.sentence() : null,
            storeId: store.id,
            reportId: report.id,
          },
        })

        totalStocks++
      }

      // Generate 1-4 exchanges per day
      const numExchanges = Math.floor(Math.random() * 4) + 1

      for (let i = 0; i < numExchanges; i++) {
        const fromCurrency = randomItem(currencies)
        const toCurrency = fromCurrency === 'USD' ? 'SYP' : 'USD'
        const amountFrom = randomFloat(100, 2000, 2)
        const rate = fromCurrency === 'USD' ? dollarRate : 1 / dollarRate
        const amountTo = amountFrom * rate

        await prisma.exchange.create({
          data: {
            date: new Date(reportDate.getTime() + Math.random() * 86400000),
            fromCurrency,
            toCurrency,
            amountFrom,
            amountTo,
            rate,
            storeId: store.id,
            reportId: report.id,
          },
        })

        totalExchanges++
      }

      // Calculate totals for closed reports
      if (daysAgo !== 0) {
        const totalGoldSold = sales.reduce((sum: number, sale: any) => sum + sale.weight, 0)
        const totalSalesUSD = sales
          .filter((s: any) => s.currency === 'USD')
          .reduce((sum: number, sale: any) => sum + sale.total, 0)
        const totalSalesSYP = sales
          .filter((s: any) => s.currency === 'SYP')
          .reduce((sum: number, sale: any) => sum + sale.total, 0)

        // Calculate closing balances (simplified)
        const closingUSD = openingUSD + totalSalesUSD + randomFloat(-500, 500)
        const closingSYP = openingSYP + totalSalesSYP + randomFloat(-10000, 10000)

        // Gold sold reduces closing
        const closingGold14 = openingGold14 - randomFloat(10, 50)
        const closingGold18 = openingGold18 - randomFloat(10, 50)
        const closingGold21 = openingGold21 - randomFloat(10, 50)
        const closingGold24 = openingGold24 - randomFloat(10, 50)

        // Calculate profit (10-20% of sales)
        const profitUSD = totalSalesUSD * randomFloat(0.1, 0.2)
        const profitSYP = totalSalesSYP * randomFloat(0.1, 0.2)

        await prisma.report.update({
          where: { id: report.id },
          data: {
            totalGoldSold,
            totalSalesUSD,
            totalSalesSYP,
            closingUSD,
            closingSYP,
            closingGold14: Math.max(0, closingGold14),
            closingGold18: Math.max(0, closingGold18),
            closingGold21: Math.max(0, closingGold21),
            closingGold24: Math.max(0, closingGold24),
            profitUSD,
            profitSYP,
            notes: Math.random() > 0.7 ? faker.lorem.sentence() : null,
            status: 'Closed',
          },
        })
      }
    }
  }

  console.log(`✅ Created ${totalReports} reports\n`)
  console.log(`✅ Created ${totalSales} sales\n`)
  console.log(`✅ Created ${totalStocks} stock movements\n`)
  console.log(`✅ Created ${totalExchanges} exchanges\n`)

  // --------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------
  console.log('📊 DATABASE SEED SUMMARY')
  console.log('========================')
  console.log(`Stores:     ${stores.length}`)
  console.log(`Users:      ${allUsers.length}`)
  console.log(`Reports:    ${totalReports}`)
  console.log(`Sales:      ${totalSales}`)
  console.log(`Stocks:     ${totalStocks}`)
  console.log(`Exchanges:  ${totalExchanges}`)
  console.log('========================\n')

  console.log('🎉 Seed completed successfully!\n')
  console.log('📝 Test Credentials:')
  console.log('-------------------')
  console.log('Admin Account:')
  console.log('  Email:    admin@system.com')
  console.log('  Password: password123\n')
  console.log('Store Accounts:')
  stores.forEach(store => {
    console.log(`  ${store.name}`)
    const owner = allUsers.find(u => u.id === store.ownerId)
    if (owner) {
      console.log(`    Email:    ${owner.email}`)
      console.log('    Password: password123\n')
    }
  })
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })