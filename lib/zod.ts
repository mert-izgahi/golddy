// lib/zod.ts
import { z } from "zod";
import { CurrencyType, GoldType, PaymentType, Role, StockType, } from "./generated/prisma";
import dayjs from "dayjs";

// ✅ Sign-in schema
export const getSignInSchema = (lang: "en" | "ar") => {
    const emailMessage =
        lang === "en"
            ? "Invalid email address"
            : "عنوان البريد الإلكتروني غير صالح";
    const passwordMessage =
        lang === "en"
            ? "Password must be at least 6 characters long"
            : "يجب أن يكون طول كلمة المرور 6 أحرف على الأقل";

    return z.object({
        email: z.string().email(emailMessage),
        password: z.string().min(6, passwordMessage),
    });
};

// ✅ Create Sale schema
export const getCreateSaleSchema = (lang: "en" | "ar") => {
    const requiredMessage =
        lang === "en" ? "This field is required" : "هذا الحقل مطلوب";
    const positiveMessage =
        lang === "en" ? "Must be greater than 0" : "يجب أن يكون أكبر من 0";
    const invalidGoldType =
        lang === "en" ? "Invalid gold type" : "نوع الذهب غير صالح";
    const invalidCurrency =
        lang === "en" ? "Invalid currency" : "العملة غير صالحة";
    const invalidPaymentType =
        lang === "en" ? "Invalid payment type" : "طريقة الدفع غير صالحة";

    return z.object({
        weight: z
            .number(requiredMessage)
            .positive(positiveMessage),

        goldType: z
            .enum(GoldType, requiredMessage)
            .refine((val) => Object.values(GoldType).includes(val), {
                message: invalidGoldType,
            }),

        pricePerGram: z
            .number(requiredMessage)
            .positive(positiveMessage),

        total: z
            .number(requiredMessage)
            .positive(positiveMessage),

        currency: z
            .enum(CurrencyType, requiredMessage)
            .refine((val) => Object.values(CurrencyType).includes(val), {
                message: invalidCurrency,
            }),

        paymentType: z
            .enum(PaymentType, requiredMessage)
            .refine((val) => Object.values(PaymentType).includes(val), {
                message: invalidPaymentType,
            }),

        customerName: z.string().optional(),
        description: z.string().optional(),
    });
};

// ✅ Update Sale schema (all optional)
export const getUpdateSaleSchema = (lang: "en" | "ar") => {
    const positiveMessage =
        lang === "en" ? "Must be greater than 0" : "يجب أن يكون أكبر من 0";
    const invalidGoldType =
        lang === "en" ? "Invalid gold type" : "نوع الذهب غير صالح";
    const invalidCurrency =
        lang === "en" ? "Invalid currency" : "العملة غير صالحة";
    const invalidPaymentType =
        lang === "en" ? "Invalid payment type" : "طريقة الدفع غير صالحة";

    return z.object({
        weight: z.number().positive(positiveMessage).optional(),

        goldType: z
            .enum(GoldType)
            .refine((val) => Object.values(GoldType).includes(val), {
                message: invalidGoldType,
            })
            .optional(),

        pricePerGram: z.number().positive(positiveMessage).optional(),
        total: z.number().positive(positiveMessage).optional(),

        currency: z
            .enum(CurrencyType)
            .refine((val) => Object.values(CurrencyType).includes(val), {
                message: invalidCurrency,
            })
            .optional(),

        paymentType: z
            .enum(PaymentType)
            .refine((val) => Object.values(PaymentType).includes(val), {
                message: invalidPaymentType,
            })
            .optional(),

        customerName: z.string().optional(),
        description: z.string().optional(),
    });
};


// ✅ Create Stock schema
export const getCreateStockSchema = (lang: "en" | "ar") => {
    const requiredMessage =
        lang === "en" ? "This field is required" : "هذا الحقل مطلوب";
    const positiveMessage =
        lang === "en" ? "Must be greater than 0" : "يجب أن يكون أكبر من 0";
    const invalidGoldType =
        lang === "en" ? "Invalid gold type" : "نوع الذهب غير صالح";
    const invalidStockType =
        lang === "en" ? "Invalid stock type" : "نوع حركة المخزون غير صالح";

    return z.object({
        date: z.coerce.date().optional(),
        quantity: z
            .number(requiredMessage)
            .positive(positiveMessage),
        goldType: z
            .enum(GoldType, requiredMessage)
            .refine((val) => Object.values(GoldType).includes(val), {
                message: invalidGoldType,
            }),
        type: z
            .enum(StockType, requiredMessage)
            .refine((val) => Object.values(StockType).includes(val), {
                message: invalidStockType,
            }),
        note: z.string().optional(),
    });
};

