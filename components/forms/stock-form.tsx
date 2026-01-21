// components/forms/stock-form.tsx - IMPROVED VERSION WITH BETTER UX
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getCreateStockSchema, getUpdateStockSchema, CreateStockInput, UpdateStockInput } from "@/zod/stock.schemas";
import { useCreateStock, useUpdateStock, useGetStockById } from "@/hooks/use-stocks";
import { useGetStoreById } from "@/hooks/use-stores";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
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
import { Loader2, Package, MinusCircle, PlusCircle, Scale, DollarSign, FileText, ClipboardList, Calculator, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { StockType, GoldType } from "../lib/generated/prisma";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StockFormProps {
    storeId: string;
    mode: "create" | "edit";
    stockId?: string;
}

export function StockForm({ storeId, mode, stockId }: StockFormProps) {
    const { lang } = useLangStore();
    const router = useRouter();
    const [autoInvoiceNumber, setAutoInvoiceNumber] = useState<string>("");

    // Hooks for create and edit
    const createStockMutation = useCreateStock();
    const updateStockMutation = useUpdateStock();
    const { data: stock, isLoading: isLoadingStock } = useGetStockById(
        mode === "edit" && stockId ? stockId : ""
    );
    const { data: store, isLoading: isLoadingStore } = useGetStoreById(storeId);

    const createSchema = getCreateStockSchema(lang);
    const updateSchema = getUpdateStockSchema(lang);

    const form = useForm<CreateStockInput | UpdateStockInput>({
        resolver: zodResolver(
            mode === "create"
                ? createSchema
                : updateSchema
        ),
        defaultValues: {
            quantity: 0,
            goldType: GoldType.GOLD_14,
            type: StockType.ADD,
            note: "",
            costPerGramUSD: null,
            totalCostUSD: null,
            totalCostSYP: null,
            supplier: "",
            invoiceRef: "",
        },
    });

    // Set form values when in edit mode and stock data is loaded
    useEffect(() => {
        if (mode === "edit" && stock) {
            form.reset({
                quantity: stock.quantity,
                goldType: stock.goldType as any,
                type: stock.type as any,
                note: stock.note || "",
                costPerGramUSD: stock.costPerGramUSD || null,
                totalCostUSD: stock.totalCostUSD || null,
                totalCostSYP: stock.totalCostSYP || null,
                supplier: stock.supplier || "",
                invoiceRef: stock.invoiceRef || "",
            });
        }
    }, [stock, form, mode]);

    // Generate auto invoice number for create mode
    useEffect(() => {
        if (mode === "create") {
            const timestamp = Date.now();
            const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            const invoiceNum = `INV-${timestamp}-${randomPart}`;
            setAutoInvoiceNumber(invoiceNum);
            form.setValue("invoiceRef", invoiceNum);
        }
    }, [mode, form]);

    // Watch form values for auto-calculations
    const quantity = form.watch("quantity");
    const costPerGramUSD = form.watch("costPerGramUSD");
    const totalCostUSD = form.watch("totalCostUSD");

    // Auto-calculate totalCostUSD when quantity or costPerGramUSD changes
    useEffect(() => {
        if (quantity && costPerGramUSD && costPerGramUSD > 0) {
            const calculatedTotal = quantity * costPerGramUSD;
            form.setValue("totalCostUSD", calculatedTotal, {
                shouldValidate: true,
                shouldDirty: false
            });
        }
    }, [quantity, costPerGramUSD, form]);

    // Auto-calculate totalCostSYP when totalCostUSD changes and we have exchange rate
    useEffect(() => {
        if (store && totalCostUSD && totalCostUSD > 0) {
            const exchangeRate = typeof store.exchangeRateUSDtoSYP === 'number' ? store.exchangeRateUSDtoSYP : 0;
            if (exchangeRate > 0) {
                const calculatedTotalSYP = totalCostUSD * exchangeRate;
                form.setValue("totalCostSYP", calculatedTotalSYP, {
                    shouldValidate: true,
                    shouldDirty: false
                });
            }
        }
    }, [totalCostUSD, store, form]);

    const onSubmit = async (data: CreateStockInput | UpdateStockInput) => {
        try {
            if (mode === "create") {
                await createStockMutation.mutateAsync({
                    storeId,
                    data: data as CreateStockInput
                });
                toast.success(
                    lang === "en"
                        ? "Stock movement created successfully"
                        : "تم إنشاء حركة المخزون بنجاح"
                );
            } else {
                if (!stockId) {
                    throw new Error(lang === "en"
                        ? "Stock ID is required for update"
                        : "معرف المخزون مطلوب للتحديث"
                    );
                }
                await updateStockMutation.mutateAsync({
                    id: stockId,
                    data: data as UpdateStockInput,
                    storeId
                });
                toast.success(
                    lang === "en"
                        ? "Stock movement updated successfully"
                        : "تم تحديث حركة المخزون بنجاح"
                );
            }
            router.push(`/${storeId}/stock`);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || error?.message ||
                (mode === "create"
                    ? lang === "en"
                        ? "Failed to create stock movement"
                        : "فشل في إنشاء حركة المخزون"
                    : lang === "en"
                        ? "Failed to update stock movement"
                        : "فشل في تحديث حركة المخزون")
            );
        }
    };

    const goldTypeOptions = [
        { value: GoldType.GOLD_14, label: lang === "en" ? "14K Gold" : "ذهب عيار ١٤" },
        { value: GoldType.GOLD_18, label: lang === "en" ? "18K Gold" : "ذهب عيار ١٨" },
        { value: GoldType.GOLD_21, label: lang === "en" ? "21K Gold" : "ذهب عيار ٢١" },
        { value: GoldType.GOLD_24, label: lang === "en" ? "24K Gold" : "ذهب عيار ٢٤" },
    ];

    const stockTypeOptions = [
        {
            value: StockType.ADD,
            label: lang === "en" ? "Add Stock" : "إضافة مخزون",
            icon: <PlusCircle className="h-4 w-4 mr-2" />,
            color: "text-green-600"
        },
        {
            value: StockType.REMOVE,
            label: lang === "en" ? "Remove Stock" : "سحب من المخزون",
            icon: <MinusCircle className="h-4 w-4 mr-2" />,
            color: "text-red-600"
        },
    ];

    const getStockTypeIcon = (type: StockType) => {
        return type === StockType.ADD
            ? <PlusCircle className="h-4 w-4 mr-2" />
            : <MinusCircle className="h-4 w-4 mr-2" />;
    };

    const getStockTypeColor = (type: StockType) => {
        return type === StockType.ADD
            ? "text-green-600"
            : "text-red-600";
    };

    const isPending = mode === "create"
        ? createStockMutation.isPending
        : updateStockMutation.isPending;

    // Show loading state for edit mode or store loading
    if ((mode === "edit" && isLoadingStock) || isLoadingStore) {
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

    const currentStockType = form.watch("type") as StockType;
    const currentQuantity = form.watch("quantity");

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-2 rounded-lg",
                        currentStockType === StockType.ADD ? "bg-green-100" : "bg-red-100"
                    )}>
                        <Package className={cn(
                            "h-6 w-6",
                            currentStockType === StockType.ADD ? "text-green-700" : "text-red-700"
                        )} />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">
                            {mode === "create"
                                ? lang === "en" ? "Create Stock Movement" : "إنشاء حركة مخزون جديدة"
                                : lang === "en" ? "Update Stock Movement" : "تحديث حركة المخزون"}
                        </CardTitle>
                        <CardDescription>
                            {mode === "create"
                                ? lang === "en"
                                    ? "Record a new stock addition or removal"
                                    : "تسجيل إضافة أو سحب جديد من المخزون"
                                : lang === "en"
                                    ? "Update the stock movement details below"
                                    : "تحديث تفاصيل حركة المخزون أدناه"}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Exchange Rate Alert */}
                        {store && mode === "create" && (
                            <Alert className="bg-blue-50 border-blue-200">
                                <AlertCircle className="h-4 w-4 text-blue-600" />
                                <AlertDescription className="text-blue-700">
                                    <div className="flex flex-col gap-1">
                                        <span>
                                            {lang === "en"
                                                ? `Current exchange rate: 1 USD = ${typeof store.exchangeRateUSDtoSYP === 'number' ? store.exchangeRateUSDtoSYP.toFixed(2) : '0'} SYP`
                                                : `سعر الصرف الحالي: ١ دولار = ${typeof store.exchangeRateUSDtoSYP === 'number' ? store.exchangeRateUSDtoSYP.toFixed(2) : '0'} ليرة`}
                                        </span>
                                        <span className="text-xs">
                                            {lang === "en"
                                                ? "Auto-invoice number generated. Costs will be calculated automatically."
                                                : "تم إنشاء رقم فاتورة تلقائي. سيتم حساب التكاليف تلقائياً."}
                                        </span>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* SECTION 1: Movement Type & Details */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5 text-teal-700" />
                                <h3 className="text-lg font-semibold text-teal-900">
                                    {lang === "en" ? "Movement Details" : "تفاصيل الحركة"}
                                </h3>
                            </div>
                            <Separator className="bg-teal-100" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Stock Type */}
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Movement Type" : "نوع الحركة"}
                                                <span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={lang === "en" ? "Select type" : "اختر النوع"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {stockTypeOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            <div className={cn("flex items-center", option.color)}>
                                                                {option.icon}
                                                                {option.label}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                {lang === "en"
                                                    ? "Choose whether to add or remove stock"
                                                    : "اختر ما إذا كنت تريد إضافة أو سحب المخزون"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={lang === "en" ? "Select gold type" : "اختر نوع الذهب"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {goldTypeOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                {lang === "en"
                                                    ? "Select the karat of gold"
                                                    : "اختر عيار الذهب"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* SECTION 2: Quantity & Supplier */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Scale className="h-5 w-5 text-teal-700" />
                                <h3 className="text-lg font-semibold text-teal-900">
                                    {lang === "en" ? "Quantity & Supplier" : "الكمية والمورد"}
                                </h3>
                            </div>
                            <Separator className="bg-teal-100" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Quantity */}
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Quantity (grams)" : "الكمية (جرام)"}
                                                <span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0.01"
                                                        placeholder={lang === "en" ? "0.00" : "٠.٠٠"}
                                                        {...field}
                                                        value={field.value || ""}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                        className={cn(
                                                            "pr-10 transition-colors",
                                                            currentStockType === StockType.ADD && "border-green-300 focus:border-green-500 focus:ring-green-500",
                                                            currentStockType === StockType.REMOVE && "border-red-300 focus:border-red-500 focus:ring-red-500"
                                                        )}
                                                    />
                                                    <div className={cn(
                                                        "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
                                                        getStockTypeColor(currentStockType)
                                                    )}>
                                                        {getStockTypeIcon(currentStockType)}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                {lang === "en"
                                                    ? "Enter the weight in grams"
                                                    : "أدخل الوزن بالجرام"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Supplier */}
                                <FormField
                                    control={form.control}
                                    name="supplier"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Supplier" : "المورد"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={lang === "en" ? "Enter supplier name" : "أدخل اسم المورد"}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {lang === "en"
                                                    ? "Optional supplier information"
                                                    : "معلومات المورد الاختيارية"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* SECTION 3: Cost Information */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-green-700" />
                                <h3 className="text-lg font-semibold text-green-900">
                                    {lang === "en" ? "Cost Information" : "معلومات التكلفة"}
                                </h3>
                                <Badge variant="secondary" className="ml-2 text-xs">
                                    {lang === "en" ? "Optional" : "اختياري"}
                                </Badge>
                            </div>
                            <Separator className="bg-green-100" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Cost Per Gram USD */}
                                <FormField
                                    control={form.control}
                                    name="costPerGramUSD"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Cost per Gram (USD)" : "التكلفة لكل جرام (دولار)"}
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                        <DollarSign className="h-4 w-4 text-green-500" />
                                                    </div>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        className="pl-10"
                                                        {...field}
                                                        value={field.value || ""}
                                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormDescription className="flex items-center gap-1">
                                                <Calculator className="h-3 w-3" />
                                                {lang === "en" ? "Will auto-calculate total" : "سيتم حساب الإجمالي تلقائياً"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Total Cost USD */}
                                <FormField
                                    control={form.control}
                                    name="totalCostUSD"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Total Cost (USD)" : "التكلفة الإجمالية (دولار)"}
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                        <DollarSign className="h-4 w-4 text-green-500" />
                                                    </div>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        className="pl-10 bg-green-50 border-green-200"
                                                        readOnly={!!(costPerGramUSD && costPerGramUSD > 0)}
                                                        {...field}
                                                        value={field.value || ""}
                                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                    />
                                                    {costPerGramUSD && costPerGramUSD > 0 && (
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <Calculator className="h-4 w-4 text-green-600" />
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                {costPerGramUSD && costPerGramUSD > 0
                                                    ? lang === "en" ? "Auto-calculated" : "محسوب تلقائياً"
                                                    : lang === "en" ? "Or enter manually" : "أو أدخل يدوياً"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Total Cost SYP */}
                                <FormField
                                    control={form.control}
                                    name="totalCostSYP"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Total Cost (SYP)" : "التكلفة الإجمالية (ل.س)"}
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        className="bg-green-50 border-green-200"
                                                        readOnly
                                                        {...field}
                                                        value={field.value || ""}
                                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                    />
                                                    {totalCostUSD && totalCostUSD > 0 && (
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <Calculator className="h-4 w-4 text-green-600" />
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                {lang === "en"
                                                    ? "Calculated from USD using exchange rate"
                                                    : "محسوب من الدولار باستخدام سعر الصرف"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* SECTION 4: Additional Information */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-teal-700" />
                                <h3 className="text-lg font-semibold text-teal-900">
                                    {lang === "en" ? "Additional Information" : "معلومات إضافية"}
                                </h3>
                                <Badge variant="secondary" className="ml-2 text-xs">
                                    {lang === "en" ? "Optional" : "اختياري"}
                                </Badge>
                            </div>
                            <Separator className="bg-teal-100" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Invoice Reference */}
                                <FormField
                                    control={form.control}
                                    name="invoiceRef"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Invoice Reference" : "مرجع الفاتورة"}
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder={lang === "en" ? "INV-001" : "فاتورة-001"}
                                                        className={mode === "create" ? "bg-blue-50 border-blue-200" : ""}
                                                        readOnly={true}
                                                        {...field}
                                                        value={field.value || ""}
                                                    />
                                                    {mode === "create" && (
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 text-xs">
                                                                {lang === "en" ? "Auto" : "تلقائي"}
                                                            </Badge>
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                {mode === "create"
                                                    ? lang === "en"
                                                        ? "Auto-generated invoice number"
                                                        : "رقم فاتورة تم إنشاؤه تلقائياً"
                                                    : lang === "en"
                                                        ? "Invoice or reference number"
                                                        : "رقم الفاتورة أو المرجع"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Note */}
                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Notes" : "ملاحظات"}
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder={lang === "en"
                                                    ? "Enter reason for stock movement or any additional notes..."
                                                    : "أدخل سبب حركة المخزون أو أي ملاحظات إضافية..."
                                                }
                                                className="resize-none min-h-[100px]"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {lang === "en"
                                                ? "Provide context for this movement"
                                                : "قدم سياقًا لهذه الحركة"}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Preview Card - Enhanced */}
                        <div className={cn(
                            "bg-gradient-to-br p-6 rounded-xl border-2 shadow-md transition-all",
                            currentStockType === StockType.ADD && "from-green-50 via-emerald-50 to-teal-50 border-green-200",
                            currentStockType === StockType.REMOVE && "from-red-50 via-rose-50 to-pink-50 border-red-200"
                        )}>
                            <div className="flex items-center gap-2 mb-4">
                                <Package className={cn(
                                    "h-5 w-5",
                                    currentStockType === StockType.ADD ? "text-green-700" : "text-red-700"
                                )} />
                                <h3 className={cn(
                                    "font-semibold text-lg",
                                    currentStockType === StockType.ADD ? "text-green-900" : "text-red-900"
                                )}>
                                    {lang === "en" ? "Movement Preview" : "معاينة الحركة"}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Movement Type */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border">
                                    <span className="text-xs text-gray-600 block mb-2">
                                        {lang === "en" ? "Movement Type:" : "نوع الحركة:"}
                                    </span>
                                    {currentStockType === StockType.ADD ? (
                                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-sm">
                                            <PlusCircle className="h-4 w-4 mr-1" />
                                            {lang === "en" ? "Stock Addition" : "إضافة مخزون"}
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 text-sm">
                                            <MinusCircle className="h-4 w-4 mr-1" />
                                            {lang === "en" ? "Stock Removal" : "سحب من المخزون"}
                                        </Badge>
                                    )}
                                </div>

                                {/* Gold Type */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border">
                                    <span className="text-xs text-gray-600 block mb-2">
                                        {lang === "en" ? "Gold Type:" : "نوع الذهب:"}
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {goldTypeOptions.find(g => g.value === form.watch("goldType"))?.label}
                                    </span>
                                </div>

                                {/* Quantity */}
                                <div className={cn(
                                    "p-4 rounded-lg shadow-sm border-2",
                                    currentStockType === StockType.ADD ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
                                )}>
                                    <span className="text-xs text-gray-700 block mb-2">
                                        {lang === "en" ? "Quantity:" : "الكمية:"}
                                    </span>
                                    <div className={cn(
                                        "text-2xl font-bold",
                                        currentStockType === StockType.ADD && "text-green-700",
                                        currentStockType === StockType.REMOVE && "text-red-700"
                                    )}>
                                        {currentStockType === StockType.ADD ? '+' : '-'}
                                        {currentQuantity?.toFixed(2) || '0.00'}
                                        <span className="text-sm ml-1">g</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Preview Info */}
                            {(form.watch("supplier") || form.watch("invoiceRef") || (totalCostUSD && totalCostUSD > 0)) && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        {form.watch("supplier") && (
                                            <div className="bg-white/70 p-3 rounded">
                                                <span className="text-gray-600">{lang === "en" ? "Supplier:" : "المورد:"}</span>
                                                <span className="font-medium ml-2">{form.watch("supplier")}</span>
                                            </div>
                                        )}
                                        {form.watch("invoiceRef") && (
                                            <div className="bg-white/70 p-3 rounded">
                                                <span className="text-gray-600">{lang === "en" ? "Invoice:" : "الفاتورة:"}</span>
                                                <span className="font-medium ml-2">{form.watch("invoiceRef")}</span>
                                            </div>
                                        )}
                                        {totalCostUSD && totalCostUSD > 0 && (
                                            <div className="bg-white/70 p-3 rounded">
                                                <span className="text-gray-600">{lang === "en" ? "Total Cost:" : "التكلفة الإجمالية:"}</span>
                                                <span className="font-semibold text-green-700 ml-2">
                                                    ${totalCostUSD.toFixed(2)}
                                                </span>
                                            </div>
                                        )}
                                        {form.watch("totalCostSYP") && form.watch("totalCostSYP")! > 0 && (
                                            <div className="bg-white/70 p-3 rounded">
                                                <span className="text-gray-600">{lang === "en" ? "Total (SYP):" : "الإجمالي (ل.س):"}</span>
                                                <span className="font-semibold text-green-700 ml-2">
                                                    {form.watch("totalCostSYP")!.toFixed(2)} ل.س
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isPending}
                                className="min-w-[120px]"
                            >
                                {lang === "en" ? "Cancel" : "إلغاء"}
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className={cn(
                                    "min-w-[120px] shadow-lg transition-all",
                                    currentStockType === StockType.ADD && "bg-green-600 hover:bg-green-700",
                                    currentStockType === StockType.REMOVE && "bg-red-600 hover:bg-red-700"
                                )}
                            >
                                {isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {mode === "create"
                                    ? lang === "en"
                                        ? `Create ${currentStockType === StockType.ADD ? "Addition" : "Removal"}`
                                        : currentStockType === StockType.ADD
                                            ? "إنشاء إضافة"
                                            : "إنشاء سحب"
                                    : lang === "en"
                                        ? "Update Movement"
                                        : "تحديث الحركة"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}