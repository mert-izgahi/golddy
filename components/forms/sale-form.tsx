// components/forms/sale-form.tsx - UPDATED VERSION WITH PROFIT
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getCreateSaleSchema, CreateSaleInput } from "@/lib/zod";
import { useCreateSale, useUpdateSale, useGetSaleById } from "@/hooks/use-sales";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, Calculator, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrencyType, GoldType, PaymentType, Store } from "@/lib/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiClient } from "@/lib/api-client";
import { StoreInventory } from "@/lib/types";
import { useGetStoreById } from "@/hooks/use-stores";

interface SaleFormProps {
    storeId: string;
    mode: "create" | "edit";
    saleId?: string;
}

export function SaleForm({ storeId, mode, saleId }: SaleFormProps) {
    const { lang } = useLangStore();
    const router = useRouter();
    const [storeInventory, setStoreInventory] = useState<StoreInventory | null>(null);
    const [isLoadingInventory, setIsLoadingInventory] = useState(false);
    const [showInvoicePreview, setShowInvoicePreview] = useState(false);
    const [createdSale, setCreatedSale] = useState<any>(null);

    // Hooks for create and edit
    const createSaleMutation = useCreateSale();
    const updateSaleMutation = useUpdateSale();
    const { data: store, isLoading: isLoadingStore } = useGetStoreById(storeId);
    const { data: sale, isLoading: isLoadingSale } = useGetSaleById(
        mode === "edit" && saleId ? saleId : ""
    );

    const form = useForm<CreateSaleInput>({
        resolver: zodResolver(getCreateSaleSchema(lang)),
        defaultValues: {
            weight: 0,
            goldType: GoldType.GOLD_14,
            pricePerGramUSD: 0,
            pricePerGramSYP: 0,
            totalUSD: 0,
            totalSYP: 0,
            currency: CurrencyType.USD,
            paymentType: PaymentType.CASH,
            amountPaid: 0,
            customerName: "",
            customerPhone: "",
            description: "",
            profitUSD: 0, // Added default profit
            profitSYP: 0,
        },
    });

    // Fetch store inventory for create mode
    useEffect(() => {
        const fetchInventory = async () => {
            if (mode === "create") {
                setIsLoadingInventory(true);
                try {
                    // Fetch store inventory
                    const storeResponse = await apiClient.get(`/stores/${storeId}`);
                    if (storeResponse.data.success) {
                        const store = storeResponse.data.result;
                        setStoreInventory({
                            currentGold14: store.currentGold14,
                            currentGold18: store.currentGold18,
                            currentGold21: store.currentGold21,
                            currentGold24: store.currentGold24,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching inventory:", error);
                    toast.error(
                        lang === "en"
                            ? "Failed to fetch store inventory"
                            : "فشل في جلب مخزون المتجر"
                    );
                } finally {
                    setIsLoadingInventory(false);
                }
            }
        };

        fetchInventory();
    }, [storeId, mode, lang]);

    // Set form values when in edit mode and sale data is loaded
    useEffect(() => {
        if (mode === "edit" && sale) {
            form.reset({
                weight: sale.weight,
                goldType: sale.goldType as GoldType,
                pricePerGramUSD: sale.pricePerGramUSD,
                pricePerGramSYP: sale.pricePerGramSYP,
                totalUSD: sale.totalUSD,
                totalSYP: sale.totalSYP,
                currency: sale.currency as CurrencyType,
                paymentType: sale.paymentType as PaymentType,
                amountPaid: sale.amountPaid,
                customerName: sale.customerName || "",
                customerPhone: sale.customerPhone || "",
                description: sale.description || "",
                profitUSD: sale.profitUSD || 0,
                profitSYP: sale.profitSYP || 0,
            });
        }
    }, [sale, form, mode]);

    // Watch form values for calculations
    const weight = form.watch("weight");
    const goldType = form.watch("goldType");
    const currency = form.watch("currency");
    const amountPaid = form.watch("amountPaid");
    const profitUSD = form.watch("profitUSD");
    const profitSYP = form.watch("profitSYP");

    // Calculate price per gram in USD based on selected gold type
    const getUSDPricePerGram = () => {
        if (!store) return 0;

        const goldKey = `priceGold${goldType.replace('GOLD_', '')}USD` as keyof Store;
        const usdPrice = store[goldKey];

        return typeof usdPrice === 'number' ? usdPrice : 0;
    };

    // Calculate price per gram in SYP using exchange rate
    const getSYPPricePerGram = () => {
        if (!store || !store.exchangeRateUSDtoSYP) return 0;

        const usdPrice = getUSDPricePerGram();
        const exchangeRate = typeof store.exchangeRateUSDtoSYP === 'number' ? store.exchangeRateUSDtoSYP : 0;

        return usdPrice * exchangeRate;
    };

    // Calculate totals including profit
    const calculateTotals = () => {
        const usdPricePerGram = getUSDPricePerGram();
        const sypPricePerGram = getSYPPricePerGram();
        const baseTotalUSD = weight * usdPricePerGram;
        const baseTotalSYP = weight * sypPricePerGram;

        return {
            pricePerGramUSD: usdPricePerGram,
            pricePerGramSYP: sypPricePerGram,
            baseTotalUSD: baseTotalUSD,
            baseTotalSYP: baseTotalSYP,
            totalUSD: baseTotalUSD + (profitUSD || 0), // Add profit to totals
            totalSYP: baseTotalSYP + (profitSYP || 0),
        };
    };

    // Get available inventory for selected gold type
    const getAvailableInventory = () => {
        if (!storeInventory) return 0;

        switch (goldType) {
            case GoldType.GOLD_14: return storeInventory.currentGold14;
            case GoldType.GOLD_18: return storeInventory.currentGold18;
            case GoldType.GOLD_21: return storeInventory.currentGold21;
            case GoldType.GOLD_24: return storeInventory.currentGold24;
            default: return 0;
        }
    };

    // Check if sufficient inventory
    const hasSufficientInventory = () => {
        const available = getAvailableInventory();
        return weight <= available;
    };

    // Calculate SYP profit based on USD profit and exchange rate
    const calculateSYPProfit = (usdProfit: number) => {
        if (!store || !store.exchangeRateUSDtoSYP) return 0;
        return usdProfit * store.exchangeRateUSDtoSYP;
    };

    // Update form values when calculations change
    useEffect(() => {
        const totals = calculateTotals();
        const currentTotal = currency === CurrencyType.USD ? totals.totalUSD : totals.totalSYP;
        const currentAmountPaid = form.getValues("amountPaid");

        // Only auto-set amountPaid if it's zero or undefined and we have a valid total
        if (currentTotal > 0 && (!currentAmountPaid || currentAmountPaid === 0)) {
            form.setValue("amountPaid", currentTotal, { shouldValidate: true, shouldDirty: true });
        }

        // Update form values for price per gram and totals
        form.setValue("pricePerGramUSD", totals.pricePerGramUSD, {
            shouldValidate: true,
            shouldDirty: false
        });
        form.setValue("pricePerGramSYP", totals.pricePerGramSYP, {
            shouldValidate: true,
            shouldDirty: false
        });
        form.setValue("totalUSD", totals.totalUSD, {
            shouldValidate: true,
            shouldDirty: false
        });
        form.setValue("totalSYP", totals.totalSYP, {
            shouldValidate: true,
            shouldDirty: false
        });

        // Auto-calculate SYP profit when USD profit changes
        if (store) {
            const currentProfitUSD = form.getValues("profitUSD");
            const calculatedProfitSYP = calculateSYPProfit(currentProfitUSD);
            form.setValue("profitSYP", calculatedProfitSYP, {
                shouldValidate: true,
                shouldDirty: false
            });
        }
    }, [weight, goldType, currency, store, profitUSD]);

    const onSubmit = async (data: CreateSaleInput) => {
        try {
            // Check inventory before submitting
            if (mode === "create") {
                const available = getAvailableInventory();
                if (data.weight > available) {
                    toast.error(
                        lang === "en"
                            ? `Insufficient inventory. Available: ${available}g, Requested: ${data.weight}g`
                            : `المخزون غير كاف. المتاح: ${available} جرام، المطلوب: ${data.weight} جرام`
                    );
                    return;
                }
            }

            // Calculate SYP profit if not already calculated
            if (store && (!data.profitSYP || data.profitSYP === 0) && data.profitUSD > 0) {
                data.profitSYP = calculateSYPProfit(data.profitUSD);
            }

            if (mode === "create") {
                const newSale = await createSaleMutation.mutateAsync({
                    storeId,
                    data
                });
                setCreatedSale(newSale);
                setShowInvoicePreview(true);
                toast.success(
                    lang === "en" ? "Sale created successfully" : "تم إنشاء البيع بنجاح"
                );
            } else {
                if (!saleId) {
                    throw new Error("Sale ID is required for update");
                }
                const updatedSale = await updateSaleMutation.mutateAsync({
                    id: saleId,
                    data
                });
                setCreatedSale(updatedSale);
                setShowInvoicePreview(true);
                toast.success(
                    lang === "en" ? "Sale updated successfully" : "تم تحديث البيع بنجاح"
                );
            }
        } catch (error: any) {
            toast.error(
                error?.message ||
                (mode === "create"
                    ? lang === "en" ? "Failed to create sale" : "فشل في إنشاء البيع"
                    : lang === "en" ? "Failed to update sale" : "فشل في تحديث البيع")
            );
        }
    };

    const goldTypeOptions = [
        { value: GoldType.GOLD_14, label: lang === "en" ? "14K Gold" : "ذهب عيار ١٤" },
        { value: GoldType.GOLD_18, label: lang === "en" ? "18K Gold" : "ذهب عيار ١٨" },
        { value: GoldType.GOLD_21, label: lang === "en" ? "21K Gold" : "ذهب عيار ٢١" },
        { value: GoldType.GOLD_24, label: lang === "en" ? "24K Gold" : "ذهب عيار ٢٤" },
    ];

    const currencyOptions = [
        { value: CurrencyType.USD, label: lang === "en" ? "US Dollar (USD)" : "دولار أمريكي (USD)" },
        { value: CurrencyType.SYP, label: lang === "en" ? "Syrian Pound (SYP)" : "ليرة سورية (SYP)" },
    ];

    const paymentTypeOptions = [
        { value: PaymentType.CASH, label: lang === "en" ? "Cash" : "نقدي" },
        { value: PaymentType.SHAM_CASH, label: lang === "en" ? "Sham Cash Transfer" : "تحويل شام كاش" },
        { value: PaymentType.OTHER, label: lang === "en" ? "Other" : "أخرى" },
    ];

    const isPending = mode === "create"
        ? createSaleMutation.isPending
        : updateSaleMutation.isPending;

    const availableInventory = getAvailableInventory();
    const showInsufficientInventory = weight > availableInventory;

    const totals = calculateTotals();
    const currentTotal = currency === CurrencyType.USD ? totals.totalUSD : totals.totalSYP;
    const currentPricePerGram = currency === CurrencyType.USD ? totals.pricePerGramUSD : totals.pricePerGramSYP;

    // Show loading state for create mode
    if (mode === "create" && (isLoadingInventory || isLoadingStore)) {
        return (
            <Card className="border-none shadow-none">
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Show loading state for edit mode
    if (mode === "edit" && isLoadingSale) {
        return (
            <Card className="border-none shadow-none">
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>
                    {mode === "create"
                        ? lang === "en" ? "Create New Sale" : "إنشاء بيع جديد"
                        : lang === "en" ? "Update Sale" : "تحديث البيع"}
                </CardTitle>
                <CardDescription>
                    {mode === "create"
                        ? lang === "en"
                            ? "Fill in the details to record a new sale"
                            : "املأ التفاصيل لتسجيل بيع جديد"
                        : lang === "en"
                            ? "Update the sale details below"
                            : "تحديث تفاصيل البيع أدناه"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Current Prices Alert */}
                        {store && mode === "create" && (
                            <Alert className="bg-blue-50 border-blue-200">
                                <AlertCircle className="h-4 w-4 text-blue-600" />
                                <AlertDescription className="text-blue-700">
                                    {lang === "en"
                                        ? `Current exchange rate: 1 USD = ${typeof store.exchangeRateUSDtoSYP === 'number' ? store.exchangeRateUSDtoSYP.toFixed(2) : '0'} SYP`
                                        : `سعر الصرف الحالي: ١ دولار = ${typeof store.exchangeRateUSDtoSYP === 'number' ? store.exchangeRateUSDtoSYP.toFixed(2) : '0'} ليرة`}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Gold Type */}
                            <FormField
                                control={form.control}
                                name="goldType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Gold Type" : "نوع الذهب"}
                                            <span className="text-red-500 ml-1">*</span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={mode === "edit"}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={lang === "en" ? "Select gold type" : "اختر نوع الذهب"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {goldTypeOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        <div className="flex items-center justify-between">
                                                            <span>{option.label}</span>
                                                            {mode === "create" && storeInventory && (
                                                                <Badge variant="outline" className="ml-2">
                                                                    {(() => {
                                                                        switch (option.value) {
                                                                            case GoldType.GOLD_14: return `${storeInventory.currentGold14.toFixed(2)}g`;
                                                                            case GoldType.GOLD_18: return `${storeInventory.currentGold18.toFixed(2)}g`;
                                                                            case GoldType.GOLD_21: return `${storeInventory.currentGold21.toFixed(2)}g`;
                                                                            case GoldType.GOLD_24: return `${storeInventory.currentGold24.toFixed(2)}g`;
                                                                            default: return "0g";
                                                                        }
                                                                    })()}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {mode === "create" && (
                                            <FormDescription>
                                                {lang === "en" ? "Available inventory shown" : "المخزون المتاح موضح"}
                                            </FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Weight */}
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Weight (grams)" : "الوزن (جرام)"}
                                            <span className="text-red-500 ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    min="0.01"
                                                    placeholder={lang === "en" ? "0.00" : "٠.٠٠"}
                                                    className={showInsufficientInventory ? "border-red-500" : ""}
                                                    value={field.value || ""}
                                                    onChange={(e) => {
                                                        const value = parseFloat(e.target.value) || 0;
                                                        field.onChange(value);
                                                    }}
                                                />
                                                {showInsufficientInventory && (
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        {mode === "create" && (
                                            <>
                                                <FormDescription>
                                                    {hasSufficientInventory()
                                                        ? `${lang === "en" ? "Available" : "المتاح"}: ${availableInventory.toFixed(2)}g`
                                                        : `${lang === "en" ? "Insufficient" : "غير كاف"}: ${availableInventory.toFixed(2)}g`}
                                                </FormDescription>
                                                {showInsufficientInventory && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {lang === "en"
                                                            ? `Requested weight exceeds available inventory by ${(weight - availableInventory).toFixed(2)}g`
                                                            : `الوزن المطلوب يتجاوز المخزون المتاح بمقدار ${(weight - availableInventory).toFixed(2)} جرام`}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Currency */}
                            <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Currency" : "العملة"}
                                            <span className="text-red-500 ml-1">*</span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={mode === "edit"}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={lang === "en" ? "Select currency" : "اختر العملة"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {currencyOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            {lang === "en"
                                                ? "Select the currency for this transaction"
                                                : "اختر العملة لهذه العملية"}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price Calculation Preview */}
                            <FormItem>
                                <FormLabel>
                                    {lang === "en" ? "Price Calculation" : "حساب السعر"}
                                </FormLabel>
                                <div className="rounded-md border bg-gray-50 p-3 text-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calculator className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">
                                            {lang === "en" ? "Current Prices:" : "الأسعار الحالية:"}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="text-gray-600">USD:</span>
                                            <span className="font-medium ml-1">
                                                ${totals.pricePerGramUSD.toFixed(2)}/g
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">SYP:</span>
                                            <span className="font-medium ml-1">
                                                {totals.pricePerGramSYP.toFixed(2)} ليرة/g
                                            </span>
                                        </div>
                                    </div>
                                    {store?.exchangeRateUSDtoSYP && (
                                        <div className="mt-1 text-xs text-gray-500">
                                            {lang === "en"
                                                ? `Exchange rate: 1 USD = ${store.exchangeRateUSDtoSYP.toFixed(2)} SYP`
                                                : `سعر الصرف: ١ دولار = ${store.exchangeRateUSDtoSYP.toFixed(2)} ليرة`}
                                        </div>
                                    )}
                                </div>
                            </FormItem>

                            {/* Profit USD */}
                            <FormField
                                control={form.control}
                                name="profitUSD"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Profit (USD)" : "الربح (دولار)"}
                                            <span className="text-gray-400 ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                    <DollarSign className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder={lang === "en" ? "0.00" : "٠.٠٠"}
                                                    className="pl-10"
                                                    value={field.value || ""}
                                                    onChange={(e) => {
                                                        const value = parseFloat(e.target.value) || 0;
                                                        field.onChange(value);
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            {lang === "en"
                                                ? "Additional profit amount in USD"
                                                : "مبلغ الربح الإضافي بالدولار"}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Profit SYP (Read-only) */}
                            <FormField
                                control={form.control}
                                name="profitSYP"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Profit (SYP)" : "الربح (ليرة)"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                readOnly
                                                className="bg-gray-50"
                                                value={profitSYP.toFixed(2)}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {lang === "en"
                                                ? "Calculated automatically based on exchange rate"
                                                : "محسوب تلقائياً بناءً على سعر الصرف"}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Total Amount (Read-only) */}
                            <div className="col-span-2">
                                <FormItem>
                                    <FormLabel className="text-base">
                                        {lang === "en" ? "Total Amount (Including Profit)" : "المبلغ الإجمالي (بما في ذلك الربح)"}
                                    </FormLabel>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-md border bg-muted p-3">
                                            <div className="text-xs text-gray-500">
                                                {lang === "en" ? "In USD:" : "بالدولار:"}
                                            </div>
                                            <div className="text-lg font-semibold">
                                                ${totals.totalUSD.toFixed(2)}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {lang === "en" ? "Base:" : "الأساس:"} ${totals.baseTotalUSD.toFixed(2)}
                                                {profitUSD > 0 && (
                                                    <span className="text-green-600 ml-1">
                                                        (+${profitUSD.toFixed(2)} profit)
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="rounded-md border bg-muted p-3">
                                            <div className="text-xs text-gray-500">
                                                {lang === "en" ? "In SYP:" : "بالليرة:"}
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {totals.totalSYP.toFixed(2)} ليرة
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {lang === "en" ? "Base:" : "الأساس:"} {totals.baseTotalSYP.toFixed(2)} ليرة
                                                {profitSYP > 0 && (
                                                    <span className="text-green-600 ml-1">
                                                        (+{profitSYP.toFixed(2)} ليرة profit)
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <FormDescription>
                                        {lang === "en"
                                            ? "Base price + profit amount, calculated automatically based on exchange rate"
                                            : "السعر الأساسي + مبلغ الربح، محسوب تلقائياً بناءً على سعر الصرف"}
                                    </FormDescription>
                                </FormItem>
                            </div>

                            {/* Amount Paid */}
                            <FormField
                                control={form.control}
                                name="amountPaid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Amount Paid" : "المبلغ المدفوع"}
                                            <span className="text-red-500 ml-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder={currency === CurrencyType.USD ? "0.00 USD" : "٠.٠٠ ليرة"}
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value) || 0;
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        {currentTotal > 0 && (
                                            <FormDescription>
                                                {field.value === currentTotal
                                                    ? lang === "en" ? "Full payment" : "دفع كامل"
                                                    : lang === "en"
                                                        ? `Difference: ${(field.value - currentTotal).toFixed(2)} ${currency === CurrencyType.USD ? 'USD' : 'SYP'}`
                                                        : `الفرق: ${(field.value - currentTotal).toFixed(2)} ${currency === CurrencyType.USD ? 'دولار' : 'ليرة'}`}
                                            </FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Payment Type */}
                            <FormField
                                control={form.control}
                                name="paymentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Payment Type" : "طريقة الدفع"}
                                            <span className="text-red-500 ml-1">*</span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={lang === "en" ? "Select payment type" : "اختر طريقة الدفع"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {paymentTypeOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Customer Name */}
                        <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {lang === "en" ? "Customer Name (Optional)" : "اسم العميل (اختياري)"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={lang === "en" ? "Enter customer name" : "أدخل اسم العميل"}
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Customer Phone */}
                        <FormField
                            control={form.control}
                            name="customerPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {lang === "en" ? "Customer Phone (Optional)" : "هاتف العميل (اختياري)"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={lang === "en" ? "Enter customer phone" : "أدخل هاتف العميل"}
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {lang === "en" ? "Description (Optional)" : "الوصف (اختياري)"}
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={lang === "en" ? "Enter any additional notes" : "أدخل أي ملاحظات إضافية"}
                                            className="resize-none"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Summary Section */}
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <h3 className="font-medium mb-2">
                                {lang === "en" ? "Sale Summary" : "ملخص البيع"}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                                <div>
                                    <span className="text-gray-600">{lang === "en" ? "Gold Type:" : "نوع الذهب:"}</span>
                                    <span className="font-medium ml-2">
                                        {goldTypeOptions.find(opt => opt.value === goldType)?.label}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">{lang === "en" ? "Weight:" : "الوزن:"}</span>
                                    <span className="font-medium ml-2">{weight.toFixed(2)}g</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">{lang === "en" ? "Currency:" : "العملة:"}</span>
                                    <span className="font-medium ml-2">
                                        {currency === CurrencyType.USD ? "USD" : "SYP"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">{lang === "en" ? "Base Price per Gram:" : "السعر الأساسي لكل جرام:"}</span>
                                    <span className="font-medium ml-2">
                                        {currency === CurrencyType.USD
                                            ? `${totals.pricePerGramUSD.toFixed(2)} USD`
                                            : `${totals.pricePerGramSYP.toFixed(2)} SYP`}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">{lang === "en" ? "Profit:" : "الربح:"}</span>
                                    <span className="font-medium ml-2">
                                        ${profitUSD!.toFixed(2)} / {profitSYP.toFixed(2)} ليرة
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">{lang === "en" ? "Total Amount:" : "المبلغ الإجمالي:"}</span>
                                    <span className="font-medium ml-2">
                                        {currentTotal.toFixed(2)} {currency === CurrencyType.USD ? "USD" : "SYP"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">{lang === "en" ? "Amount Paid:" : "المبلغ المدفوع:"}</span>
                                    <span className="font-medium ml-2">
                                        {amountPaid.toFixed(2)} {currency === CurrencyType.USD ? "USD" : "SYP"}
                                    </span>
                                </div>
                                {store && (
                                    <div>
                                        <span className="text-gray-600">{lang === "en" ? "Exchange Rate:" : "سعر الصرف:"}</span>
                                        <span className="font-medium ml-2">
                                            1 USD = {typeof store.exchangeRateUSDtoSYP === 'number' ? store.exchangeRateUSDtoSYP.toFixed(2) : '0'} SYP
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isPending}
                            >
                                {lang === "en" ? "Cancel" : "إلغاء"}
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending || (mode === "create" && (!hasSufficientInventory() || weight <= 0))}
                                className="bg-teal-800 hover:bg-teal-800/80"
                            >
                                {isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {mode === "create"
                                    ? lang === "en" ? "Create Sale" : "إنشاء بيع"
                                    : lang === "en" ? "Update Sale" : "تحديث البيع"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}