// ✅ Update Stock schema (all optional)
export const getUpdateStockSchema = (lang: "en" | "ar") => {
    const positiveMessage =
        lang === "en" ? "Must be greater than 0" : "يجب أن يكون أكبر من 0";
    const invalidGoldType =
        lang === "en" ? "Invalid gold type" : "نوع الذهب غير صالح";
    const invalidStockType =
        lang === "en" ? "Invalid stock type" : "نوع حركة المخزون غير صالح";

    return z.object({
        date: z.coerce.date().optional(),
        quantity: z.number().positive(positiveMessage).optional(),
        goldType: z
            .enum(GoldType)
            .refine((val) => Object.values(GoldType).includes(val), {
                message: invalidGoldType,
            })
            .optional(),
        type: z
            .enum(StockType)
            .refine((val) => Object.values(StockType).includes(val), {
                message: invalidStockType,
            })
            .optional(),
        note: z.string().optional(),
    });
};

// ✅ Create Settings schema
export const getUpdateSettingsSchema = (lang: "en" | "ar") => {
    const requiredMessage =
        lang === "en" ? "This field is required" : "هذا الحقل مطلوب";
    const positiveMessage =
        lang === "en" ? "Must be greater than or equal to 0" : "يجب أن يكون أكبر من أو يساوي 0";

    return z.object({
        priceGold14USD: z
            .number(requiredMessage)
            .min(0, positiveMessage),

        priceGold18USD: z
            .number(requiredMessage)
            .min(0, positiveMessage),

        priceGold21USD: z
            .number(requiredMessage)
            .min(0, positiveMessage),

        priceGold24USD: z
            .number(requiredMessage)
            .min(0, positiveMessage),

        priceGold14SYP: z
            .number(requiredMessage)
            .min(0, positiveMessage),

        priceGold18SYP: z
            .number(requiredMessage)
            .min(0, positiveMessage),

        priceGold21SYP: z
            .number(requiredMessage)
            .min(0, positiveMessage),

        priceGold24SYP: z
            .number(requiredMessage)
            .min(0, positiveMessage),

        exchangeRateUSDtoSYP: z
            .number(requiredMessage)
            .min(0, positiveMessage),
    });
};


export const getUserSchema = (lang: "en" | "ar") => {
    const requiredMessage =
        lang === "en" ? "This field is required" : "هذا الحقل مطلوب";
    const invalidEmailMessage =
        lang === "en" ? "Invalid email address" : "عنوان البريد الإلكتروني غير صالح";
    const shortPasswordMessage =
        lang === "en"
            ? "Password must be at least 6 characters"
            : "يجب أن تكون كلمة المرور 6 أحرف على الأقل";

    return z.object({
        email: z
            .email(invalidEmailMessage),

        password: z
            .string(requiredMessage)
            .min(6, shortPasswordMessage)
            .optional(), // Make password optional for updates

        name: z
            .string()
            .min(2, lang === "en" ? "Name is too short" : "الاسم قصير جدًا")
            .optional(),

        phoneNumber: z
            .string()
            .regex(/^\+?[0-9]{8,15}$/, {
                message:
                    lang === "en"
                        ? "Invalid phone number"
                        : "رقم الهاتف غير صالح",
            })
            .optional()
            .or(z.literal("")), // Allow empty string

        role: z
            .enum(Role, lang === "en" ? "Role is required" : "الدور مطلوب")
    });
};

// ✅ Export inferred types
export type SignInInput = z.infer<ReturnType<typeof getSignInSchema>>;
export type CreateSaleInput = z.infer<ReturnType<typeof getCreateSaleSchema>>;
export type UpdateSaleInput = z.infer<ReturnType<typeof getUpdateSaleSchema>>;
export type CreateStockInput = z.infer<ReturnType<typeof getCreateStockSchema>>;
export type UpdateStockInput = z.infer<ReturnType<typeof getUpdateStockSchema>>;
export type UpdateSettingsInput = z.infer<ReturnType<typeof getUpdateSettingsSchema>>;
export type UserInput = z.infer<ReturnType<typeof getUserSchema>>;
