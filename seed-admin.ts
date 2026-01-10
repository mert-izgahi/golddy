import { hashPassword } from '@/lib/hash-password'
import prisma from '@/lib/prisma'

async function seedAdmin() {
    console.log('👑 Starting admin user and settings seed...\n')

    try {
        // Clear only admin users if they exist
        console.log('🧹 Cleaning existing admin users...')
        await prisma.user.deleteMany({
            where: {
                OR: [
                    { email: 'admin@system.com' },
                    { role: 'ADMIN' }
                ]
            }
        })
        console.log('✅ Existing admin users cleaned\n')

        // Clear existing settings
        console.log('🧹 Cleaning existing settings...')
        await prisma.settings.deleteMany({})
        console.log('✅ Existing settings cleaned\n')

        // Create common hashed password: "password123"
        const hashedPassword = await hashPassword('password123')

        // Create the main admin user
        const adminUser = await prisma.user.create({
            data: {
                email: 'admin@system.com',
                password: hashedPassword,
                name: 'System Administrator',
                role: 'ADMIN',
                phoneNumber: '+1 (555) 123-4567',
            },
        })
        console.log('✅ Admin user created successfully!\n')

        // Create initial settings with realistic values
        const settings = await prisma.settings.create({
            data: {
                date: new Date(),
                // Current gold prices in USD (per gram) - based on real market rates
                priceGold14USD: 51.95,
                priceGold18USD: 66.50,
                priceGold21USD: 77.75,
                priceGold24USD: 88.80,
                // Current gold prices in SYP (per gram) - calculated using exchange rate
                priceGold14SYP: 801.57,
                priceGold18SYP: 1026.00,
                priceGold21SYP: 1200.00,
                priceGold24SYP: 1370.00,
                // Current exchange rate (1 USD to SYP)
                exchangeRateUSDtoSYP: 15.43,
            },
        })
        console.log('✅ System settings created successfully!\n')

        // Verify both were created
        const createdAdmin = await prisma.user.findUnique({
            where: { email: 'admin@system.com' }
        })

        const createdSettings = await prisma.settings.findFirst()

        if (createdAdmin && createdSettings) {
            console.log('\n📝 ADMIN CREDENTIALS')
            console.log('===================')
            console.log('Email:    admin@system.com')
            console.log('Password: password123')
            console.log('Role:     ADMIN')
            console.log('===================\n')

            console.log('⚙️  SYSTEM SETTINGS')
            console.log('===================')
            console.log(`Gold Prices (USD per gram):`)
            console.log(`  14K: $${createdSettings.priceGold14USD.toFixed(2)}`)
            console.log(`  18K: $${createdSettings.priceGold18USD.toFixed(2)}`)
            console.log(`  21K: $${createdSettings.priceGold21USD.toFixed(2)}`)
            console.log(`  24K: $${createdSettings.priceGold24USD.toFixed(2)}`)
            console.log(`\nGold Prices (SYP per gram):`)
            console.log(`  14K: ${createdSettings.priceGold14SYP.toFixed(2)} SYP`)
            console.log(`  18K: ${createdSettings.priceGold18SYP.toFixed(2)} SYP`)
            console.log(`  21K: ${createdSettings.priceGold21SYP.toFixed(2)} SYP`)
            console.log(`  24K: ${createdSettings.priceGold24SYP.toFixed(2)} SYP`)
            console.log(`\nExchange Rate: 1 USD = ${createdSettings.exchangeRateUSDtoSYP.toFixed(2)} SYP`)
            console.log(`Date: ${createdSettings.date.toLocaleDateString()}`)
            console.log('===================\n')
        }

        console.log('🎉 Admin and settings seed completed successfully!')

    } catch (error) {
        console.error('❌ Error creating admin user and settings:')
        console.error(error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

// Run the seed
seedAdmin()