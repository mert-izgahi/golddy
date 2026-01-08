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
        <div>
            {children}
        </div>
    )
}

export default layout