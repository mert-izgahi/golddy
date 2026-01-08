"use client";
import React, { useMemo } from 'react'
import {
    Sidebar as SidebarCN,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { useGetProfileQuery } from '@/hooks/use-profile';
import { useLangStore } from '@/store/lang-store';
import {
    Home as HomeIcon, SquareActivity as SalesIcon, LibraryBig as StockIcon,
    ChartCandlestick as ExchangeRatesIcon,
    FileBox as ReportsIcon,
    HandCoins as ExchangeIcon
} from 'lucide-react';
import Logo from '../shared/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import SignoutButton from '../buttons/sign-out-button';
function Sidebar() {
    const { data: profile, isLoading } = useGetProfileQuery();
    const { lang } = useLangStore();
    // const store = profile?.stores && profile.stores.length > 0 ? profile.stores[0] : null;
    const store = useMemo(() => {
        if (profile?.stores && profile.stores.length > 0) {
            return profile.stores[0];
        }
        return null;
    }, [profile]);

    const pathname = usePathname();
    const links = [
        {
            label: lang === "en" ? "Dashboard" : lang === "ar" ? "لوحة القيادة" : "Dashboard",
            href: `/${store?.id}`,
            icon: <HomeIcon size={12} />,
            isActive: pathname === `/${store?.id}`
        },
        {
            label: lang === "en" ? "Sales" : lang === "ar" ? "المبيعات" : "Sales",
            href: `/${store?.id}/sales`,
            icon: <SalesIcon size={12} />,
            isActive: pathname === `/${store?.id}/sales`
        },
        {
            label: lang === "en" ? "Stock" : lang === "ar" ? "المخزون" : "Stock",
            href: `/${store?.id}/stock`,
            icon: <StockIcon size={12} />,
            isActive: pathname === `/${store?.id}/stock`
        },
        {
            label: lang === "en" ? "Exchanges" : lang === "ar" ? "التحويلات" : "Exchanges",
            href: `/${store?.id}/exchanges`,
            icon: <ExchangeIcon size={12} />,
            isActive: pathname === `/${store?.id}/exchanges`
        },
        {
            label: lang === "en" ? "Reports" : lang === "ar" ? "التقارير" : "Reports",
            href: `/${store?.id}/reports`,
            icon: <ReportsIcon size={12} />,
            isActive: pathname === `/${store?.id}/reports`
        },
        {
            label: lang === "en" ? "Exchange Rates" : lang === "ar" ? "أسعار الصرف" : "Exchange Rates",
            href: `/${store?.id}/exchange-rates`,
            icon: <ExchangeRatesIcon size={12} />,
            isActive: pathname === `/${store?.id}/exchange-rates`
        },
        // {
        //     label: lang === "en" ? "Users" : lang === "ar" ? "المستخدمون" : "Users",
        //     href: `/${store?.id}/users`,
        //     icon: <UsersIcon size={12} />,
        //     isActive: pathname === `/${store?.id}/users`
        // },
        // {
        //     label: lang === "en" ? "Manage Stores" : lang === "ar" ? "إدارة المتاجر" : "Manage Stores",
        //     href: `/manage-stores`,
        //     icon: <HomeIcon size={12} />,
        //     isActive: pathname === `/manage-stores`
        // }

    ]

    if (isLoading) {
        return <Skeleton className='w-60 h-screen' />
    }

    return (
        <SidebarCN
            side={lang === "en" ? "left" : "right"}
        >
            <SidebarHeader className='bg-background h-16 flex items-start justify-center p-4'>
                <Logo />
            </SidebarHeader>
            <SidebarContent className='bg-background'>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        {lang === "en" ? "Main Menu" : lang === "ar" ? "القائمة الرئيسية" : "Main Menu"}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {links.map((link) => {
                                return (
                                    <SidebarMenuItem key={link.href}>
                                        <SidebarMenuButton asChild className={cn('h-10 hover:bg-teal-800/10 rounded-md',
                                            { 'bg-teal-800 text-white hover:bg-teal-800/80 hover:text-white': link.isActive }
                                        )}>
                                            <Link href={link.href} className='flex items-center gap-2 w-full'>
                                                {link.icon}
                                                {link.label}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className='w-full h-16 flex items-start justify-center p-4 bg-background'>
                <SignoutButton />
            </SidebarFooter>
        </SidebarCN>
    )
}

export default Sidebar