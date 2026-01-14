"use client";
import { useGetStoreById } from '@/hooks/use-stores';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, DollarSign, Coins, Warehouse, Percent } from "lucide-react";
import { useLangStore } from '@/store/lang-store';
import { formatDate } from '@/lib/utils';
import { GoldPriceService } from '@/services/gold-price.service';
import { useSettings } from '@/hooks/use-settings';

interface Props {
    storeId: string
}

function StoreDashboardPage({ storeId }: Props) {
    const { data: store, isLoading } = useGetStoreById(storeId);
    const { settings,isLoadingSettings } = useSettings();
    const { lang } = useLangStore();



    if (isLoading || isLoadingSettings) {
        return <>Loading ...</>
    }

    // Calculate total gold value in USD
    const totalGoldValueUSD =
        (store!.currentGold14 * settings!.priceGold14USD) +
        (store!.currentGold18 * settings!.priceGold18USD) +
        (store!.currentGold21 * settings!.priceGold21USD) +
        (store!.currentGold24 * settings!.priceGold24USD);

    // Calculate total gold value in SYP
    const totalGoldValueSYP =
        (store!.currentGold14 * settings!.priceGold14SYP) +
        (store!.currentGold18 * settings!.priceGold18SYP) +
        (store!.currentGold21 * settings!.priceGold21SYP) +
        (store!.currentGold24 * settings!.priceGold24SYP);

    // Calculate total inventory value (gold + cash)
    const totalInventoryValueUSD = totalGoldValueUSD + store!.currentUSD;
    const totalInventoryValueSYP = totalGoldValueSYP + store!.currentSYP;

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
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amount);
        }
    };

    // Format weight
    const formatWeight = (grams: number) => {
        return `${grams.toFixed(2)}g`;
    };
    return (
        <div className="space-y-6">
            {/* Store Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{store!.name}</h1>
                    <p className="text-muted-foreground">
                        {store!.address}, {store!.city}
                    </p>
                </div>
                <Badge variant={store!.status === "ACTIVE" ? "default" : "secondary"}>
                    {store!.status}
                </Badge>
            </div>

            {/* Inventory Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Inventory Value */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Total Inventory Value" : "قيمة المخزون الإجمالية"}
                            </CardTitle>
                            <Warehouse className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">
                            {formatCurrency(totalInventoryValueUSD, "USD")}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {formatCurrency(totalInventoryValueSYP, "SYP")}
                        </p>
                    </CardContent>
                </Card>

                {/* Gold Inventory Value */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Gold Value" : "قيمة الذهب"}
                            </CardTitle>
                            <Coins className="h-4 w-4 text-yellow-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {formatCurrency(totalGoldValueUSD, "USD")}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {formatCurrency(totalGoldValueSYP, "SYP")}
                        </p>
                    </CardContent>
                </Card>

                {/* Cash Balance */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Cash Balance" : "الرصيد النقدي"}
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-1">
                            <div className="text-lg font-bold text-green-600">
                                {formatCurrency(store!.currentUSD, "USD")}
                            </div>
                            <div className="text-sm font-medium">
                                {formatCurrency(store!.currentSYP, "SYP")}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Exchange Rate */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {lang === "en" ? "Exchange Rate" : "سعر الصرف"}
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            1 USD = {settings!.exchangeRateUSDtoSYP.toFixed(2)} SYP
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {lang === "en" ? "Last updated" : "آخر تحديث"}:{" "}
                            {formatDate(settings!.updatedAt!, lang)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Gold Inventory Breakdown */}
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    {lang === "en" ? "Gold Inventory by Karat" : "مخزون الذهب حسب العيار"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* 24K Gold */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center justify-between">
                                <span>24K Gold</span>
                                <Badge variant="outline" className="ml-2">
                                    {formatWeight(store!.currentGold24)}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Price:</span>
                                <div className="text-right">
                                    <div className="font-semibold">{formatCurrency(settings!.priceGold24USD, "USD")}</div>
                                    <div className="text-sm">{formatCurrency(settings!.priceGold24SYP, "SYP")}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Value:</span>
                                <div className="font-semibold">
                                    {formatCurrency(store!.currentGold24 * settings!.priceGold24USD, "USD")}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Percent className="h-3 w-3" /> Profit:
                                </span>
                                <Badge variant="outline" className={`${store!.profitMarginGold24 > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {store!.profitMarginGold24.toFixed(2)}%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 21K Gold */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center justify-between">
                                <span>21K Gold</span>
                                <Badge variant="outline" className="ml-2">
                                    {formatWeight(store!.currentGold21)}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Price:</span>
                                <div className="text-right">
                                    <div className="font-semibold">{formatCurrency(settings!.priceGold21USD, "USD")}</div>
                                    <div className="text-sm">{formatCurrency(settings!.priceGold21SYP, "SYP")}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Value:</span>
                                <div className="font-semibold">
                                    {formatCurrency(store!.currentGold21 * settings!.priceGold21USD, "USD")}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Percent className="h-3 w-3" /> Profit:
                                </span>
                                <Badge variant="outline" className={`${store!.profitMarginGold21 > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {store!.profitMarginGold21.toFixed(2)}%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 18K Gold */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center justify-between">
                                <span>18K Gold</span>
                                <Badge variant="outline" className="ml-2">
                                    {formatWeight(store!.currentGold18)}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Price:</span>
                                <div className="text-right">
                                    <div className="font-semibold">{formatCurrency(settings!.priceGold18USD, "USD")}</div>
                                    <div className="text-sm">{formatCurrency(settings!.priceGold18SYP, "SYP")}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Value:</span>
                                <div className="font-semibold">
                                    {formatCurrency(store!.currentGold18 * settings!.priceGold18USD, "USD")}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Percent className="h-3 w-3" /> Profit:
                                </span>
                                <Badge variant="outline" className={`${store!.profitMarginGold18 > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {store!.profitMarginGold18.toFixed(2)}%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 14K Gold */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center justify-between">
                                <span>14K Gold</span>
                                <Badge variant="outline" className="ml-2">
                                    {formatWeight(store!.currentGold14)}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Price:</span>
                                <div className="text-right">
                                    <div className="font-semibold">{formatCurrency(settings!.priceGold14USD, "USD")}</div>
                                    <div className="text-sm">{formatCurrency(settings!.priceGold14SYP, "SYP")}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Value:</span>
                                <div className="font-semibold">
                                    {formatCurrency(store!.currentGold14 * settings!.priceGold14USD, "USD")}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Percent className="h-3 w-3" /> Profit:
                                </span>
                                <Badge variant="outline" className={`${store!.profitMarginGold14 > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {store!.profitMarginGold14.toFixed(2)}%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Profit Margins Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Percent className="h-5 w-5" />
                        {lang === "en" ? "Profit Margins Summary" : "ملخص هوامش الربح"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { karat: "24K", margin: store!.profitMarginGold24 },
                            { karat: "21K", margin: store!.profitMarginGold21 },
                            { karat: "18K", margin: store!.profitMarginGold18 },
                            { karat: "14K", margin: store!.profitMarginGold14 },
                        ].map((item) => (
                            <div key={item.karat} className="text-center">
                                <div className="text-2xl font-bold">
                                    {item.margin.toFixed(2)}%
                                </div>
                                <div className="text-sm text-muted-foreground">{item.karat} Gold</div>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="text-sm text-muted-foreground">
                        {lang === "en"
                            ? "Profit margins represent the percentage added to gold purchase prices"
                            : "تمثل هوامش الربح النسبة المئوية المضافة لأسعار شراء الذهب"}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            {lang === "en" ? "Total Gold Weight" : "إجمالي وزن الذهب"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatWeight(
                                store!.currentGold14 +
                                store!.currentGold18 +
                                store!.currentGold21 +
                                store!.currentGold24
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            {lang === "en" ? "Average Profit Margin" : "متوسط هامش الربح"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {(
                                (store!.profitMarginGold14 +
                                    store!.profitMarginGold18 +
                                    store!.profitMarginGold21 +
                                    store!.profitMarginGold24) / 4
                            ).toFixed(2)}%
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            {lang === "en" ? "Contact Numbers" : "أرقام التواصل"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            <div className="font-medium">{store!.primaryPhoneNumber}</div>
                            {store!.secondaryPhoneNumber && (
                                <div className="text-sm text-muted-foreground">
                                    {store!.secondaryPhoneNumber}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default StoreDashboardPage