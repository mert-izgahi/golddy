"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getUpdateSettingsSchema, UpdateSettingsInput } from "@/lib/zod";
import { useSettings } from "@/hooks/use-settings";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function AdminSettingsForm() {
    const { lang } = useLangStore();
    const { settings, isLoadingSettings, updateSettings, isUpdatingSettings } = useSettings();
    const schema = getUpdateSettingsSchema(lang);

    const form = useForm<UpdateSettingsInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            priceGold14USD: 0,
            priceGold18USD: 0,
            priceGold21USD: 0,
            priceGold24USD: 0,
            priceGold14SYP: 0,
            priceGold18SYP: 0,
            priceGold21SYP: 0,
            priceGold24SYP: 0,
            exchangeRateUSDtoSYP: 0,
        },
    });

    // ✅ Populate form with loaded settings
    useEffect(() => {
        if (settings) {
            form.reset({
                ...settings,
            });
        }
    }, [settings, form]);

    // ✅ Use `useWatch` instead of `form.watch()` array
    const exchangeRate = useWatch({ control: form.control, name: "exchangeRateUSDtoSYP" });
    const priceGold14USD = useWatch({ control: form.control, name: "priceGold14USD" });
    const priceGold18USD = useWatch({ control: form.control, name: "priceGold18USD" });
    const priceGold21USD = useWatch({ control: form.control, name: "priceGold21USD" });
    const priceGold24USD = useWatch({ control: form.control, name: "priceGold24USD" });

    const priceGold14SYP = useWatch({ control: form.control, name: "priceGold14SYP" });
    const priceGold18SYP = useWatch({ control: form.control, name: "priceGold18SYP" });
    const priceGold21SYP = useWatch({ control: form.control, name: "priceGold21SYP" });
    const priceGold24SYP = useWatch({ control: form.control, name: "priceGold24SYP" });

    // ✅ Calculate SYP when USD or exchange rate changes
    useEffect(() => {
        if (exchangeRate && exchangeRate > 0) {
            form.setValue("priceGold14SYP", +(priceGold14USD * exchangeRate).toFixed(2), { shouldDirty: false });
            form.setValue("priceGold18SYP", +(priceGold18USD * exchangeRate).toFixed(2), { shouldDirty: false });
            form.setValue("priceGold21SYP", +(priceGold21USD * exchangeRate).toFixed(2), { shouldDirty: false });
            form.setValue("priceGold24SYP", +(priceGold24USD * exchangeRate).toFixed(2), { shouldDirty: false });
        }
    }, [exchangeRate, priceGold14USD, priceGold18USD, priceGold21USD, priceGold24USD, form]);

    // ✅ Calculate USD when SYP manually edited
    useEffect(() => {
        const isManualEdit =
            form.formState.dirtyFields.priceGold14SYP ||
            form.formState.dirtyFields.priceGold18SYP ||
            form.formState.dirtyFields.priceGold21SYP ||
            form.formState.dirtyFields.priceGold24SYP;

        if (exchangeRate && exchangeRate > 0 && isManualEdit) {
            form.setValue("priceGold14USD", +(priceGold14SYP / exchangeRate).toFixed(2), { shouldDirty: false });
            form.setValue("priceGold18USD", +(priceGold18SYP / exchangeRate).toFixed(2), { shouldDirty: false });
            form.setValue("priceGold21USD", +(priceGold21SYP / exchangeRate).toFixed(2), { shouldDirty: false });
            form.setValue("priceGold24USD", +(priceGold24SYP / exchangeRate).toFixed(2), { shouldDirty: false });
        }
    }, [priceGold14SYP, priceGold18SYP, priceGold21SYP, priceGold24SYP, exchangeRate, form]);

    const onSubmit = async (data: UpdateSettingsInput) => {
        try {
            if (!settings?.id) throw new Error(lang === "en" ? "Settings not found" : "الإعدادات غير موجودة");

            await updateSettings({ id: settings.id, args: data });
            toast.success(lang === "en" ? "Settings updated successfully" : "تم تحديث الإعدادات بنجاح");
            form.reset(data);
        } catch (error: any) {
            toast.error(error?.message || (lang === "en" ? "Failed to update settings" : "فشل في تحديث الإعدادات"));
        }
    };

    if (isLoadingSettings) return <p>Loading...</p>;

    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>{lang === "en" ? "System Settings" : "إعدادات النظام"}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="exchangeRateUSDtoSYP"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{lang === "en" ? "Exchange Rate" : "سعر الصرف"}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {["14", "18", "21", "24"].map((k) => (
                                <FormField
                                    key={k}
                                    control={form.control}
                                    name={`priceGold${k}USD` as keyof UpdateSettingsInput}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{k}K (USD)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => form.reset()}
                                disabled={isUpdatingSettings || !form.formState.isDirty}
                            >
                                {lang === "en" ? "Reset" : "إعادة التعيين"}
                            </Button>
                            <Button
                                type="submit"
                                disabled={isUpdatingSettings || !form.formState.isDirty}
                                className="bg-teal-700 text-white"
                            >
                                {isUpdatingSettings && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {lang === "en" ? "Update" : "تحديث"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default AdminSettingsForm;
