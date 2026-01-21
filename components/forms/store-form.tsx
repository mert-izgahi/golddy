"use client";

import { useEffect, useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Building2, Coins, DollarSign, Settings, PlusCircle, MinusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { StoreStatus } from "@/lib/generated/prisma";

interface CreateStoreFormProps {
    mode?: "create" | "edit";
    storeId?: string;
}

export default function StoreForm({
    mode = "create",
    storeId
}: CreateStoreFormProps) {
    const { lang } = useLangStore();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("basic");

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
            priceGold14USD: 0,
            priceGold18USD: 0,
            priceGold21USD: 0,
            priceGold24USD: 0,
            exchangeRateUSDtoSYP: 0,
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
                priceGold14USD: store.priceGold14USD,
                priceGold18USD: store.priceGold18USD,
                priceGold21USD: store.priceGold21USD,
                priceGold24USD: store.priceGold24USD,
                exchangeRateUSDtoSYP: store.exchangeRateUSDtoSYP,
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
            router.refresh();
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
        { value: StoreStatus.ACTIVE, label: lang === "en" ? "Active" : "نشط", color: "bg-green-100 text-green-800" },
        { value: StoreStatus.SUSPEND, label: lang === "en" ? "Suspended" : "موقوف", color: "bg-yellow-100 text-yellow-800" },
        { value: StoreStatus.BAND, label: lang === "en" ? "Banned" : "محظور", color: "bg-red-100 text-red-800" },
    ];

    const isPending = mode === "create"
        ? createStoreMutation.isPending
        : updateStoreMutation.isPending;

    // Calculate totals
    const calculateTotals = () => {
        const gold14 = form.watch("currentGold14") || 0;
        const gold18 = form.watch("currentGold18") || 0;
        const gold21 = form.watch("currentGold21") || 0;
        const gold24 = form.watch("currentGold24") || 0;

        const price14 = form.watch("priceGold14USD") || 0;
        const price18 = form.watch("priceGold18USD") || 0;
        const price21 = form.watch("priceGold21USD") || 0;
        const price24 = form.watch("priceGold24USD") || 0;

        const totalGoldWeight = gold14 + gold18 + gold21 + gold24;
        const totalGoldValue = (gold14 * price14) + (gold18 * price18) + (gold21 * price21) + (gold24 * price24);
        const totalCash = (form.watch("currentUSD") || 0) + ((form.watch("currentSYP") || 0) / (form.watch("exchangeRateUSDtoSYP") || 1));

        return {
            totalGoldWeight,
            totalGoldValue,
            totalCash,
            totalInventory: totalGoldValue + totalCash
        };
    };

    const totals = calculateTotals();

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
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
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
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Stats Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="rounded-lg border bg-white p-4 text-center">
                                <div className="text-sm font-medium text-gray-600 mb-1">
                                    {lang === "en" ? "Gold Weight" : "وزن الذهب"}
                                </div>
                                <div className="text-2xl font-bold text-yellow-600">
                                    {totals.totalGoldWeight.toFixed(2)}g
                                </div>
                            </div>

                            <div className="rounded-lg border bg-white p-4 text-center">
                                <div className="text-sm font-medium text-gray-600 mb-1">
                                    {lang === "en" ? "Gold Value" : "قيمة الذهب"}
                                </div>
                                <div className="text-2xl font-bold text-yellow-700">
                                    ${totals.totalGoldValue.toFixed(2)}
                                </div>
                            </div>

                            <div className="rounded-lg border bg-white p-4 text-center">
                                <div className="text-sm font-medium text-gray-600 mb-1">
                                    {lang === "en" ? "Cash Balance" : "رصيد النقد"}
                                </div>
                                <div className="text-2xl font-bold text-green-600">
                                    ${totals.totalCash.toFixed(2)}
                                </div>
                            </div>

                            <div className="rounded-lg border bg-white p-4 text-center">
                                <div className="text-sm font-medium text-gray-600 mb-1">
                                    {lang === "en" ? "Total Inventory" : "إجمالي المخزون"}
                                </div>
                                <div className="text-2xl font-bold text-blue-600">
                                    ${totals.totalInventory.toFixed(2)}
                                </div>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <Tabs dir={lang === "en" ? "ltr" : "rtl"} value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid grid-cols-4 mb-6">
                                <TabsTrigger value="basic" className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4" />
                                    {lang === "en" ? "Basic Info" : "معلومات أساسية"}
                                </TabsTrigger>
                                <TabsTrigger value="inventory" className="flex items-center gap-2">
                                    <Coins className="h-4 w-4" />
                                    {lang === "en" ? "Inventory" : "المخزون"}
                                </TabsTrigger>
                                <TabsTrigger value="prices" className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    {lang === "en" ? "Gold Prices" : "أسعار الذهب"}
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    {lang === "en" ? "Settings" : "الإعدادات"}
                                </TabsTrigger>
                            </TabsList>

                            {/* Basic Information Tab */}
                            <TabsContent value="basic" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Store Name */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
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
                                    <div className="flex flex-col gap-2">
                                        <h2>
                                            {lang === "en" ? "Store Address" : "عنوان المتجر"}
                                            <span className="text-red-500 ml-1">*</span>
                                        </h2>
                                        <p>
                                            {lang === "en"
                                                ? "Please enter the address of the store"
                                                : "يرجى ادخال عنوان المتجر"}
                                        </p>
                                    </div>
                                    {/* Address */}
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
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
                                            <FormItem className="md:col-span-2">
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

                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <h2>
                                                {lang === "en" ? "Contact Information" : "معلومات الاتصال"}
                                                <span className="text-red-500 ml-1">*</span>
                                            </h2>
                                            <p>
                                                {lang === "en"
                                                    ? "Please enter the contact information of the store"
                                                    : "يرجى ادخال معلومات الاتصال للمتجر"}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        </div>
                                    </div>
                                </div>

                            </TabsContent>

                            {/* Inventory Tab */}
                            <TabsContent value="inventory" className="space-y-6">
                                {/* Gold Inventory */}
                                <div>
                                    <h3 className="text-lg font-medium mb-4">
                                        {lang === "en" ? "Gold Inventory (Grams)" : "مخزون الذهب (جرام)"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="currentGold14"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center justify-between">
                                                        <span>14K {lang === "en" ? "Gold" : "ذهب"}</span>
                                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                                            {field.value?.toFixed(2)}g
                                                        </Badge>
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
                                            name="currentGold18"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center justify-between">
                                                        <span>18K {lang === "en" ? "Gold" : "ذهب"}</span>
                                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                                            {field.value?.toFixed(2)}g
                                                        </Badge>
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
                                            name="currentGold21"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center justify-between">
                                                        <span>21K {lang === "en" ? "Gold" : "ذهب"}</span>
                                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                                            {field.value?.toFixed(2)}g
                                                        </Badge>
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
                                            name="currentGold24"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center justify-between">
                                                        <span>24K {lang === "en" ? "Gold" : "ذهب"}</span>
                                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                                            {field.value?.toFixed(2)}g
                                                        </Badge>
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

                                {/* Cash Balances */}
                                <div>
                                    <h3 className="text-lg font-medium mb-4">
                                        {lang === "en" ? "Cash Balances" : "الرصيد النقدي"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="currentUSD"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center justify-between">
                                                        <span>USD {lang === "en" ? "Balance" : "الرصيد"}</span>
                                                        <Badge variant="outline" className="bg-green-50 text-green-700">
                                                            ${field.value?.toFixed(2)}
                                                        </Badge>
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
                                                    <FormLabel className="flex items-center justify-between">
                                                        <span>SYP {lang === "en" ? "Balance" : "الرصيد"}</span>
                                                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                                            {field.value?.toFixed(0)} ليرة
                                                        </Badge>
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
                            </TabsContent>

                            {/* Gold Prices Tab */}
                            <TabsContent value="prices" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="priceGold14USD"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center justify-between">
                                                    <span>14K {lang === "en" ? "Price" : "السعر"}</span>
                                                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                                        ${field.value?.toFixed(2)}/g
                                                    </Badge>
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
                                                <FormDescription>USD/gram</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="priceGold18USD"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center justify-between">
                                                    <span>18K {lang === "en" ? "Price" : "السعر"}</span>
                                                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                                        ${field.value?.toFixed(2)}/g
                                                    </Badge>
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
                                                <FormDescription>USD/gram</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="priceGold21USD"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center justify-between">
                                                    <span>21K {lang === "en" ? "Price" : "السعر"}</span>
                                                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                                        ${field.value?.toFixed(2)}/g
                                                    </Badge>
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
                                                <FormDescription>USD/gram</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="priceGold24USD"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center justify-between">
                                                    <span>24K {lang === "en" ? "Price" : "السعر"}</span>
                                                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                                        ${field.value?.toFixed(2)}/g
                                                    </Badge>
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
                                                <FormDescription>USD/gram</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </TabsContent>

                            {/* Settings Tab */}
                            <TabsContent value="settings" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="exchangeRateUSDtoSYP"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="flex items-center justify-between">
                                                    <span>{lang === "en" ? "USD to SYP Exchange Rate" : "سعر صرف الدولار إلى الليرة"}</span>
                                                    <Badge variant="outline" className="bg-orange-50 text-orange-700">
                                                        1 USD = {field.value?.toFixed(2)} SYP
                                                    </Badge>
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
                                                <FormDescription>
                                                    {lang === "en"
                                                        ? "How much SYP equals 1 USD"
                                                        : "كم ليرة سورية تساوي 1 دولار"}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Store Preview Card */}
                                <Card className="border-2 border-teal-200 bg-teal-50">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium">
                                            {lang === "en" ? "Store Preview" : "معاينة المتجر"}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-muted-foreground">
                                                        {lang === "en" ? "Store Name:" : "اسم المتجر:"}
                                                    </span>
                                                    <div className="font-medium">{form.watch("name") || "—"}</div>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">
                                                        {lang === "en" ? "Status:" : "الحالة:"}
                                                    </span>
                                                    <div className="font-medium">
                                                        {statusOptions.find(s => s.value === form.watch("status"))?.label || "—"}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">
                                                        {lang === "en" ? "City:" : "المدينة:"}
                                                    </span>
                                                    <div className="font-medium">{form.watch("city") || "—"}</div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-muted-foreground">
                                                        {lang === "en" ? "Total Gold:" : "إجمالي الذهب:"}
                                                    </span>
                                                    <div className="font-bold text-yellow-600">
                                                        {totals.totalGoldWeight.toFixed(2)}g
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">
                                                        {lang === "en" ? "Total Cash:" : "إجمالي النقد:"}
                                                    </span>
                                                    <div className="font-bold text-green-600">
                                                        ${totals.totalCash.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">
                                                        {lang === "en" ? "Exchange Rate:" : "سعر الصرف:"}
                                                    </span>
                                                    <div className="font-bold text-orange-600">
                                                        1 USD = {form.watch("exchangeRateUSDtoSYP")?.toFixed(2)} SYP
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {/* Form Actions */}
                        <div className="flex justify-between items-center pt-4 border-t">
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        const tabs = ["basic", "inventory", "prices", "settings"];
                                        const currentIndex = tabs.indexOf(activeTab);
                                        if (currentIndex > 0) {
                                            setActiveTab(tabs[currentIndex - 1]);
                                        }
                                    }}
                                    disabled={activeTab === "basic"}
                                >
                                    {lang === "en" ? "Previous" : "السابق"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        const tabs = ["basic", "inventory", "prices", "settings"];
                                        const currentIndex = tabs.indexOf(activeTab);
                                        if (currentIndex < tabs.length - 1) {
                                            setActiveTab(tabs[currentIndex + 1]);
                                        }
                                    }}
                                    disabled={activeTab === "settings"}
                                >
                                    {lang === "en" ? "Next" : "التالي"}
                                </Button>
                            </div>

                            <div className="flex gap-4">
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
                                    className="bg-teal-800 hover:bg-teal-800/80 min-w-[120px]"
                                >
                                    {isPending && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {mode === "create"
                                        ? lang === "en" ? "Create Store" : "إنشاء المتجر"
                                        : lang === "en" ? "Update Store" : "تحديث المتجر"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}