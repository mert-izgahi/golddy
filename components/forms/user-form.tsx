// components/forms/user-form.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getUserSchema, UserInput } from "@/lib/zod";
import { useCreateUser, useUpdateUser, useGetUserById } from "@/hooks/use-users";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Role } from "@/lib/generated/prisma/client";
import { PasswordInput } from "@/components/inputs/password-input";
import { z } from "zod";

interface UserFormProps {
    mode: "create" | "edit";
    userId?: string;
}

export function UserForm({ mode, userId }: UserFormProps) {
    const { lang } = useLangStore();
    const router = useRouter();

    // Hooks for create and edit
    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();
    const { data: user, isLoading: isLoadingUser } = useGetUserById(
        mode === "edit" && userId ? userId : ""
    );

    const schema = getUserSchema(lang);
    const form = useForm<UserInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            role: Role.STORE,
        },
    });

    // Set form values when in edit mode and user data is loaded
    useEffect(() => {
        if (mode === "edit" && user) {
            form.reset({
                name: user.name || "",
                email: user.email,
                phoneNumber: user.phoneNumber || "",
                role: user.role as Role,
                // Don't set password in edit mode
            });
        }
    }, [user, form, mode]);

    const onSubmit = async (values: UserInput) => {
        try {
            if (mode === "create") {
                await createUserMutation.mutateAsync(values);
                toast.success(
                    lang === "en" ? "User created successfully" : "تم إنشاء المستخدم بنجاح"
                );
            } else {
                if (!userId) {
                    throw new Error("User ID is required for update");
                }

                // Remove password from data when updating (unless you have a separate password update flow)
                const { password, ...updateData } = values;

                await updateUserMutation.mutateAsync({
                    id: userId,
                    data: updateData
                });
                toast.success(
                    lang === "en" ? "User updated successfully" : "تم تحديث المستخدم بنجاح"
                );
            }
            router.push(`/admin/users`);
        } catch (error: any) {
            toast.error(
                error?.message ||
                (mode === "create"
                    ? lang === "en" ? "Failed to create user" : "فشل في إنشاء المستخدم"
                    : lang === "en" ? "Failed to update user" : "فشل في تحديث المستخدم")
            );
        }
    };

    const roleOptions = [
        { value: Role.STORE, label: lang === "en" ? "Store User" : "مستخدم متجر" },
        { value: Role.ADMIN, label: lang === "en" ? "Admin" : "مدير" },
    ];

    const isPending = mode === "create"
        ? createUserMutation.isPending
        : updateUserMutation.isPending;

    // Show loading state for edit mode
    if (mode === "edit" && isLoadingUser) {
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
                        ? lang === "en" ? "Create New User" : "إنشاء مستخدم جديد"
                        : lang === "en" ? "Update User" : "تحديث المستخدم"}
                </CardTitle>
                <CardDescription>
                    {mode === "create"
                        ? lang === "en"
                            ? "Fill in the details to create a new user account"
                            : "املأ التفاصيل لإنشاء حساب مستخدم جديد"
                        : lang === "en"
                            ? "Update the user details below"
                            : "تحديث تفاصيل المستخدم أدناه"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Full Name" : "الاسم الكامل"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={lang === "en" ? "Enter full name" : "أدخل الاسم الكامل"}
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Email Address" : "البريد الإلكتروني"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder={lang === "en" ? "Enter email address" : "أدخل البريد الإلكتروني"}
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone Number */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Phone Number (Optional)" : "رقم الهاتف (اختياري)"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={lang === "en" ? "Enter phone number" : "أدخل رقم الهاتف"}
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Role */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Role" : "الدور"}
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full" lang={lang}>
                                                    <SelectValue placeholder={lang === "en" ? "Select role" : "اختر الدور"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {roleOptions.map((option) => (
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

                        {/* Password - Only for create mode */}
                        {mode === "create" && (
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {lang === "en" ? "Password" : "كلمة المرور"}
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder={lang === "en" ? "Enter password" : "أدخل كلمة المرور"}
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

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
                                className="bg-teal-800 hover:bg-teal-800/80"
                            >
                                {isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {mode === "create"
                                    ? lang === "en" ? "Create User" : "إنشاء المستخدم"
                                    : lang === "en" ? "Update User" : "تحديث المستخدم"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}