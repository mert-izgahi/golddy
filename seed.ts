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

// Helper function to generate unique invoice number
let invoiceCounter = 1000
function generateInvoiceNumber(storeIndex: number): string {
  return `INV-${storeIndex}-${invoiceCounter++}`
}

async function main() {
  console.log('🌱 Starting database seed...\n')

  // Clear existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.sale.deleteMany()
  await prisma.stock.deleteMany()
  await prisma.exchange.deleteMany()
  await prisma.report.deleteMany()
  await prisma.store.deleteMany()
  await prisma.user.deleteMany()
  
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
        // Initialize current inventory
        currentGold14: randomFloat(500, 1000),
        currentGold18: randomFloat(400, 800),
        currentGold21: randomFloat(600, 1200),
        currentGold24: randomFloat(800, 1500),
        // Initialize current cash
        currentUSD: randomFloat(5000, 10000),
        currentSYP: randomFloat(80000, 150000),
        // Set initial prices
        priceGold14USD: randomFloat(50, 60),
        priceGold18USD: randomFloat(65, 75),
        priceGold21USD: randomFloat(80, 90),
        priceGold24USD: randomFloat(95, 105),
        priceGold14SYP: randomFloat(700, 900),
        priceGold18SYP: randomFloat(900, 1100),
        priceGold21SYP: randomFloat(1100, 1400),
        priceGold24SYP: randomFloat(1300, 1600),
        exchangeRateUSDtoSYP: randomFloat(14, 16),
        lastPriceUpdate: new Date(),
        // Set profit margins
        profitMarginGold14: randomFloat(3, 7),
        profitMarginGold18: randomFloat(3, 7),
        profitMarginGold21: randomFloat(3, 7),
        profitMarginGold24: randomFloat(3, 7),
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
        currentGold14: randomFloat(500, 1000),
        currentGold18: randomFloat(400, 800),
        currentGold21: randomFloat(600, 1200),
        currentGold24: randomFloat(800, 1500),
        currentUSD: randomFloat(5000, 10000),
        currentSYP: randomFloat(80000, 150000),
        priceGold14USD: randomFloat(50, 60),
        priceGold18USD: randomFloat(65, 75),
        priceGold21USD: randomFloat(80, 90),
        priceGold24USD: randomFloat(95, 105),
        priceGold14SYP: randomFloat(700, 900),
        priceGold18SYP: randomFloat(900, 1100),
        priceGold21SYP: randomFloat(1100, 1400),
        priceGold24SYP: randomFloat(1300, 1600),
        exchangeRateUSDtoSYP: randomFloat(14, 16),
        lastPriceUpdate: new Date(),
        profitMarginGold14: randomFloat(3, 7),
        profitMarginGold18: randomFloat(3, 7),
        profitMarginGold21: randomFloat(3, 7),
        profitMarginGold24: randomFloat(3, 7),
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
        currentGold14: randomFloat(500, 1000),
        currentGold18: randomFloat(400, 800),
        currentGold21: randomFloat(600, 1200),
        currentGold24: randomFloat(800, 1500),
        currentUSD: randomFloat(5000, 10000),
        currentSYP: randomFloat(80000, 150000),
        priceGold14USD: randomFloat(50, 60),
        priceGold18USD: randomFloat(65, 75),
        priceGold21USD: randomFloat(80, 90),
        priceGold24USD: randomFloat(95, 105),
        priceGold14SYP: randomFloat(700, 900),
        priceGold18SYP: randomFloat(900, 1100),
        priceGold21SYP: randomFloat(1100, 1400),
        priceGold24SYP: randomFloat(1300, 1600),
        exchangeRateUSDtoSYP: randomFloat(14, 16),
        lastPriceUpdate: new Date(),
        profitMarginGold14: randomFloat(3, 7),
        profitMarginGold18: randomFloat(3, 7),
        profitMarginGold21: randomFloat(3, 7),
        profitMarginGold24: randomFloat(3, 7),
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
        currentGold14: randomFloat(500, 1000),
        currentGold18: randomFloat(400, 800),
        currentGold21: randomFloat(600, 1200),
        currentGold24: randomFloat(800, 1500),
        currentUSD: randomFloat(5000, 10000),
        currentSYP: randomFloat(80000, 150000),
        priceGold14USD: randomFloat(50, 60),
        priceGold18USD: randomFloat(65, 75),
        priceGold21USD: randomFloat(80, 90),
        priceGold24USD: randomFloat(95, 105),
        priceGold14SYP: randomFloat(700, 900),
        priceGold18SYP: randomFloat(900, 1100),
        priceGold21SYP: randomFloat(1100, 1400),
        priceGold24SYP: randomFloat(1300, 1600),
        exchangeRateUSDtoSYP: randomFloat(14, 16),
        lastPriceUpdate: new Date(),
        profitMarginGold14: randomFloat(3, 7),
        profitMarginGold18: randomFloat(3, 7),
        profitMarginGold21: randomFloat(3, 7),
        profitMarginGold24: randomFloat(3, 7),
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
        currentGold14: randomFloat(500, 1000),
        currentGold18: randomFloat(400, 800),
        currentGold21: randomFloat(600, 1200),
        currentGold24: randomFloat(800, 1500),
        currentUSD: randomFloat(5000, 10000),
        currentSYP: randomFloat(80000, 150000),
        priceGold14USD: randomFloat(50, 60),
        priceGold18USD: randomFloat(65, 75),
        priceGold21USD: randomFloat(80, 90),
        priceGold24USD: randomFloat(95, 105),
        priceGold14SYP: randomFloat(700, 900),
        priceGold18SYP: randomFloat(900, 1100),
        priceGold21SYP: randomFloat(1100, 1400),
        priceGold24SYP: randomFloat(1300, 1600),
        exchangeRateUSDtoSYP: randomFloat(14, 16),
        lastPriceUpdate: new Date(),
        profitMarginGold14: randomFloat(3, 7),
        profitMarginGold18: randomFloat(3, 7),
        profitMarginGold21: randomFloat(3, 7),
        profitMarginGold24: randomFloat(3, 7),
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
  // 4. CREATE REPORTS WITH TRANSACTIONS
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
  for (let storeIndex = 0; storeIndex < stores.length; storeIndex++) {
    const store = stores[storeIndex]
    
    if (store.status !== 'ACTIVE') continue

    console.log(`  📈 Processing store: ${store.name}`)

    // Track balances throughout the period
    let runningUSD = store.currentUSD
    let runningSYP = store.currentSYP
    let runningGold14 = store.currentGold14
    let runningGold18 = store.currentGold18
    let runningGold21 = store.currentGold21
    let runningGold24 = store.currentGold24

    for (let daysAgo = 29; daysAgo >= 0; daysAgo--) {
      const reportDate = pastDate(daysAgo)

      // Gold prices (fluctuate slightly day by day)
      const goldPrice14 = randomFloat(50, 60)
      const goldPrice18 = randomFloat(65, 75)
      const goldPrice21 = randomFloat(80, 90)
      const goldPrice24 = randomFloat(95, 105)
      const dollarRate = randomFloat(14, 16)

      // Opening balances are previous day's closing or initial values
      const openingUSD = runningUSD
      const openingSYP = runningSYP
      const openingGold14 = runningGold14
      const openingGold18 = runningGold18
      const openingGold21 = runningGold21
      const openingGold24 = runningGold24

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

      // Track gold balances
      const goldBalances = {
        GOLD_14: openingGold14,
        GOLD_18: openingGold18,
        GOLD_21: openingGold21,
        GOLD_24: openingGold24,
      }

      // Generate 3-10 sales per day
      const numSales = Math.floor(Math.random() * 8) + 3
      const sales = []

      for (let i = 0; i < numSales; i++) {
        const goldType = randomItem(goldTypes)
        const weight = randomFloat(5, 50, 2)

        // Price per gram based on gold type
        let pricePerGramUSD: number
        let costPricePerGram: number
        let profitMargin: number

        switch (goldType) {
          case 'GOLD_14':
            costPricePerGram = goldPrice14
            profitMargin = store.profitMarginGold14
            pricePerGramUSD = costPricePerGram * (1 + profitMargin / 100)
            break
          case 'GOLD_18':
            costPricePerGram = goldPrice18
            profitMargin = store.profitMarginGold18
            pricePerGramUSD = costPricePerGram * (1 + profitMargin / 100)
            break
          case 'GOLD_21':
            costPricePerGram = goldPrice21
            profitMargin = store.profitMarginGold21
            pricePerGramUSD = costPricePerGram * (1 + profitMargin / 100)
            break
          case 'GOLD_24':
            costPricePerGram = goldPrice24
            profitMargin = store.profitMarginGold24
            pricePerGramUSD = costPricePerGram * (1 + profitMargin / 100)
            break
        }

        const pricePerGramSYP = pricePerGramUSD * dollarRate
        const currency = randomItem(currencies)
        
        const totalUSD = weight * pricePerGramUSD
        const totalSYP = weight * pricePerGramSYP
        const amountPaid = currency === 'USD' ? totalUSD : totalSYP

        const costPriceUSD = weight * costPricePerGram
        const profitUSD = totalUSD - costPriceUSD
        const profitSYP = profitUSD * dollarRate

        const sale = await prisma.sale.create({
          data: {
            invoiceNumber: generateInvoiceNumber(storeIndex),
            date: new Date(reportDate.getTime() + Math.random() * 86400000), // Random time within day
            weight,
            goldType,
            pricePerGramUSD,
            pricePerGramSYP,
            totalUSD,
            totalSYP,
            currency,
            paymentType: randomItem(paymentTypes),
            amountPaid,
            customerName: Math.random() > 0.3 ? faker.person.fullName() : null,
            customerPhone: Math.random() > 0.5 ? faker.phone.number() : null,
            description: Math.random() > 0.5 ? faker.commerce.productDescription() : null,
            costPriceUSD,
            profitUSD,
            profitSYP,
            profitMargin,
            storeId: store.id,
            reportId: report.id,
          },
        })

        sales.push(sale)
        totalSales++

        // Update running balances
        goldBalances[goldType] -= weight
        if (currency === 'USD') {
          runningUSD += totalUSD
        } else {
          runningSYP += totalSYP
        }
      }

      // Generate 2-5 stock movements per day
      const numStocks = Math.floor(Math.random() * 4) + 2

      for (let i = 0; i < numStocks; i++) {
        const goldType = randomItem(goldTypes)
        const type = randomItem<'ADD' | 'REMOVE'>(['ADD', 'REMOVE'])
        const quantity = randomFloat(10, 100, 2)

        // Cost tracking for purchases (ADD operations)
        const costPerGramUSD = type === 'ADD' ? randomFloat(45, 100) : null
        const totalCostUSD = costPerGramUSD ? quantity * costPerGramUSD : null
        const totalCostSYP = totalCostUSD ? totalCostUSD * dollarRate : null

        // Update balance
        if (type === 'ADD') {
          goldBalances[goldType] += quantity
          // Deduct cost from cash
          if (totalCostUSD) {
            runningUSD -= totalCostUSD
          }
        } else {
          goldBalances[goldType] -= quantity
        }

        await prisma.stock.create({
          data: {
            date: new Date(reportDate.getTime() + Math.random() * 86400000),
            goldType,
            type,
            quantity,
            balanceAfter: goldBalances[goldType],
            costPerGramUSD,
            totalCostUSD,
            totalCostSYP,
            supplier: type === 'ADD' && Math.random() > 0.5 ? faker.company.name() : null,
            invoiceRef: type === 'ADD' && Math.random() > 0.5 ? `SUP-${faker.string.alphanumeric(6).toUpperCase()}` : null,
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
        const exchangeRate = dollarRate
        const amountTo = fromCurrency === 'USD' ? amountFrom * exchangeRate : amountFrom / exchangeRate

        // Update running balances
        if (fromCurrency === 'USD') {
          runningUSD -= amountFrom
          runningSYP += amountTo
        } else {
          runningSYP -= amountFrom
          runningUSD += amountTo
        }

        await prisma.exchange.create({
          data: {
            date: new Date(reportDate.getTime() + Math.random() * 86400000),
            fromCurrency,
            toCurrency,
            amountFrom,
            amountTo,
            exchangeRate,
            balanceUSDAfter: runningUSD,
            balanceSYPAfter: runningSYP,
            storeId: store.id,
            reportId: report.id,
          },
        })

        totalExchanges++
      }

      // Update gold balances from the tracking object
      runningGold14 = goldBalances.GOLD_14
      runningGold18 = goldBalances.GOLD_18
      runningGold21 = goldBalances.GOLD_21
      runningGold24 = goldBalances.GOLD_24

      // Calculate totals for closed reports
      if (daysAgo !== 0) {
        const totalGoldSold = sales.reduce((sum: number, sale: any) => sum + sale.weight, 0)
        const totalSalesUSD = sales.reduce((sum: number, sale: any) => sum + sale.totalUSD, 0)
        const totalSalesSYP = sales.reduce((sum: number, sale: any) => sum + sale.totalSYP, 0)
        const profitUSD = sales.reduce((sum: number, sale: any) => sum + sale.profitUSD, 0)
        const profitSYP = sales.reduce((sum: number, sale: any) => sum + sale.profitSYP, 0)

        await prisma.report.update({
          where: { id: report.id },
          data: {
            totalGoldSold,
            totalSalesUSD,
            totalSalesSYP,
            closingUSD: runningUSD,
            closingSYP: runningSYP,
            closingGold14: Math.max(0, runningGold14),
            closingGold18: Math.max(0, runningGold18),
            closingGold21: Math.max(0, runningGold21),
            closingGold24: Math.max(0, runningGold24),
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