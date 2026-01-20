// app/(root)/(store)/[storeId]/settings/client.tsx
"use client";

import { useLangStore } from "@/store/lang-store";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Building2, 
  Coins, 
  DollarSign, 
  Users, 
  Bell, 
  Shield,
  Globe,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
  PlusCircle,
  Download,
  Upload,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

interface Props {
    storeId: string;
}

function StoreSettingsPage({ storeId }: Props) {
    const { lang } = useLangStore();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("general");
    
    // Mock store data - in real app, you'd fetch this from API
    const storeData = {
        name: "Gold Store Main Branch",
        status: "ACTIVE",
        address: "123 Gold Street, Downtown",
        city: "Damascus",
        primaryPhoneNumber: "+963 11 123 4567",
        secondaryPhoneNumber: "+963 11 987 6543",
        logoUrl: "",
        currentGold14: 150.25,
        currentGold18: 89.50,
        currentGold21: 45.75,
        currentGold24: 200.00,
        currentUSD: 50000,
        currentSYP: 15000000,
        priceGold14USD: 35.50,
        priceGold18USD: 45.75,
        priceGold21USD: 53.25,
        priceGold24USD: 60.80,
        exchangeRateUSDtoSYP: 14500,
        createdAt: "2024-01-15",
        updatedAt: "2024-12-20"
    };

    const title = lang === "en" ? "Store Settings" : "إعدادات المتجر";
    const description = lang === "en" 
        ? "Manage your store configuration, preferences, and settings" 
        : "إدارة إعدادات المتجر والتكوينات والتفضيلات";

    const tabs = [
        { 
            id: "general", 
            label: lang === "en" ? "General" : "عام",
            icon: <Settings className="h-4 w-4" />,
            description: lang === "en" 
                ? "Basic store information and settings" 
                : "المعلومات الأساسية وإعدادات المتجر"
        },
        { 
            id: "gold", 
            label: lang === "en" ? "Gold Settings" : "إعدادات الذهب",
            icon: <Coins className="h-4 w-4" />,
            description: lang === "en" 
                ? "Configure gold prices and inventory settings" 
                : "تكوين أسعار الذهب وإعدادات المخزون"
        },
        { 
            id: "currency", 
            label: lang === "en" ? "Currency" : "العملات",
            icon: <DollarSign className="h-4 w-4" />,
            description: lang === "en" 
                ? "Manage currency exchange rates and settings" 
                : "إدارة أسعار الصرف وإعدادات العملات"
        },
        { 
            id: "security", 
            label: lang === "en" ? "Security" : "الأمان",
            icon: <Shield className="h-4 w-4" />,
            description: lang === "en" 
                ? "Security settings and access control" 
                : "إعدادات الأمان والتحكم في الوصول"
        },
        { 
            id: "notifications", 
            label: lang === "en" ? "Notifications" : "الإشعارات",
            icon: <Bell className="h-4 w-4" />,
            description: lang === "en" 
                ? "Configure notification preferences" 
                : "تكوين تفضيلات الإشعارات"
        },
        { 
            id: "backup", 
            label: lang === "en" ? "Backup & Export" : "النسخ الاحتياطي",
            icon: <Download className="h-4 w-4" />,
            description: lang === "en" 
                ? "Backup and export store data" 
                : "نسخ احتياطي وتصدير بيانات المتجر"
        }
    ];

    const calculateTotals = () => {
        const totalGoldWeight = storeData.currentGold14 + storeData.currentGold18 + 
                              storeData.currentGold21 + storeData.currentGold24;
        const totalGoldValue = (storeData.currentGold14 * storeData.priceGold14USD) +
                             (storeData.currentGold18 * storeData.priceGold18USD) +
                             (storeData.currentGold21 * storeData.priceGold21USD) +
                             (storeData.currentGold24 * storeData.priceGold24USD);
        const totalCashUSD = storeData.currentUSD + (storeData.currentSYP / storeData.exchangeRateUSDtoSYP);
        
        return {
            totalGoldWeight: totalGoldWeight.toFixed(2),
            totalGoldValue: totalGoldValue.toFixed(2),
            totalCashUSD: totalCashUSD.toFixed(2),
            totalInventory: (totalGoldValue + totalCashUSD).toFixed(2)
        };
    };

    const totals = calculateTotals();

    return (
        <div className="p-4 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="flex items-center gap-2"
                        >
                            <X className="h-4 w-4" />
                            {lang === "en" ? "Back" : "رجوع"}
                        </Button>
                        <Button className="bg-teal-800 hover:bg-teal-800/80 flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            {lang === "en" ? "Save Changes" : "حفظ التغييرات"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Store Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Store Status" : "حالة المتجر"}
                            </CardTitle>
                            <Badge variant={storeData.status === "ACTIVE" ? "default" : "secondary"}>
                                {storeData.status === "ACTIVE" 
                                    ? lang === "en" ? "Active" : "نشط"
                                    : lang === "en" ? "Inactive" : "غير نشط"
                                }
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{storeData.name}</div>
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                            {storeData.address}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Gold Inventory" : "مخزون الذهب"}
                            </CardTitle>
                            <Coins className="h-4 w-4 text-yellow-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {totals.totalGoldWeight}g
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            ${totals.totalGoldValue} value
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Cash Balance" : "رصيد النقد"}
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            ${totals.totalCashUSD}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {storeData.currentUSD.toFixed(2)} USD / {storeData.currentSYP.toFixed(0)} SYP
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Total Value" : "القيمة الإجمالية"}
                            </CardTitle>
                            <Building2 className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            ${totals.totalInventory}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {lang === "en" ? "Inventory worth" : "قيمة المخزون"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Settings Area */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {tabs.map((tab) => (
                        <TabsTrigger 
                            key={tab.id} 
                            value={tab.id}
                            className="flex items-center gap-2"
                        >
                            {tab.icon}
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    <CardTitle>
                                        {lang === "en" ? "Basic Information" : "المعلومات الأساسية"}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    {lang === "en" 
                                        ? "Store name, address, and contact details" 
                                        : "اسم المتجر، العنوان، وتفاصيل الاتصال"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {lang === "en" ? "Store Name" : "اسم المتجر"}
                                    </label>
                                    <input 
                                        className="w-full p-2 border rounded-md" 
                                        defaultValue={storeData.name}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {lang === "en" ? "Address" : "العنوان"}
                                    </label>
                                    <textarea 
                                        className="w-full p-2 border rounded-md min-h-[80px]" 
                                        defaultValue={storeData.address}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            {lang === "en" ? "City" : "المدينة"}
                                        </label>
                                        <input 
                                            className="w-full p-2 border rounded-md" 
                                            defaultValue={storeData.city}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            {lang === "en" ? "Status" : "الحالة"}
                                        </label>
                                        <select className="w-full p-2 border rounded-md" defaultValue={storeData.status}>
                                            <option value="ACTIVE">{lang === "en" ? "Active" : "نشط"}</option>
                                            <option value="SUSPEND">{lang === "en" ? "Suspended" : "موقوف"}</option>
                                            <option value="BAND">{lang === "en" ? "Banned" : "محظور"}</option>
                                        </select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    <CardTitle>
                                        {lang === "en" ? "Contact Information" : "معلومات الاتصال"}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    {lang === "en" 
                                        ? "Phone numbers and contact details" 
                                        : "أرقام الهواتف وتفاصيل الاتصال"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {lang === "en" ? "Primary Phone" : "الهاتف الرئيسي"}
                                    </label>
                                    <input 
                                        className="w-full p-2 border rounded-md" 
                                        defaultValue={storeData.primaryPhoneNumber}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {lang === "en" ? "Secondary Phone" : "الهاتف الثانوي"}
                                    </label>
                                    <input 
                                        className="w-full p-2 border rounded-md" 
                                        defaultValue={storeData.secondaryPhoneNumber}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {lang === "en" ? "Logo URL" : "رابط الشعار"}
                                    </label>
                                    <input 
                                        className="w-full p-2 border rounded-md" 
                                        placeholder="https://example.com/logo.png"
                                        defaultValue={storeData.logoUrl}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Gold Settings */}
                <TabsContent value="gold" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Gold Prices */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    <CardTitle>
                                        {lang === "en" ? "Gold Prices" : "أسعار الذهب"}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    {lang === "en" 
                                        ? "Current gold prices per gram in USD" 
                                        : "أسعار الذهب الحالية لكل جرام بالدولار"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: "14K Gold", value: storeData.priceGold14USD, key: "priceGold14USD" },
                                    { label: "18K Gold", value: storeData.priceGold18USD, key: "priceGold18USD" },
                                    { label: "21K Gold", value: storeData.priceGold21USD, key: "priceGold21USD" },
                                    { label: "24K Gold", value: storeData.priceGold24USD, key: "priceGold24USD" },
                                ].map((gold) => (
                                    <div key={gold.key} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <div className="font-medium">{gold.label}</div>
                                            <div className="text-sm text-muted-foreground">{lang === "en" ? "Price per gram" : "السعر لكل جرام"}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold">$</span>
                                            <input 
                                                className="w-24 p-1 border rounded text-right font-semibold"
                                                type="number"
                                                step="0.01"
                                                defaultValue={gold.value}
                                            />
                                            <span className="text-sm text-muted-foreground">/g</span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Gold Inventory Management */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Coins className="h-5 w-5" />
                                    <CardTitle>
                                        {lang === "en" ? "Inventory Settings" : "إعدادات المخزون"}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    {lang === "en" 
                                        ? "Manage gold inventory thresholds and alerts" 
                                        : "إدارة حدود المخزون وتنبيهات الذهب"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 border rounded-lg">
                                    <div className="font-medium mb-2">
                                        {lang === "en" ? "Low Stock Alerts" : "تنبيهات المخزون المنخفض"}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">14K Gold:</span>
                                            <input 
                                                className="w-20 p-1 border rounded text-right"
                                                type="number"
                                                step="0.01"
                                                placeholder="10.00"
                                            />
                                            <span className="text-sm">grams</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">18K Gold:</span>
                                            <input 
                                                className="w-20 p-1 border rounded text-right"
                                                type="number"
                                                step="0.01"
                                                placeholder="10.00"
                                            />
                                            <span className="text-sm">grams</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">21K Gold:</span>
                                            <input 
                                                className="w-20 p-1 border rounded text-right"
                                                type="number"
                                                step="0.01"
                                                placeholder="10.00"
                                            />
                                            <span className="text-sm">grams</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">24K Gold:</span>
                                            <input 
                                                className="w-20 p-1 border rounded text-right"
                                                type="number"
                                                step="0.01"
                                                placeholder="10.00"
                                            />
                                            <span className="text-sm">grams</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Currency Settings */}
                <TabsContent value="currency" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                <CardTitle>
                                    {lang === "en" ? "Currency & Exchange Rates" : "العملات وأسعار الصرف"}
                                </CardTitle>
                            </div>
                            <CardDescription>
                                {lang === "en" 
                                    ? "Manage currency settings and exchange rates" 
                                    : "إدارة إعدادات العملات وأسعار الصرف"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Exchange Rate */}
                            <div className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="font-medium">
                                            {lang === "en" ? "USD to SYP Exchange Rate" : "سعر صرف الدولار إلى الليرة"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {lang === "en" 
                                                ? "Current rate used for all calculations" 
                                                : "السعر الحالي المستخدم في جميع الحسابات"}
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-lg font-bold">
                                        1 USD = {storeData.exchangeRateUSDtoSYP.toFixed(2)} SYP
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-medium mb-1 block">
                                            {lang === "en" ? "New Exchange Rate" : "سعر الصرف الجديد"}
                                        </label>
                                        <div className="flex items-center">
                                            <span className="p-2 border border-r-0 rounded-l-md bg-gray-50">1 USD =</span>
                                            <input 
                                                className="flex-1 p-2 border rounded-r-md text-right"
                                                type="number"
                                                step="0.01"
                                                defaultValue={storeData.exchangeRateUSDtoSYP}
                                            />
                                            <span className="p-2 border border-l-0 rounded-r-md bg-gray-50">SYP</span>
                                        </div>
                                    </div>
                                    <Button className="mt-6">
                                        {lang === "en" ? "Update Rate" : "تحديث السعر"}
                                    </Button>
                                </div>
                            </div>

                            {/* Currency Display Settings */}
                            <div className="p-4 border rounded-lg">
                                <div className="font-medium mb-4">
                                    {lang === "en" ? "Display Settings" : "إعدادات العرض"}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">
                                                {lang === "en" ? "Default Currency" : "العملة الافتراضية"}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {lang === "en" 
                                                    ? "Primary currency for all transactions" 
                                                    : "العملة الأساسية لجميع المعاملات"}
                                            </div>
                                        </div>
                                        <select className="p-2 border rounded-md" defaultValue="USD">
                                            <option value="USD">USD (US Dollar)</option>
                                            <option value="SYP">SYP (Syrian Pound)</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">
                                                {lang === "en" ? "Show Both Currencies" : "عرض العملتين"}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {lang === "en" 
                                                    ? "Display both USD and SYP in all reports" 
                                                    : "عرض الدولار والليرة في جميع التقارير"}
                                            </div>
                                        </div>
                                        <input type="checkbox" className="h-5 w-5" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Access Control */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    <CardTitle>
                                        {lang === "en" ? "Access Control" : "التحكم في الوصول"}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    {lang === "en" 
                                        ? "Manage user permissions and access levels" 
                                        : "إدارة صلاحيات المستخدمين ومستويات الوصول"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">
                                                {lang === "en" ? "Session Timeout" : "مهلة الجلسة"}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {lang === "en" 
                                                    ? "Auto logout after inactivity" 
                                                    : "تسجيل الخروج التلقائي بعد عدم النشاط"}
                                            </div>
                                        </div>
                                        <select className="p-2 border rounded-md" defaultValue="30">
                                            <option value="15">15 minutes</option>
                                            <option value="30">30 minutes</option>
                                            <option value="60">1 hour</option>
                                            <option value="120">2 hours</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">
                                                {lang === "en" ? "Two-Factor Authentication" : "المصادقة الثنائية"}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {lang === "en" 
                                                    ? "Require 2FA for all users" 
                                                    : "طلب المصادقة الثنائية لجميع المستخدمين"}
                                            </div>
                                        </div>
                                        <input type="checkbox" className="h-5 w-5" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Audit Logs */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-5 w-5" />
                                    <CardTitle>
                                        {lang === "en" ? "Audit Logs" : "سجلات التدقيق"}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    {lang === "en" 
                                        ? "View and manage activity logs" 
                                        : "عرض وإدارة سجلات النشاط"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 border rounded-lg">
                                    <div className="font-medium mb-2">
                                        {lang === "en" ? "Recent Activities" : "الأنشطة الأخيرة"}
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span>Store settings updated</span>
                                            <span className="text-muted-foreground">2 hours ago</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>New user added</span>
                                            <span className="text-muted-foreground">1 day ago</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Exchange rate updated</span>
                                            <span className="text-muted-foreground">3 days ago</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                    {lang === "en" ? "View All Logs" : "عرض جميع السجلات"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                <CardTitle>
                                    {lang === "en" ? "Notification Preferences" : "تفضيلات الإشعارات"}
                                </CardTitle>
                            </div>
                            <CardDescription>
                                {lang === "en" 
                                    ? "Configure how and when you receive notifications" 
                                    : "تكوين كيفية وتوقيت استلام الإشعارات"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">
                                            {lang === "en" ? "Email Notifications" : "إشعارات البريد الإلكتروني"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {lang === "en" 
                                                ? "Receive notifications via email" 
                                                : "استلام الإشعارات عبر البريد الإلكتروني"}
                                        </div>
                                    </div>
                                    <input type="checkbox" className="h-5 w-5" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">
                                            {lang === "en" ? "Push Notifications" : "الإشعارات الفورية"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {lang === "en" 
                                                ? "Receive in-app notifications" 
                                                : "استلام الإشعارات داخل التطبيق"}
                                        </div>
                                    </div>
                                    <input type="checkbox" className="h-5 w-5" defaultChecked />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="font-medium">
                                    {lang === "en" ? "Notification Types" : "أنواع الإشعارات"}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">
                                                {lang === "en" ? "Low Stock Alerts" : "تنبيهات المخزون المنخفض"}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {lang === "en" 
                                                    ? "Notify when gold inventory is low" 
                                                    : "إشعار عندما يكون مخزون الذهب منخفضاً"}
                                            </div>
                                        </div>
                                        <input type="checkbox" className="h-5 w-5" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">
                                                {lang === "en" ? "Daily Reports" : "التقارير اليومية"}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {lang === "en" 
                                                    ? "Send daily sales and inventory reports" 
                                                    : "إرسال تقارير المبيعات والمخزون اليومية"}
                                            </div>
                                        </div>
                                        <input type="checkbox" className="h-5 w-5" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">
                                                {lang === "en" ? "New Sale Alerts" : "تنبيهات البيع الجديدة"}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {lang === "en" 
                                                    ? "Notify on new sales" 
                                                    : "الإشعار عند عمليات البيع الجديدة"}
                                            </div>
                                        </div>
                                        <input type="checkbox" className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Backup & Export */}
                <TabsContent value="backup" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Data Export */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Download className="h-5 w-5" />
                                    <CardTitle>
                                        {lang === "en" ? "Data Export" : "تصدير البيانات"}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    {lang === "en" 
                                        ? "Export store data in various formats" 
                                        : "تصدير بيانات المتجر بتنسيقات مختلفة"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Download className="h-4 w-4 mr-2" />
                                        {lang === "en" ? "Export Sales Data (CSV)" : "تصدير بيانات المبيعات (CSV)"}
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Download className="h-4 w-4 mr-2" />
                                        {lang === "en" ? "Export Inventory Data (CSV)" : "تصدير بيانات المخزون (CSV)"}
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Download className="h-4 w-4 mr-2" />
                                        {lang === "en" ? "Export All Data (JSON)" : "تصدير جميع البيانات (JSON)"}
                                    </Button>
                                </div>
                                <div className="p-3 border rounded-lg">
                                    <div className="font-medium mb-2">
                                        {lang === "en" ? "Export Settings" : "إعدادات التصدير"}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">
                                                {lang === "en" ? "Include all history" : "تضمين جميع السجلات"}
                                            </span>
                                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">
                                                {lang === "en" ? "Compress file" : "ضغط الملف"}
                                            </span>
                                            <input type="checkbox" className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Data Backup */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Upload className="h-5 w-5" />
                                    <CardTitle>
                                        {lang === "en" ? "Data Backup" : "نسخ احتياطي"}
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    {lang === "en" 
                                        ? "Backup and restore store data" 
                                        : "نسخ احتياطي واستعادة بيانات المتجر"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 border rounded-lg">
                                    <div className="font-medium mb-2">
                                        {lang === "en" ? "Last Backup" : "آخر نسخ احتياطي"}
                                    </div>
                                    <div className="text-sm">
                                        <div className="flex items-center justify-between mb-1">
                                            <span>{lang === "en" ? "Date" : "التاريخ"}</span>
                                            <span>2024-12-15 14:30</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>{lang === "en" ? "Size" : "الحجم"}</span>
                                            <span>45.2 MB</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Button className="w-full">
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        {lang === "en" ? "Create Backup Now" : "إنشاء نسخة احتياطية الآن"}
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        {lang === "en" ? "Schedule Automatic Backups" : "جدولة النسخ الاحتياطي التلقائي"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default StoreSettingsPage;