// components/forms/sale-form.tsx - FIXED VERSION
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
import { Loader2, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrencyType, GoldType, PaymentType, Settings } from "@/lib/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiClient } from "@/lib/api-client";
import { StoreInventory } from "@/lib/types";
import { useSettings } from "@/hooks/use-settings";
import { InvoicePreview } from "@/components/invoice/invoice-preview";

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
    const { data: sale, isLoading: isLoadingSale } = useGetSaleById(
        mode === "edit" && saleId ? saleId : ""
    );

    const { settings, isLoadingSettings } = useSettings();

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
            });
        }
    }, [sale, form, mode]);

    // Watch form values for calculations
    const weight = form.watch("weight");
    const goldType = form.watch("goldType");
    const currency = form.watch("currency");
    const amountPaid = form.watch("amountPaid");

    // Calculate price per gram based on selected gold type and currency
    const pricePerGram = (() => {
        if (!settings) return { usd: 0, syp: 0 };

        const usdKey = `priceGold${goldType.replace('GOLD_', '')}USD` as keyof Settings;
        const sypKey = `priceGold${goldType.replace('GOLD_', '')}SYP` as keyof Settings;

        const usdValue = settings[usdKey];
        const sypValue = settings[sypKey];

        return {
            usd: typeof usdValue === 'number' ? usdValue : 0,
            syp: typeof sypValue === 'number' ? sypValue : 0
        };
    })();

    // Calculate total amount
    const total = {
        usd: weight * pricePerGram.usd,
        syp: weight * pricePerGram.syp
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

    // Update form values when calculations change
    useEffect(() => {
        const currentTotal = currency === CurrencyType.USD ? total.usd : total.syp;
        const currentAmountPaid = form.getValues("amountPaid");

        // Only auto-set amountPaid if it's zero or undefined and we have a valid total
        if (currentTotal > 0 && (!currentAmountPaid || currentAmountPaid === 0)) {
            form.setValue("amountPaid", currentTotal, { shouldValidate: true, shouldDirty: true });
        }

        // Update form values for price per gram and totals
        form.setValue("pricePerGramUSD", pricePerGram.usd, { shouldValidate: true, shouldDirty: false });
        form.setValue("pricePerGramSYP", pricePerGram.syp, { shouldValidate: true, shouldDirty: false });
        form.setValue("totalUSD", total.usd, { shouldValidate: true, shouldDirty: false });
        form.setValue("totalSYP", total.syp, { shouldValidate: true, shouldDirty: false });
    }, [weight, goldType, currency, pricePerGram, total, form]);

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
        { value: PaymentType.TRANSFER, label: lang === "en" ? "Transfer" : "تحويل" },
        { value: PaymentType.OTHER, label: lang === "en" ? "Other" : "أخرى" },
    ];

    const isPending = mode === "create"
        ? createSaleMutation.isPending
        : updateSaleMutation.isPending;

    const availableInventory = getAvailableInventory();
    const showInsufficientInventory = weight > availableInventory;
    const currentTotal = currency === CurrencyType.USD ? total.usd : total.syp;
    const currentPricePerGram = currency === CurrencyType.USD ? pricePerGram.usd : pricePerGram.syp;

    // Show loading state for create mode
    if (mode === "create" && (isLoadingInventory || isLoadingSettings)) {
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
        <>
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
                            {settings && mode === "create" && (
                                <Alert className="bg-blue-50 border-blue-200">
                                    <AlertCircle className="h-4 w-4 text-blue-600" />
                                    <AlertDescription className="text-blue-700">
                                        {lang === "en"
                                            ? `Current exchange rate: 1 USD = ${typeof settings.exchangeRateUSDtoSYP === 'number' ? settings.exchangeRateUSDtoSYP.toFixed(2) : '0'} SYP`
                                            : `سعر الصرف الحالي: ١ دولار = ${typeof settings.exchangeRateUSDtoSYP === 'number' ? settings.exchangeRateUSDtoSYP.toFixed(2) : '0'} ليرة`}
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
                                            {currentPricePerGram > 0 && (
                                                <FormDescription>
                                                    {lang === "en"
                                                        ? `Price per gram: ${currentPricePerGram.toFixed(2)} ${currency}`
                                                        : `السعر لكل جرام: ${currentPricePerGram.toFixed(2)} ${currency}`}
                                                </FormDescription>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Price Per Gram (Read-only) */}
                                <FormItem>
                                    <FormLabel>
                                        {lang === "en" ? "Price per Gram" : "السعر لكل جرام"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            value={currentPricePerGram > 0 ? `${currentPricePerGram.toFixed(2)} ${currency}` : "-"}
                                            disabled
                                            className="bg-muted"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {lang === "en" ? "Auto-calculated from settings" : "محسوب تلقائياً من الإعدادات"}
                                    </FormDescription>
                                </FormItem>

                                {/* Total Amount (Read-only) */}
                                <FormItem>
                                    <FormLabel>
                                        {lang === "en" ? "Total Amount" : "المبلغ الإجمالي"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            value={currentTotal > 0 ? `${currentTotal.toFixed(2)} ${currency}` : "-"}
                                            disabled
                                            className="bg-muted font-semibold"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {lang === "en" ? "Weight × Price per Gram" : "الوزن × السعر لكل جرام"}
                                    </FormDescription>
                                </FormItem>

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
                                                    placeholder={lang === "en" ? "0.00" : "٠.٠٠"}
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
                                                            ? `Difference: ${(field.value - currentTotal).toFixed(2)} ${currency}`
                                                            : `الفرق: ${(field.value - currentTotal).toFixed(2)} ${currency}`}
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
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
                                        <span className="text-gray-600">{lang === "en" ? "Price per Gram:" : "السعر لكل جرام:"}</span>
                                        <span className="font-medium ml-2">{currentPricePerGram.toFixed(2)} {currency}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">{lang === "en" ? "Total Amount:" : "المبلغ الإجمالي:"}</span>
                                        <span className="font-medium ml-2">{currentTotal.toFixed(2)} {currency}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">{lang === "en" ? "Amount Paid:" : "المبلغ المدفوع:"}</span>
                                        <span className="font-medium ml-2">{amountPaid.toFixed(2)} {currency}</span>
                                    </div>
                                    {settings && (
                                        <div>
                                            <span className="text-gray-600">{lang === "en" ? "Equivalent in other currency:" : "المعادل بالعملة الأخرى:"}</span>
                                            <span className="font-medium ml-2">
                                                {currency === CurrencyType.USD
                                                    ? `${(currentTotal * (typeof settings.exchangeRateUSDtoSYP === 'number' ? settings.exchangeRateUSDtoSYP : 0)).toFixed(2)} SYP`
                                                    : `${(currentTotal / (typeof settings.exchangeRateUSDtoSYP === 'number' ? settings.exchangeRateUSDtoSYP : 1)).toFixed(2)} USD`}
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

            {/* Invoice Preview Dialog */}
            {/* {createdSale && (
                <InvoicePreview
                    sale={createdSale}
                    isOpen={showInvoicePreview}
                    onClose={() => {
                        setShowInvoicePreview(false);
                        router.push(`/${storeId}/sales`);
                    }}
                />
            )} */}
        </>
    );
}