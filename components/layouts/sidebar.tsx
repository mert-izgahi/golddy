"use client";

import { useMemo } from "react";
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
} from "@/components/ui/sidebar";
import { useGetProfileQuery } from "@/hooks/use-profile";
import { useLangStore } from "@/store/lang-store";
import {
    Home as HomeIcon,
    SquareActivity as SalesIcon,
    LibraryBig as StockIcon,
    ChartCandlestick as ExchangeRatesIcon,
    FileBox as ReportsIcon,
    HandCoins as ExchangeIcon,
    Store as StoreIcon,
    Settings as SettingsIcon,
} from "lucide-react";
import Logo from "../shared/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

function Sidebar() {
    const { data: profile, isLoading } = useGetProfileQuery();
    const { lang, t } = useLangStore();

    const store = useMemo(() => {
        if (profile?.stores && profile.stores.length > 0) {
            return profile.stores[0];
        }
        return null;
    }, [profile]);

    const pathname = usePathname();

    const links = [
        {
            label: lang === "en" ? "Dashboard" : "لوحة القيادة",
            href: `/${store?.id}`,
            icon: <HomeIcon size={12} />,
            isActive: pathname === `/${store?.id}`,
        },
        {
            label: lang === "en" ? "Sales" : "المبيعات",
            href: `/${store?.id}/sales`,
            icon: <SalesIcon size={12} />,
            isActive: pathname === `/${store?.id}/sales`,
        },
        {
            label: lang === "en" ? "Stock" : "المخزون",
            href: `/${store?.id}/stock`,
            icon: <StockIcon size={12} />,
            isActive: pathname === `/${store?.id}/stock`,
        },
        // {
        //     label: lang === "en" ? "Exchanges" : "التحويلات",
        //     href: `/${store?.id}/exchanges`,
        //     icon: <ExchangeIcon size={12} />,
        //     isActive: pathname === `/${store?.id}/exchanges`,
        // },
        // {
        //     label: lang === "en" ? "Reports" : "التقارير",
        //     href: `/${store?.id}/reports`,
        //     icon: <ReportsIcon size={12} />,
        //     isActive: pathname === `/${store?.id}/reports`,
        // },
        // {
        //     label: lang === "en" ? "Exchange Rates" : "أسعار الصرف",
        //     href: `/${store?.id}/exchange-rates`,
        //     icon: <ExchangeRatesIcon size={12} />,
        //     isActive: pathname === `/${store?.id}/exchange-rates`,
        // },
    ];

    const settingsLinks = [
        {
            label: lang === "en" ? "Store Settings" : "إعدادات المتجر",
            href: `/${store?.id}/store-settings`,
            icon: <StoreIcon size={12} />,
            isActive: pathname === `/${store?.id}/store-settings`,
        },
        // {
        //     label: lang === "en" ? "Account" : "الحساب",
        //     href: `/${store?.id}/account`,
        //     icon: <SettingsIcon size={12} />,
        //     isActive: pathname === `/${store?.id}/account`,
        // },
    ];

    if (isLoading) {
        return <Skeleton className="w-60 h-screen" />;
    }

    return (
        <SidebarCN side={lang === "en" ? "left" : "right"}>
            <SidebarHeader className="bg-background h-16 flex items-start justify-center p-4">
                <Logo />
            </SidebarHeader>

            <SidebarContent className="bg-background">
                {/* Main Menu */}
                <SidebarGroup>
                    <SidebarGroupLabel>
                        {lang === "en" ? "Main Menu" : "القائمة الرئيسية"}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {links.map((link) => (
                                <SidebarMenuItem key={link.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "h-10 hover:bg-teal-800/10 rounded-md",
                                            {
                                                "bg-teal-800 text-white hover:bg-teal-800/80 hover:text-white":
                                                    link.isActive,
                                            }
                                        )}
                                    >
                                        <Link href={link.href} className="flex items-center gap-2 w-full">
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Settings Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>
                        {lang === "en" ? "Settings" : "الإعدادات"}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {settingsLinks.map((link) => (
                                <SidebarMenuItem key={link.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "h-10 hover:bg-teal-800/10 rounded-md",
                                            {
                                                "bg-teal-800 text-white hover:bg-teal-800/80 hover:text-white":
                                                    link.isActive,
                                            }
                                        )}
                                    >
                                        <Link href={link.href} className="flex items-center gap-2 w-full">
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="w-full h-16 flex items-start justify-center p-4 bg-background">
                <p>
                    {t("gold store", "")}
                </p>
            </SidebarFooter>
        </SidebarCN>
    );
}

export default Sidebar;
