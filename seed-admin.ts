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
    } catch (error) {
        console.error('❌ Error creating admin user and settings:')
        console.error(error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

// Run the seed
// seedAdmin()


async function resetUserPassword() {
    const email = "user@example.com";
    const pass = "password123";

    const hashedPassword = await hashPassword(pass);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        
        if (user) {
            await prisma.user.update({
                where: {
                    email
                },
                data: {
                    password: hashedPassword
                }
            });
        }

        console.log('✅ User password reset successfully!\n');
    } catch (error) {
        console.error('❌ Error resetting user password:');
        console.error(error);
        process.exit(1);
    }
}

resetUserPassword();