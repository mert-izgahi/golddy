// components/forms/create-store-form.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getStoreSchema, StoreInput } from "@/lib/zod";
import { useCreateStore, useUpdateStore, useGetStoreById } from "@/hooks/use-stores";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { StoreStatus } from "@/lib/generated/prisma/client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CreateStoreFormProps {
    mode?: "create" | "edit";
    storeId?: string;
}

export default function CreateStoreForm({
    mode = "create",
    storeId
}: CreateStoreFormProps) {
    const { lang } = useLangStore();
    const router = useRouter();

    // Hooks for store operations
    const createStoreMutation = useCreateStore();
    const updateStoreMutation = useUpdateStore();
    const { data: store, isLoading: isLoadingStore } = useGetStoreById(
        mode === "edit" && storeId ? storeId : ""
    );

    const schema = getStoreSchema(lang);
    const form = useForm<StoreInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            address: "",
            city: "",
            logoUrl: "",
            primaryPhoneNumber: "",
            secondaryPhoneNumber: "",
            status: StoreStatus.ACTIVE,
            currentGold14: 0,
            currentGold18: 0,
            currentGold21: 0,
            currentGold24: 0,
            currentUSD: 0,
            currentSYP: 0,
            profitMarginGold14: 0,
            profitMarginGold18: 0,
            profitMarginGold21: 0,
            profitMarginGold24: 0,
        },
    });

    // Set form values when in edit mode and store data is loaded
    useEffect(() => {
        if (mode === "edit" && store) {
            form.reset({
                name: store.name || "",
                address: store.address || "",
                city: store.city || "",
                logoUrl: store.logoUrl || "",
                primaryPhoneNumber: store.primaryPhoneNumber || "",
                secondaryPhoneNumber: store.secondaryPhoneNumber || "",
                status: store.status as StoreStatus,
                currentGold14: store.currentGold14,
                currentGold18: store.currentGold18,
                currentGold21: store.currentGold21,
                currentGold24: store.currentGold24,
                currentUSD: store.currentUSD,
                currentSYP: store.currentSYP,
                profitMarginGold14: store.profitMarginGold14,
                profitMarginGold18: store.profitMarginGold18,
                profitMarginGold21: store.profitMarginGold21,
                profitMarginGold24: store.profitMarginGold24,
            });
        }
    }, [store, form, mode]);

    const onSubmit = async (values: StoreInput) => {
        try {
            if (mode === "create") {
                await createStoreMutation.mutateAsync(values);
                toast.success(
                    lang === "en" ? "Store created successfully" : "تم إنشاء المتجر بنجاح"
                );
            } else {
                if (!storeId) {
                    throw new Error("Store ID is required for update");
                }

                await updateStoreMutation.mutateAsync({
                    id: storeId,
                    data: values
                });
                toast.success(
                    lang === "en" ? "Store updated successfully" : "تم تحديث المتجر بنجاح"
                );
            }
            router.push("/admin/stores");
        } catch (error: any) {
            toast.error(
                error?.message ||
                (mode === "create"
                    ? lang === "en" ? "Failed to create store" : "فشل في إنشاء المتجر"
                    : lang === "en" ? "Failed to update store" : "فشل في تحديث المتجر")
            );
        }
    };

    const statusOptions = [
        { value: StoreStatus.ACTIVE, label: lang === "en" ? "Active" : "نشط" },
        { value: StoreStatus.SUSPEND, label: lang === "en" ? "Suspended" : "موقوف" },
        { value: StoreStatus.BAND, label: lang === "en" ? "Banned" : "محظور" },
    ];

    const isPending = mode === "create"
        ? createStoreMutation.isPending
        : updateStoreMutation.isPending;

    // Show loading state for edit mode
    if (mode === "edit" && isLoadingStore) {
        return (
            <Card className="border-none shadow-none">
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
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
                        ? lang === "en" ? "Create New Store" : "إنشاء متجر جديد"
                        : lang === "en" ? "Update Store" : "تحديث المتجر"}
                </CardTitle>
                <CardDescription>
                    {mode === "create"
                        ? lang === "en"
                            ? "Fill in the details to create a new store"
                            : "املأ التفاصيل لإنشاء متجر جديد"
                        : lang === "en"
                            ? "Update the store details below"
                            : "تحديث تفاصيل المتجر أدناه"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Basic Information Section */}
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">
                                    {lang === "en" ? "Basic Information" : "المعلومات الأساسية"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {lang === "en"
                                        ? "Enter the basic details of your store"
                                        : "أدخل التفاصيل الأساسية لمتجرك"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Store Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Store Name" : "اسم المتجر"}
                                                <span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={lang === "en" ? "Enter store name" : "أدخل اسم المتجر"}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Status */}
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Status" : "الحالة"}
                                                <span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full" lang={lang}>
                                                        <SelectValue placeholder={lang === "en" ? "Select status" : "اختر الحالة"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {statusOptions.map((option) => (
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

                                {/* Address */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Address" : "العنوان"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={lang === "en" ? "Enter store address" : "أدخل عنوان المتجر"}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* City */}
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "City" : "المدينة"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={lang === "en" ? "Enter city" : "أدخل المدينة"}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Primary Phone */}
                                <FormField
                                    control={form.control}
                                    name="primaryPhoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Primary Phone" : "الهاتف الرئيسي"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={lang === "en" ? "Enter primary phone" : "أدخل الهاتف الرئيسي"}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Secondary Phone */}
                                <FormField
                                    control={form.control}
                                    name="secondaryPhoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {lang === "en" ? "Secondary Phone" : "الهاتف الثانوي"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={lang === "en" ? "Enter secondary phone" : "أدخل الهاتف الثانوي"}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Logo URL */}
                                <FormField
                                    control={form.control}
                                    name="logoUrl"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>
                                                {lang === "en" ? "Logo URL (Optional)" : "رابط الشعار (اختياري)"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder={lang === "en" ? "https://example.com/logo.png" : "https://example.com/logo.png"}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {lang === "en"
                                                    ? "Enter a valid URL for your store logo"
                                                    : "أدخل رابط صالح لشعار متجرك"}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Initial Inventory Section */}
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">
                                    {lang === "en" ? "Initial Gold Inventory" : "المخزون الابتدائي للذهب"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {lang === "en"
                                        ? "Set the initial gold quantities in grams"
                                        : "حدد الكميات الابتدائية للذهب بالجرام"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="currentGold14"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                14K {lang === "en" ? "Gold" : "ذهب"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>grams</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="currentGold18"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                18K {lang === "en" ? "Gold" : "ذهب"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>grams</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="currentGold21"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                21K {lang === "en" ? "Gold" : "ذهب"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>grams</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="currentGold24"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                24K {lang === "en" ? "Gold" : "ذهب"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>grams</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Initial Cash Balances Section */}
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">
                                    {lang === "en" ? "Initial Cash Balances" : "الرصيد النقدي الابتدائي"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {lang === "en"
                                        ? "Set the initial cash balances for the store"
                                        : "حدد الرصيد النقدي الابتدائي للمتجر"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="currentUSD"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                USD {lang === "en" ? "Balance" : "الرصيد"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="currentSYP"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                SYP {lang === "en" ? "Balance" : "الرصيد"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Profit Margins Section */}
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">
                                    {lang === "en" ? "Profit Margins (%)" : "هوامش الربح (%)"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {lang === "en"
                                        ? "Set the profit margin percentage for each gold type"
                                        : "حدد نسبة هامش الربح لكل نوع من الذهب"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="profitMarginGold14"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                14K {lang === "en" ? "Margin" : "الهامش"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>%</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="profitMarginGold18"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                18K {lang === "en" ? "Margin" : "الهامش"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>%</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="profitMarginGold21"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                21K {lang === "en" ? "Margin" : "الهامش"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>%</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="profitMarginGold24"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                24K {lang === "en" ? "Margin" : "الهامش"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="0"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>%</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-4 pt-4">
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
                                className="bg-teal-800 hover:bg-teal-800/80"
                            >
                                {isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {mode === "create"
                                    ? lang === "en" ? "Create Store" : "إنشاء المتجر"
                                    : lang === "en" ? "Update Store" : "تحديث المتجر"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}