"use client";
import { useGetStoreById } from '@/hooks/use-stores';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, DollarSign, Coins, Warehouse, Percent } from "lucide-react";
import { useLangStore } from '@/store/lang-store';
import { formatDate } from '@/lib/utils';

interface Props {
    storeId: string
}

function StoreDashboardPage({ storeId }: Props) {
    const { data: store, isLoading } = useGetStoreById(storeId);
    const { lang } = useLangStore();



    if (isLoading) {
        return <>Loading ...</>
    }

    // Calculate total gold value in USD
    const totalGoldValueUSD =
        (store!.currentGold14 * store!.priceGold14USD) +
        (store!.currentGold18 * store!.priceGold18USD) +
        (store!.currentGold21 * store!.priceGold21USD) +
        (store!.currentGold24 * store!.priceGold24USD);


    // Calculate total inventory value (gold + cash)
    const totalInventoryValueUSD = totalGoldValueUSD + store!.currentUSD;

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
                            1 USD = {store!.exchangeRateUSDtoSYP.toFixed(2)} SYP
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {lang === "en" ? "Last updated" : "آخر تحديث"}:{" "}
                            {formatDate(store!.updatedAt!, lang)}
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
                                    <div className="font-semibold">{formatCurrency(store!.priceGold24USD, "USD")}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Value:</span>
                                <div className="font-semibold">
                                    {formatCurrency(store!.currentGold24 * store!.priceGold24USD, "USD")}
                                </div>
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
                                    <div className="font-semibold">{formatCurrency(store!.priceGold18USD, "USD")}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Value:</span>
                                <div className="font-semibold">
                                    {formatCurrency(store!.currentGold18 * store!.priceGold18USD, "USD")}
                                </div>
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
                                    <div className="font-semibold">{formatCurrency(store!.priceGold14USD, "USD")}</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Value:</span>
                                <div className="font-semibold">
                                    {formatCurrency(store!.currentGold14 * store!.priceGold14USD, "USD")}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>


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