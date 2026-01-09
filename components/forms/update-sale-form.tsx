"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getUpdateSaleSchema, UpdateSaleInput } from "@/lib/zod";
import { useUpdateSale, useGetSaleById } from "@/hooks/use-sales";
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
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrencyType, GoldType, PaymentType } from "@/lib/generated/prisma/client";

interface UpdateSaleFormProps {
    saleId: string;
    storeId: string;
}

export function UpdateSaleForm({ saleId, storeId }: UpdateSaleFormProps) {
    const { lang } = useLangStore();
    const router = useRouter();
    const { data: sale, isLoading: isLoadingSale } = useGetSaleById(saleId);
    const updateSaleMutation = useUpdateSale();

    const form = useForm<UpdateSaleInput>({
        resolver: zodResolver(getUpdateSaleSchema(lang)),
        defaultValues: {
            weight: 0,
            goldType: GoldType.GOLD_14,
            pricePerGram: 0,
            total: 0,
            currency: CurrencyType.USD,
            paymentType: PaymentType.CASH,
            customerName: "",
            description: "",
        },
    });

    // Set form values when sale data is loaded
    useEffect(() => {
        if (sale) {
            form.reset({
                weight: sale.weight,
                goldType: sale.goldType as any,
                pricePerGram: sale.pricePerGram,
                total: sale.total,
                currency: sale.currency as any,
                paymentType: sale.paymentType as any,
                customerName: sale.customerName || "",
                description: sale.description || "",
            });
        }
    }, [sale, form]);

    // Auto-calculate total when weight or pricePerGram changes
    const weight = form.watch("weight");
    const pricePerGram = form.watch("pricePerGram");

    useEffect(() => {
        if (weight && weight > 0 && pricePerGram && pricePerGram > 0) {
            const calculatedTotal = weight * pricePerGram;
            form.setValue("total", calculatedTotal);
        }
    }, [weight, pricePerGram, form]);

    const onSubmit = async (data: UpdateSaleInput) => {
        try {
            await updateSaleMutation.mutateAsync({
                id: saleId,
                data
            });
            toast.success(
                lang === "en" ? "Sale updated successfully" : "تم تحديث البيع بنجاح"
            );
            router.push(`/${storeId}/sales`);
        } catch (error: any) {
            toast.error(
                error?.message ||
                (lang === "en" ? "Failed to update sale" : "فشل في تحديث البيع")
            );
        }
    };

    const goldTypeOptions = [
        { value: "GOLD_14", label: lang === "en" ? "14K Gold" : "ذهب عيار ١٤" },
        { value: "GOLD_18", label: lang === "en" ? "18K Gold" : "ذهب عيار ١٨" },
        { value: "GOLD_21", label: lang === "en" ? "21K Gold" : "ذهب عيار ٢١" },
        { value: "GOLD_24", label: lang === "en" ? "24K Gold" : "ذهب عيار ٢٤" },
    ];

    const currencyOptions = [
        { value: "USD", label: lang === "en" ? "US Dollar (USD)" : "دولار أمريكي (USD)" },
        { value: "SYP", label: lang === "en" ? "Syrian Pound (SYP)" : "ليرة سورية (SYP)" },
    ];

    const paymentTypeOptions = [
        { value: "CASH", label: lang === "en" ? "Cash" : "نقدي" },
        { value: "TRANSFER", label: lang === "en" ? "Bank Transfer" : "تحويل شام كاش" },
        { value: "OTHER", label: lang === "en" ? "Other" : "أخرى" },
    ];

    if (isLoadingSale) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {lang === "en" ? "Update Sale" : "تحديث البيع"}
                </CardTitle>
                <CardDescription>
                    {lang === "en"
                        ? "Update the sale details below"
                        : "تحديث تفاصيل البيع أدناه"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Gold Type */}
                            <FormField
                                control={form.control}
                                name="goldType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Gold Type" : "نوع الذهب"}
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
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

                            {/* Weight */}
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Weight (grams)" : "الوزن (جرام)"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder={lang === "en" ? "0.00" : "٠.٠٠"}
                                                {...field}
                                                value={field.value || ""}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Price Per Gram */}
                            <FormField
                                control={form.control}
                                name="pricePerGram"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Price per Gram" : "السعر لكل جرام"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder={lang === "en" ? "0.00" : "٠.٠٠"}
                                                {...field}
                                                value={field.value || ""}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Total (Auto-calculated) */}
                            <FormField
                                control={form.control}
                                name="total"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Total Amount" : "المبلغ الإجمالي"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder={lang === "en" ? "0.00" : "٠.٠٠"}
                                                {...field}
                                                value={field.value || ""}
                                                disabled
                                                className="bg-muted"
                                            />
                                        </FormControl>
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
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
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
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
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

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={updateSaleMutation.isPending}
                            >
                                {lang === "en" ? "Cancel" : "إلغاء"}
                            </Button>
                            <Button
                                type="submit"
                                disabled={updateSaleMutation.isPending}
                                className="bg-teal-800 hover:bg-teal-800/80"
                            >
                                {updateSaleMutation.isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {lang === "en" ? "Update Sale" : "تحديث البيع"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}