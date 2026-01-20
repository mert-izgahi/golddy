// components/forms/stock-form.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getCreateStockSchema, getUpdateStockSchema, CreateStockInput, UpdateStockInput } from "@/zod/stock.schemas";
import { useCreateStock, useUpdateStock, useGetStockById } from "@/hooks/use-stocks";
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
import { Loader2, Package, MinusCircle, PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { StockType, GoldType } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StockFormProps {
    storeId: string;
    mode: "create" | "edit";
    stockId?: string;
}

export function StockForm({ storeId, mode, stockId }: StockFormProps) {
    const { lang } = useLangStore();
    const router = useRouter();

    // Hooks for create and edit
    const createStockMutation = useCreateStock();
    const updateStockMutation = useUpdateStock();
    const { data: stock, isLoading: isLoadingStock } = useGetStockById(
        mode === "edit" && stockId ? stockId : ""
    );

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

    // Show loading state for edit mode
    if (mode === "edit" && isLoadingStock) {
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
                <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 text-teal-600" />
                    <CardTitle>
                        {mode === "create"
                            ? lang === "en" ? "Create Stock Movement" : "إنشاء حركة مخزون جديدة"
                            : lang === "en" ? "Update Stock Movement" : "تحديث حركة المخزون"}
                    </CardTitle>
                </div>
                <CardDescription>
                    {mode === "create"
                        ? lang === "en"
                            ? "Record a new stock addition or removal"
                            : "تسجيل إضافة أو سحب جديد من المخزون"
                        : lang === "en"
                            ? "Update the stock movement details below"
                            : "تحديث تفاصيل حركة المخزون أدناه"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Stock Type */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Movement Type *" : "نوع الحركة *"}
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
                                            {lang === "en" ? "Gold Type *" : "نوع الذهب *"}
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Quantity */}
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Quantity (grams) *" : "الكمية (جرام) *"}
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
                                                        "pr-10",
                                                        form.watch("type") === StockType.ADD && "border-green-300 focus:border-green-500",
                                                        form.watch("type") === StockType.REMOVE && "border-red-300 focus:border-red-500"
                                                    )}
                                                />
                                                <div className={cn(
                                                    "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
                                                    getStockTypeColor(form.watch("type") as StockType)
                                                )}>
                                                    {getStockTypeIcon(form.watch("type") as StockType)}
                                                </div>
                                            </div>
                                        </FormControl>
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
                                                placeholder={lang === "en" ? "Supplier name" : "اسم المورد"}
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Cost Information Section */}
                        <div className="border-t pt-4">
                            <h3 className="text-sm font-medium mb-3">
                                {lang === "en" ? "Cost Information (Optional)" : "معلومات التكلفة (اختياري)"}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Cost Per Gram USD */}
                                <FormField
                                    control={form.control}
                                    name="costPerGramUSD"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Cost/Gram (USD)" : "التكلفة/جرام (دولار)"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0.00"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                />
                                            </FormControl>
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
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0.00"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                />
                                            </FormControl>
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
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0.00"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            <Input
                                                placeholder={lang === "en" ? "INV-001" : "فاتورة-001"}
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
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
                                                ? "Enter reason for stock movement or any additional notes"
                                                : "أدخل سبب حركة المخزون أو أي ملاحظات إضافية"
                                            }
                                            className="resize-none"
                                            rows={4}
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Preview Card */}
                        <Card className={cn(
                            "border-2 transition-colors",
                            form.watch("type") === StockType.ADD && "border-green-200 bg-green-50",
                            form.watch("type") === StockType.REMOVE && "border-red-200 bg-red-50"
                        )}>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">
                                    {lang === "en" ? "Movement Preview" : "معاينة الحركة"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">
                                            {lang === "en" ? "Type:" : "النوع:"}
                                        </span>
                                    </div>
                                    <div className="text-right font-medium">
                                        {form.watch("type") === StockType.ADD ? (
                                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                                <PlusCircle className="h-3 w-3 mr-1" />
                                                {lang === "en" ? "Stock Addition" : "إضافة مخزون"}
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                                <MinusCircle className="h-3 w-3 mr-1" />
                                                {lang === "en" ? "Stock Removal" : "سحب من المخزون"}
                                            </Badge>
                                        )}
                                    </div>

                                    <div>
                                        <span className="text-muted-foreground">
                                            {lang === "en" ? "Gold Type:" : "نوع الذهب:"}
                                        </span>
                                    </div>
                                    <div className="text-right font-medium">
                                        {goldTypeOptions.find(g => g.value === form.watch("goldType"))?.label}
                                    </div>

                                    <div>
                                        <span className="text-muted-foreground">
                                            {lang === "en" ? "Quantity:" : "الكمية:"}
                                        </span>
                                    </div>
                                    <div className={cn(
                                        "text-right font-bold",
                                        form.watch("type") === StockType.ADD && "text-green-600",
                                        form.watch("type") === StockType.REMOVE && "text-red-600"
                                    )}>
                                        {form.watch("type") === StockType.ADD ? '+' : '-'}
                                        {form.watch("quantity")?.toFixed(2) || '0.00'}g
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

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
                                disabled={isPending}
                                className={cn(
                                    form.watch("type") === StockType.ADD && "bg-green-600 hover:bg-green-700",
                                    form.watch("type") === StockType.REMOVE && "bg-red-600 hover:bg-red-700"
                                )}
                            >
                                {isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {mode === "create"
                                    ? lang === "en"
                                        ? `Create ${form.watch("type") === StockType.ADD ? "Addition" : "Removal"}`
                                        : form.watch("type") === StockType.ADD
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