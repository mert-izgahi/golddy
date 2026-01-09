"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getCreateSaleSchema, CreateSaleInput } from "@/lib/zod";
import { useCreateSale } from "@/hooks/use-sales";
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
import { CurrencyType, GoldType, PaymentType } from "@/lib/generated/prisma";

interface CreateSaleFormProps {
    storeId: string;
}

export function CreateSaleForm({ storeId }: CreateSaleFormProps) {
    const { lang } = useLangStore();
    const router = useRouter();
    const createSaleMutation = useCreateSale();

    const form = useForm<CreateSaleInput>({
        resolver: zodResolver(getCreateSaleSchema(lang)),
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

    // Auto-calculate total when weight or pricePerGram changes
    const weight = form.watch("weight");
    const pricePerGram = form.watch("pricePerGram");

    useEffect(() => {
        if (weight > 0 && pricePerGram > 0) {
            const calculatedTotal = weight * pricePerGram;
            form.setValue("total", calculatedTotal);
        }
    }, [weight, pricePerGram, form]);

    const onSubmit = async (data: CreateSaleInput) => {
        try {
            await createSaleMutation.mutateAsync({
                storeId,
                data
            });
            toast.success(
                lang === "en" ? "Sale created successfully" : "تم إنشاء البيع بنجاح"
            );
            router.push(`/${storeId}/sales`);
        } catch (error: any) {
            toast.error(
                error?.message ||
                (lang === "en" ? "Failed to create sale" : "فشل في إنشاء البيع")
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
        { value: "TRANSFER", label: lang === "en" ? "Bank Transfer" : "تحويل بنكي" },
        { value: "OTHER", label: lang === "en" ? "Other" : "أخرى" },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {lang === "en" ? "Create New Sale" : "إنشاء بيع جديد"}
                </CardTitle>
                <CardDescription>
                    {lang === "en"
                        ? "Fill in the details to record a new sale"
                        : "املأ التفاصيل لتسجيل بيع جديد"}
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
                                            defaultValue={field.value}
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
                                            defaultValue={field.value}
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
                                            defaultValue={field.value}
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
                                disabled={createSaleMutation.isPending}
                            >
                                {lang === "en" ? "Cancel" : "إلغاء"}
                            </Button>
                            <Button
                                type="submit"
                                disabled={createSaleMutation.isPending}
                                className="bg-teal-800 hover:bg-teal-800/80"
                            >
                                {createSaleMutation.isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {lang === "en" ? "Create Sale" : "إنشاء بيع"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}