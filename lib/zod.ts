import { z } from "zod";
import { CurrencyType, GoldType, PaymentType } from "./generated/prisma";

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
            .nativeEnum(GoldType, requiredMessage)
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
            .nativeEnum(CurrencyType, requiredMessage)
            .refine((val) => Object.values(CurrencyType).includes(val), {
                message: invalidCurrency,
            }),

        paymentType: z
            .nativeEnum(PaymentType, requiredMessage)
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
            .nativeEnum(GoldType)
            .refine((val) => Object.values(GoldType).includes(val), {
                message: invalidGoldType,
            })
            .optional(),

        pricePerGram: z.number().positive(positiveMessage).optional(),
        total: z.number().positive(positiveMessage).optional(),

        currency: z
            .nativeEnum(CurrencyType)
            .refine((val) => Object.values(CurrencyType).includes(val), {
                message: invalidCurrency,
            })
            .optional(),

        paymentType: z
            .nativeEnum(PaymentType)
            .refine((val) => Object.values(PaymentType).includes(val), {
                message: invalidPaymentType,
            })
            .optional(),

        customerName: z.string().optional(),
        description: z.string().optional(),
    });
};

// ✅ Export inferred types
export type CreateSaleInput = z.infer<ReturnType<typeof getCreateSaleSchema>>;
export type UpdateSaleInput = z.infer<ReturnType<typeof getUpdateSaleSchema>>;
