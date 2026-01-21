"use client";

import { useGetProfileQuery } from "@/hooks/use-profile";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useLangStore } from "@/store/lang-store";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Settings, Store } from "lucide-react";
import Link from "next/link";
import { useGetStoreById } from "@/hooks/use-stores";
import { useSignOutMutation } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

interface UserButtonProps {
    storeId?: string;
}

function UserButton({ storeId }: UserButtonProps) {
    const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
    const { data: store, isLoading: loadingStore } = useGetStoreById(storeId || "");
    const { lang, t } = useLangStore();
    const { mutate: signOut, isPending } = useSignOutMutation();
    const router = useRouter();

    if (loadingProfile || loadingStore) {
        return <Skeleton className="w-10 h-10 rounded-full" />;
    }
    const handleSignOut = async () => {
        await signOut();
        router.refresh();
        router.push('/auth/sign-in');
    }

    const menuItems = [
        // {
        //     label: t("Account Settings", "إعدادات الحساب"),
        //     icon: <Settings className="w-4 h-4 mr-2" />,
        //     link: `/${storeId}/account`,
        // },
        {
            label: t("Store Settings", "إعدادات المتجر"),
            icon: <Store className="w-4 h-4 mr-2" />,
            link: `/${storeId}/settings`,
        },
    ];

    return (
        <DropdownMenu dir={lang === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 rounded cursor-pointer">
                    <AvatarImage src={store?.logoUrl || ""} alt={profile?.name || "User Avatar"} />
                    <AvatarFallback>
                        {store?.name ? store.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-medium">
                    {profile?.email || ""}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {menuItems.map((item, index) => (
                    <DropdownMenuItem key={index} asChild className="cursor-pointer">
                        <Link href={item.link}>
                            {item.icon}
                            {item.label}
                        </Link>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>{t("Logout", "تسجيل الخروج")}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserButton;
