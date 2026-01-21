// components/forms/account-form.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLangStore } from "@/store/lang-store";
import { getUpdateProfileSchema, getUpdatePasswordSchema, UpdateProfileInput, UpdatePasswordInput } from "@/lib/zod";
import { useGetProfileQuery, useUpdateProfile, useUpdatePassword } from "@/hooks/use-profile";
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
import { Loader2, User, Lock, Mail, Shield, AlertCircle, CheckCircle2, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordInput } from "../inputs/password-input";


export function AccountForm() {
    const { lang } = useLangStore();
    const [activeTab, setActiveTab] = useState("profile");

    // Queries and Mutations
    const { data: profile, isLoading: isLoadingProfile } = useGetProfileQuery();
    const updateProfileMutation = useUpdateProfile();
    const updatePasswordMutation = useUpdatePassword();

    // Profile Form
    const profileForm = useForm<UpdateProfileInput>({
        resolver: zodResolver(getUpdateProfileSchema(lang)),
        defaultValues: {
            name: "",
            phoneNumber: ""
        },
    });

    // Password Form
    const passwordForm = useForm<UpdatePasswordInput>({
        resolver: zodResolver(getUpdatePasswordSchema(lang)),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    });

    // Set profile form values when profile data is loaded
    useEffect(() => {
        if (profile) {
            profileForm.reset({
                name: profile.name || "",
                phoneNumber: profile.phoneNumber || "",
            });
        }
    }, [profile, profileForm]);

    // Handle Profile Update
    const onProfileSubmit = async (data: UpdateProfileInput) => {
        try {
            await updateProfileMutation.mutateAsync(data);
            toast.success(
                lang === "en"
                    ? "Profile updated successfully"
                    : "تم تحديث الملف الشخصي بنجاح"
            );
        } catch (error: any) {
            toast.error(
                error?.message ||
                (lang === "en"
                    ? "Failed to update profile"
                    : "فشل في تحديث الملف الشخصي")
            );
        }
    };

    // Handle Password Update
    const onPasswordSubmit = async (data: UpdatePasswordInput) => {
        try {
            await updatePasswordMutation.mutateAsync({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            // Reset the form
            passwordForm.reset({
                currentPassword: "",
                newPassword: "",
            });

            toast.success(
                lang === "en"
                    ? "Password updated successfully"
                    : "تم تحديث كلمة المرور بنجاح"
            );
        } catch (error: any) {
            toast.error(
                error?.message ||
                (lang === "en"
                    ? "Failed to update password"
                    : "فشل في تحديث كلمة المرور")
            );
        }
    };

    // Loading State
    if (isLoadingProfile) {
        return (
            <Card className="border-none shadow-none">
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!profile) {
        return (
            <Card className="border-none shadow-none">
                <CardContent className="py-8">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {lang === "en"
                                ? "Failed to load profile information"
                                : "فشل في تحميل معلومات الملف الشخصي"}
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <Card className="border-none shadow-none bg-gradient-to-br from-teal-50 to-blue-50">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-teal-700 flex items-center justify-center">
                            <User className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl text-teal-900">
                                {profile.name || profile.email}
                            </CardTitle>
                            <CardDescription className="text-teal-700">
                                {profile.email}
                            </CardDescription>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                                    <Shield className="h-3 w-3 mr-1" />
                                    {profile.role}
                                </Badge>
                                <Badge variant="outline" className="text-gray-600">
                                    {lang === "en"
                                        ? `Joined ${new Date(profile.createdAt).toLocaleDateString()}`
                                        : `انضم ${new Date(profile.createdAt).toLocaleDateString('ar-EG')}`}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <pre>
                {JSON.stringify(profileForm.formState.errors, null, 2)}
            </pre>
            {/* Tabs for Profile and Password */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir={lang === "ar" ? "rtl" : "ltr"}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {lang === "en" ? "Profile Information" : "معلومات الملف الشخصي"}
                    </TabsTrigger>
                    <TabsTrigger value="password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        {lang === "en" ? "Change Password" : "تغيير كلمة المرور"}
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {lang === "en" ? "Update Profile" : "تحديث الملف الشخصي"}
                            </CardTitle>
                            <CardDescription>
                                {lang === "en"
                                    ? "Update your account information"
                                    : "تحديث معلومات حسابك"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...profileForm}>
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                                    {/* Account Information Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-teal-700" />
                                            <h3 className="text-lg font-semibold text-teal-900">
                                                {lang === "en" ? "Account Information" : "معلومات الحساب"}
                                            </h3>
                                        </div>
                                        <Separator className="bg-teal-100" />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Email (Read-only) */}
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-gray-500" />
                                                    {lang === "en" ? "Email Address" : "البريد الإلكتروني"}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        value={profile.email}
                                                        disabled
                                                        className="bg-gray-50 cursor-not-allowed"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {lang === "en"
                                                        ? "Email cannot be changed"
                                                        : "لا يمكن تغيير البريد الإلكتروني"}
                                                </FormDescription>
                                            </FormItem>

                                            {/* Phone number */}
                                            <FormField
                                                control={profileForm.control}
                                                name="phoneNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2">
                                                            <Phone className="h-4 w-4 text-teal-600" />
                                                            {lang === "en" ? "Phone Number" : "رقم الجوال"}
                                                            <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder={lang === "en" ? "Enter your phone number" : "ادخل رقم الجوال"}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            {lang === "en" ? "Your phone number" : "رقم الجوال الخاص بك"}
                                                        </FormDescription>
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Name */}
                                            <FormField
                                                control={profileForm.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2">
                                                            <User className="h-4 w-4 text-teal-600" />
                                                            {lang === "en" ? "Full Name" : "الاسم الكامل"}
                                                            <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder={lang === "en" ? "Enter your name" : "أدخل اسمك"}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            {lang === "en"
                                                                ? "This name will be displayed throughout the application"
                                                                : "سيتم عرض هذا الاسم في جميع أنحاء التطبيق"}
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Role (Read-only) */}
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4 text-gray-500" />
                                                    {lang === "en" ? "Role" : "الدور"}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        value={profile.role}
                                                        disabled
                                                        className="bg-gray-50 cursor-not-allowed"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {lang === "en"
                                                        ? "Role is assigned by administrators"
                                                        : "يتم تعيين الدور من قبل المسؤولين"}
                                                </FormDescription>
                                            </FormItem>

                                            {/* Account Created */}
                                            <FormItem>
                                                <FormLabel>
                                                    {lang === "en" ? "Member Since" : "عضو منذ"}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        value={new Date(profile.createdAt).toLocaleDateString(
                                                            lang === "en" ? "en-US" : "ar-EG",
                                                            { year: "numeric", month: "long", day: "numeric" }
                                                        )}
                                                        disabled
                                                        className="bg-gray-50 cursor-not-allowed"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        </div>
                                    </div>

                                    {/* Stores Information */}
                                    {profile.stores && profile.stores.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-teal-700" />
                                                <h3 className="text-lg font-semibold text-teal-900">
                                                    {lang === "en" ? "Your Stores" : "متاجرك"}
                                                </h3>
                                                <Badge variant="secondary">
                                                    {profile.stores.length}
                                                </Badge>
                                            </div>
                                            <Separator className="bg-teal-100" />

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {profile.stores.map((store) => (
                                                    <div
                                                        key={store.id}
                                                        className="bg-white p-4 rounded-lg border-2 border-teal-100 shadow-sm hover:shadow-md transition-shadow"
                                                    >
                                                        <h4 className="font-semibold text-teal-900 mb-2">
                                                            {store.name}
                                                        </h4>
                                                        <p className="text-xs text-gray-600">
                                                            {lang === "en"
                                                                ? `Created ${new Date(store.createdAt).toLocaleDateString()}`
                                                                : `تم الإنشاء ${new Date(store.createdAt).toLocaleDateString('ar-EG')}`}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => profileForm.reset()}
                                            disabled={updateProfileMutation.isPending}
                                            className="min-w-[120px]"
                                        >
                                            {lang === "en" ? "Reset" : "إعادة تعيين"}
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={updateProfileMutation.isPending || !profileForm.formState.isDirty}
                                            className="bg-teal-700 hover:bg-teal-800 min-w-[120px] shadow-lg"
                                        >
                                            {updateProfileMutation.isPending && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            {lang === "en" ? "Update Profile" : "تحديث الملف الشخصي"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Password Tab */}
                <TabsContent value="password">
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {lang === "en" ? "Change Password" : "تغيير كلمة المرور"}
                            </CardTitle>
                            <CardDescription>
                                {lang === "en"
                                    ? "Update your password to keep your account secure"
                                    : "قم بتحديث كلمة المرور الخاصة بك للحفاظ على أمان حسابك"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                                    {/* Security Alert */}
                                    <Alert className="bg-amber-50 border-amber-200">
                                        <AlertCircle className="h-4 w-4 text-amber-600" />
                                        <AlertDescription className="text-amber-700">
                                            {lang === "en"
                                                ? "Choose a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters."
                                                : "اختر كلمة مرور قوية تحتوي على 8 أحرف على الأقل، بما في ذلك الأحرف الكبيرة والصغيرة والأرقام والأحرف الخاصة."}
                                        </AlertDescription>
                                    </Alert>

                                    {/* Password Fields Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Lock className="h-5 w-5 text-teal-700" />
                                            <h3 className="text-lg font-semibold text-teal-900">
                                                {lang === "en" ? "Password Information" : "معلومات كلمة المرور"}
                                            </h3>
                                        </div>
                                        <Separator className="bg-teal-100" />

                                        <div className="space-y-6">
                                            {/* Current Password */}
                                            <FormField
                                                control={passwordForm.control}
                                                name="currentPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2">
                                                            <Lock className="h-4 w-4 text-gray-600" />
                                                            {lang === "en" ? "Current Password" : "كلمة المرور الحالية"}
                                                            <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <PasswordInput
                                                                placeholder={lang === "en" ? "Enter current password" : "أدخل كلمة المرور الحالية"}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            {lang === "en"
                                                                ? "Enter your current password to verify your identity"
                                                                : "أدخل كلمة المرور الحالية للتحقق من هويتك"}
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* New Password */}
                                            <FormField
                                                control={passwordForm.control}
                                                name="newPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="flex items-center gap-2">
                                                            <Lock className="h-4 w-4 text-teal-600" />
                                                            {lang === "en" ? "New Password" : "كلمة المرور الجديدة"}
                                                            <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <PasswordInput
                                                                placeholder={lang === "en" ? "Enter new password" : "أدخل كلمة المرور الجديدة"}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            {lang === "en"
                                                                ? "Must be at least 8 characters long"
                                                                : "يجب أن تكون 8 أحرف على الأقل"}
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {passwordForm.watch("newPassword") && (
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                            <h4 className="text-sm font-semibold text-blue-900 mb-2">
                                                {lang === "en" ? "Password Strength:" : "قوة كلمة المرور:"}
                                            </h4>
                                            <div className="space-y-2 text-xs">
                                                {[
                                                    {
                                                        check: passwordForm.watch("newPassword").length >= 8,
                                                        text: lang === "en" ? "At least 8 characters" : "8 أحرف على الأقل"
                                                    },
                                                    {
                                                        check: /[A-Z]/.test(passwordForm.watch("newPassword")),
                                                        text: lang === "en" ? "Contains uppercase letter" : "يحتوي على حرف كبير"
                                                    },
                                                    {
                                                        check: /[a-z]/.test(passwordForm.watch("newPassword")),
                                                        text: lang === "en" ? "Contains lowercase letter" : "يحتوي على حرف صغير"
                                                    },
                                                    {
                                                        check: /[0-9]/.test(passwordForm.watch("newPassword")),
                                                        text: lang === "en" ? "Contains number" : "يحتوي على رقم"
                                                    },
                                                    {
                                                        check: /[^A-Za-z0-9]/.test(passwordForm.watch("newPassword")),
                                                        text: lang === "en" ? "Contains special character" : "يحتوي على حرف خاص"
                                                    },
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        {item.check ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                        ) : (
                                                            <AlertCircle className="h-4 w-4 text-gray-400" />
                                                        )}
                                                        <span className={item.check ? "text-green-700" : "text-gray-600"}>
                                                            {item.text}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => passwordForm.reset()}
                                            disabled={updatePasswordMutation.isPending}
                                            className="min-w-[120px]"
                                        >
                                            {lang === "en" ? "Reset" : "إعادة تعيين"}
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={updatePasswordMutation.isPending || !passwordForm.formState.isDirty}
                                            className="bg-teal-700 hover:bg-teal-800 min-w-[120px] shadow-lg"
                                        >
                                            {updatePasswordMutation.isPending && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            {lang === "en" ? "Update Password" : "تحديث كلمة المرور"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}