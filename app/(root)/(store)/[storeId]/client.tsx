"use client";
import { useGetStoreById } from '@/hooks/use-stores';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, DollarSign, Coins, Warehouse, Percent, Phone, MapPin, Calendar } from "lucide-react";
import { useLangStore } from '@/store/lang-store';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
    storeId: string
}

function StoreDashboardPage({ storeId }: Props) {
    const { data: store, isLoading, error } = useGetStoreById(storeId);
    const { lang } = useLangStore();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-2">
                                <Skeleton className="h-4 w-32" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-24" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !store) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    {lang === "en" 
                        ? "Failed to load store information. Please try again." 
                        : "فشل في تحميل معلومات المتجر. يرجى المحاولة مرة أخرى."}
                </AlertDescription>
            </Alert>
        );
    }

    // Calculate total gold value in USD
    const totalGoldValueUSD =
        (store.currentGold14 * store.priceGold14USD) +
        (store.currentGold18 * store.priceGold18USD) +
        (store.currentGold21 * store.priceGold21USD) +
        (store.currentGold24 * store.priceGold24USD);

    // Calculate total inventory value (gold + cash)
    const totalInventoryValueUSD = totalGoldValueUSD + store.currentUSD;

    // Calculate total gold weight
    const totalGoldWeight = store.currentGold14 + store.currentGold18 + 
                           store.currentGold21 + store.currentGold24;

    // Calculate average gold price
    const averageGoldPricePerGram = totalGoldWeight > 0 
        ? totalGoldValueUSD / totalGoldWeight 
        : 0;

    // Format currency
    const formatCurrency = (amount: number, currency: "USD" | "SYP") => {
        if (currency === "USD") {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amount);
        } else {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "SYP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amount);
        }
    };

    // Format weight
    const formatWeight = (grams: number) => {
        return `${grams.toFixed(2)}g`;
    };

    // Format price per gram
    const formatPricePerGram = (price: number) => {
        return `${price.toFixed(2)} USD/g`;
    };

    // Calculate SYP values
    const totalGoldValueSYP = totalGoldValueUSD * store.exchangeRateUSDtoSYP;
    const totalInventoryValueSYP = totalInventoryValueUSD * store.exchangeRateUSDtoSYP;
    const totalCashSYP = store.currentSYP;

    return (
        <div className="space-y-6 p-4">
            {/* Store Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{store.name}</h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{store.address}, {store.city}</span>
                        </div>
                        <Separator orientation="vertical" className="hidden md:block h-4" />
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {lang === "en" ? "Created" : "تم الإنشاء"}: {formatDate(store.createdAt, lang)}
                            </span>
                        </div>
                    </div>
                </div>
                <Badge 
                    variant={store.status === "ACTIVE" ? "default" : "secondary"}
                    className="text-sm px-3 py-1"
                >
                    {store.status === "ACTIVE" 
                        ? lang === "en" ? "Active" : "نشط"
                        : lang === "en" ? "Inactive" : "غير نشط"
                    }
                </Badge>
            </div>

            {/* Inventory Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Inventory Value */}
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Total Inventory Value" : "قيمة المخزون الإجمالية"}
                            </CardTitle>
                            <Warehouse className="h-5 w-5 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <div className="text-2xl font-bold text-primary">
                            {formatCurrency(totalInventoryValueUSD, "USD")}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground">
                            ≈ {formatCurrency(totalInventoryValueSYP, "SYP")}
                        </div>
                    </CardContent>
                </Card>

                {/* Gold Inventory Value */}
                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Gold Value" : "قيمة الذهب"}
                            </CardTitle>
                            <Coins className="h-5 w-5 text-yellow-500" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <div className="text-2xl font-bold text-yellow-600">
                            {formatCurrency(totalGoldValueUSD, "USD")}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground">
                            ≈ {formatCurrency(totalGoldValueSYP, "SYP")}
                        </div>
                    </CardContent>
                </Card>

                {/* Cash Balance */}
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Cash Balance" : "الرصيد النقدي"}
                            </CardTitle>
                            <DollarSign className="h-5 w-5 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <div className="text-lg font-bold text-green-600">
                                {formatCurrency(store.currentUSD, "USD")}
                            </div>
                            <div className="text-sm font-medium">
                                {formatCurrency(store.currentSYP, "SYP")}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Exchange Rate */}
                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Exchange Rate" : "سعر الصرف"}
                            </CardTitle>
                            <TrendingUp className="h-5 w-5 text-purple-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            1 USD = {store.exchangeRateUSDtoSYP.toFixed(2)} SYP
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {lang === "en" ? "Last updated" : "آخر تحديث"}:{" "}
                            {formatDate(store.updatedAt, lang)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Statistics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gold Statistics */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Coins className="h-5 w-5 text-yellow-500" />
                            {lang === "en" ? "Gold Statistics" : "إحصائيات الذهب"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {lang === "en" ? "Total Gold Weight:" : "إجمالي وزن الذهب:"}
                                </span>
                                <div className="font-semibold">{formatWeight(totalGoldWeight)}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {lang === "en" ? "Average Price per Gram:" : "متوسط السعر لكل جرام:"}
                                </span>
                                <div className="font-semibold">{formatPricePerGram(averageGoldPricePerGram)}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {lang === "en" ? "Gold to Cash Ratio:" : "نسبة الذهب إلى النقود:"}
                                </span>
                                <div className="font-semibold">
                                    {((totalGoldValueUSD / totalInventoryValueUSD) * 100).toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Gold Inventory Breakdown */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Warehouse className="h-5 w-5 text-blue-500" />
                            {lang === "en" ? "Gold Inventory by Karat" : "مخزون الذهب حسب العيار"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* 24K Gold */}
                            <div className="rounded-lg border p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">24K Gold</h3>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                        {formatWeight(store.currentGold24)}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Price:</span>
                                        <div className="text-right">
                                            <div className="font-semibold">{formatCurrency(store.priceGold24USD, "USD")}/g</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Value:</span>
                                        <div className="font-semibold">
                                            {formatCurrency(store.currentGold24 * store.priceGold24USD, "USD")}
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground text-right">
                                        ≈ {formatCurrency(store.currentGold24 * store.priceGold24USD * store.exchangeRateUSDtoSYP, "SYP")}
                                    </div>
                                </div>
                            </div>

                            {/* 21K Gold */}
                            <div className="rounded-lg border p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">21K Gold</h3>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                        {formatWeight(store.currentGold21)}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Price:</span>
                                        <div className="text-right">
                                            <div className="font-semibold">{formatCurrency(store.priceGold21USD, "USD")}/g</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Value:</span>
                                        <div className="font-semibold">
                                            {formatCurrency(store.currentGold21 * store.priceGold21USD, "USD")}
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground text-right">
                                        ≈ {formatCurrency(store.currentGold21 * store.priceGold21USD * store.exchangeRateUSDtoSYP, "SYP")}
                                    </div>
                                </div>
                            </div>

                            {/* 18K Gold */}
                            <div className="rounded-lg border p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">18K Gold</h3>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                        {formatWeight(store.currentGold18)}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Price:</span>
                                        <div className="text-right">
                                            <div className="font-semibold">{formatCurrency(store.priceGold18USD, "USD")}/g</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Value:</span>
                                        <div className="font-semibold">
                                            {formatCurrency(store.currentGold18 * store.priceGold18USD, "USD")}
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground text-right">
                                        ≈ {formatCurrency(store.currentGold18 * store.priceGold18USD * store.exchangeRateUSDtoSYP, "SYP")}
                                    </div>
                                </div>
                            </div>

                            {/* 14K Gold */}
                            <div className="rounded-lg border p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">14K Gold</h3>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                        {formatWeight(store.currentGold14)}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Price:</span>
                                        <div className="text-right">
                                            <div className="font-semibold">{formatCurrency(store.priceGold14USD, "USD")}/g</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Value:</span>
                                        <div className="font-semibold">
                                            {formatCurrency(store.currentGold14 * store.priceGold14USD, "USD")}
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground text-right">
                                        ≈ {formatCurrency(store.currentGold14 * store.priceGold14USD * store.exchangeRateUSDtoSYP, "SYP")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Store Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-gray-500" />
                            {lang === "en" ? "Store Information" : "معلومات المتجر"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    {lang === "en" ? "Address" : "العنوان"}
                                </h4>
                                <p className="font-medium">{store.address}</p>
                                <p className="text-sm text-muted-foreground">{store.city}</p>
                            </div>
                            
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {lang === "en" ? "Contact Numbers" : "أرقام التواصل"}
                                </h4>
                                <div className="space-y-1">
                                    <div className="font-medium">{store.primaryPhoneNumber}</div>
                                    {store.secondaryPhoneNumber && (
                                        <div className="text-sm text-muted-foreground">
                                            {store.secondaryPhoneNumber}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-500" />
                            {lang === "en" ? "Financial Summary" : "ملخص مالي"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {lang === "en" ? "Total Assets:" : "إجمالي الأصول:"}
                                </span>
                                <div className="font-semibold">{formatCurrency(totalInventoryValueUSD, "USD")}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {lang === "en" ? "Liquid Cash:" : "النقود السائلة:"}
                                </span>
                                <div className="font-semibold">{formatCurrency(store.currentUSD, "USD")}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {lang === "en" ? "Inventory Value:" : "قيمة المخزون:"}
                                </span>
                                <div className="font-semibold">{formatCurrency(totalGoldValueUSD, "USD")}</div>
                            </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                {lang === "en" ? "Currency Breakdown" : "توزيع العملات"}
                            </h4>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">USD:</span>
                                    <span className="font-medium">{formatCurrency(store.currentUSD + totalGoldValueUSD, "USD")}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">SYP:</span>
                                    <span className="font-medium">{formatCurrency(store.currentSYP + totalGoldValueSYP, "SYP")}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg border p-4 text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                        {lang === "en" ? "Gold/Asset Ratio" : "نسبة الذهب"}
                    </div>
                    <div className="text-xl font-bold">
                        {((totalGoldValueUSD / totalInventoryValueUSD) * 100).toFixed(1)}%
                    </div>
                </div>
                
                <div className="rounded-lg border p-4 text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                        {lang === "en" ? "Cash/Asset Ratio" : "نسبة النقود"}
                    </div>
                    <div className="text-xl font-bold">
                        {((store.currentUSD / totalInventoryValueUSD) * 100).toFixed(1)}%
                    </div>
                </div>
                
                <div className="rounded-lg border p-4 text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                        {lang === "en" ? "Last Updated" : "آخر تحديث"}
                    </div>
                    <div className="text-sm font-bold">
                        {formatDate(store.updatedAt, lang, "short")}
                    </div>
                </div>
                
                <div className="rounded-lg border p-4 text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                        {lang === "en" ? "Store ID" : "معرف المتجر"}
                    </div>
                    <div className="text-sm font-bold font-mono truncate">
                        {store.id.substring(0, 8)}...
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreDashboardPage;