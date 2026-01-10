"use client";

import { useLangStore } from '@/store/lang-store';
import { useRouter } from 'next/navigation'
import React from 'react'
import {
    FaUsers as UsersIcon,
    FaStore as StoresIcon,
    FaHome as HomeIcon,
    FaCog as SettingsIcon,
    FaChevronRight as ArrowIcon,
    FaChevronLeft as ArrowIconAr
} from 'react-icons/fa'


function AdminHomePage() {
    const router = useRouter();
    const { lang, t } = useLangStore();
    const isRTL = lang === 'ar';

    const cards = [
        {
            id: 1,
            title: t("Dashboard", "لوحة التحكم"),
            description: t("View overall statistics and analytics", "عرض الإحصائيات والتحليلات الشاملة"),
            icon: <HomeIcon className="w-8 h-8" />,
            path: "/admin",
            count: null,
            gradient: "from-teal-700 to-teal-800"
        },
        {
            id: 2,
            title: t("Users", "المستخدمين"),
            description: t("Manage all user accounts and permissions", "إدارة جميع حسابات المستخدمين والصلاحيات"),
            icon: <UsersIcon className="w-8 h-8" />,
            path: "/admin/users",
            count: 245,
            gradient: "from-teal-800 to-teal-900"
        },
        {
            id: 3,
            title: t("Stores", "المتاجر"),
            description: t("Manage store locations and inventory", "إدارة مواقع المتاجر والمخزون"),
            icon: <StoresIcon className="w-8 h-8" />,
            path: "/admin/stores",
            count: 42,
            gradient: "from-teal-600 to-teal-700"
        },
        {
            id: 4,
            title: t("Settings", "الإعدادات"),
            description: t("Configure system settings and preferences", "تكوين إعدادات النظام والتخصيصات"),
            icon: <SettingsIcon className="w-8 h-8" />,
            path: "/admin/settings",
            count: null,
            gradient: "from-teal-900 to-teal-950"
        }
    ]

    const handleCardClick = (path: string) => {
        router.push(path);
    }

    // Get appropriate arrow icon based on direction
    const ArrowComponent = isRTL ? ArrowIconAr : ArrowIcon;

    return (
        <div
            className="min-h-screen p-4 md:p-6"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-teal-800">
                    {t("Admin Dashboard", "لوحة تحكم المدير")}
                </h1>
                <p className="text-gray-600 mt-2">
                    {t("Welcome back! Manage your platform from here.", "مرحباً بعودتك! إدارة منصتك من هنا.")}
                </p>
            </div>

            {/* Main Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(card.path)}
                        className="group cursor-pointer"
                    >
                        <div className="bg-white rounded-md shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            {/* Gradient Header */}
                            <div className={`bg-gradient-to-r ${card.gradient} p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className="text-white">
                                        {card.icon}
                                    </div>
                                    {card.count !== null && (
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                            <span className="text-white font-semibold text-sm">{card.count}</span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-white text-xl font-bold mt-4">{card.title}</h3>
                            </div>

                            {/* Card Body */}
                            <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                                <div className={`flex items-center justify-between`}>
                                    <span className="text-teal-700 font-medium text-sm group-hover:text-teal-800 transition-colors">
                                        {t("View Details", "عرض التفاصيل")}
                                    </span>
                                    <ArrowComponent
                                        className={`w-4 h-4 text-teal-700 transition-transform ${isRTL
                                                ? 'group-hover:-translate-x-1'
                                                : 'group-hover:translate-x-1'
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminHomePage