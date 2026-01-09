import Header from '@/components/layouts/header';
import Sidebar from '@/components/layouts/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar'
import { getAuthUser } from '@/lib/actions';
import { Role } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react'

async function layout({ children }: PropsWithChildren) {
    const user = await getAuthUser();

    if (!user) {
        redirect('/auth/sign-in');
    }

    if (user.role !== Role.STORE) {
        redirect('/admin');
    }

    const store = await prisma.store.findFirst({
        where: {
            ownerId: user.id
        }
    });

    if (!store) {
        redirect('/create-store');
    }

    return (
        <SidebarProvider>
            <Sidebar />
            <main className="flex-1">
                <Header store={store} />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default layout