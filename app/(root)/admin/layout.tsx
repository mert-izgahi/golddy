import AdminHeader from '@/components/layouts/admin-header';
import { getAuthUser } from '@/lib/actions'
import { Role } from '@/lib/generated/prisma';
import React from 'react'

async function layout({ children }: { children: React.ReactNode }) {
    const user = await getAuthUser();
    if (!user || user.role !== Role.ADMIN) {
        // You can customize the unauthorized access handling here
        return <div>Unauthorized Access</div>;
    }
    return (
        <div className='flex flex-col min-h-screen'>
            <AdminHeader />
            <div className="flex-1 p-4">
                {children}
            </div>
        </div>
    )
}

export default layout