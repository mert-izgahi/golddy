// lib/zod.ts
import { z } from "zod";
import { CurrencyType, GoldType, PaymentType, Role, StockType, StoreStatus } from "./generated/prisma";


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
// export const getCreateSaleSchema = (lang: "en" | "ar") => {
//     const requiredMessage =
//         lang === "en" ? "This field is required" : "هذا الحقل مطلوب";
//     const positiveMessage =
//         lang === "en" ? "Must be greater than 0" : "يجب أن يكون أكبر من 0";
//     const invalidGoldType =
//         lang === "en" ? "Invalid gold type" : "نوع الذهب غير صالح";
//     const invalidCurrency =
//         lang === "en" ? "Invalid currency" : "العملة غير صالحة";
//     const invalidPaymentType =
//         lang === "en" ? "Invalid payment type" : "طريقة الدفع غير صالحة";

//     return z.object({
//         weight: z
//             .number(requiredMessage)
//             .positive(positiveMessage),

//         goldType: z
//             .enum(GoldType, requiredMessage)
//             .refine((val) => Object.values(GoldType).includes(val), {
//                 message: invalidGoldType,
//             }),

//         pricePerGram: z
//             .number(requiredMessage)
//             .positive(positiveMessage),

//         total: z
//             .number(requiredMessage)
//             .positive(positiveMessage),

//         currency: z
//             .enum(CurrencyType, requiredMessage)
//             .refine((val) => Object.values(CurrencyType).includes(val), {
//                 message: invalidCurrency,
//             }),

//         paymentType: z
//             .enum(PaymentType, requiredMessage)
//             .refine((val) => Object.values(PaymentType).includes(val), {
//                 message: invalidPaymentType,
//             }),

//         customerName: z.string().optional(),
//         description: z.string().optional(),
//     });
// };

// ✅ Update Sale schema (all optional)
// export const getUpdateSaleSchema = (lang: "en" | "ar") => {
//     const positiveMessage =
//         lang === "en" ? "Must be greater than 0" : "يجب أن يكون أكبر من 0";
//     const invalidGoldType =
//         lang === "en" ? "Invalid gold type" : "نوع الذهب غير صالح";
//     const invalidCurrency =
//         lang === "en" ? "Invalid currency" : "العملة غير صالحة";
//     const invalidPaymentType =
//         lang === "en" ? "Invalid payment type" : "طريقة الدفع غير صالحة";

//     return z.object({
//         weight: z.number().positive(positiveMessage).optional(),

//         goldType: z
//             .enum(GoldType)
//             .refine((val) => Object.values(GoldType).includes(val), {
//                 message: invalidGoldType,
//             })
//             .optional(),

//         pricePerGram: z.number().positive(positiveMessage).optional(),
//         total: z.number().positive(positiveMessage).optional(),

//         currency: z
//             .enum(CurrencyType)
//             .refine((val) => Object.values(CurrencyType).includes(val), {
//                 message: invalidCurrency,
//             })
//             .optional(),

//         paymentType: z
//             .enum(PaymentType)
//             .refine((val) => Object.values(PaymentType).includes(val), {
//                 message: invalidPaymentType,
//             })
//             .optional(),

//         customerName: z.string().optional(),
//         description: z.string().optional(),
//     });
// };

// ✅ Create Sale schema (updated for your Prisma model)
export const getCreateSaleSchema = (lang: "en" | "ar") => {
    const requiredMessage =
        lang === "en" ? "This field is required" : "هذا الحقل مطلوب";
    const positiveMessage =
        lang === "en" ? "Must be greater than 0" : "يجب أن يكون أكبر من 0";

    return z.object({
        weight: z
            .number(requiredMessage)
            .positive(positiveMessage),

        goldType: z
            .enum(GoldType),

        pricePerGramUSD: z
            .number(requiredMessage)
            .positive(positiveMessage),

        pricePerGramSYP: z
            .number(requiredMessage)
            .positive(positiveMessage),

        totalUSD: z
            .number(requiredMessage)
            .positive(positiveMessage),

        totalSYP: z
            .number(requiredMessage)
            .positive(positiveMessage),

        currency: z
            .enum(CurrencyType),

        paymentType: z
            .enum(PaymentType),

        amountPaid: z
            .number(requiredMessage)
            .positive(positiveMessage),

        profitUSD: z
            .number(requiredMessage)
            .positive(positiveMessage),

        profitSYP: z
            .number(requiredMessage)
            .positive(positiveMessage),

        customerName: z.string().optional(),
        customerPhone: z.string().optional(),
        description: z.string().optional(),
    });
};
// ✅ Update Sale schema
export const getUpdateSaleSchema = (lang: "en" | "ar") => {
    const schema = getCreateSaleSchema(lang).partial();
    return schema;
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


export const getStoreSchema = (lang: "en" | "ar") => {

    return z.object({
        name: z
            .string()
            .min(2, lang === "en" ? "Store name is too short" : "اسم المتجر قصير جدًا")
            .max(100, lang === "en" ? "Store name is too long" : "اسم المتجر طويل جدًا"),

        address: z
            .string(),

        city: z
            .string(),

        logoUrl: z
            .url(lang === "en" ? "Invalid URL" : "رابط غير صالح"),

        primaryPhoneNumber: z
            .string()
            .regex(/^\+?[0-9]{8,15}$/, {
                message:
                    lang === "en"
                        ? "Invalid phone number"
                        : "رقم الهاتف غير صالح",
            }),

        secondaryPhoneNumber: z
            .string()
            .regex(/^\+?[0-9]{8,15}$/, {
                message:
                    lang === "en"
                        ? "Invalid phone number"
                        : "رقم الهاتف غير صالح",
            }),

        status: z
            .enum(Object.values(StoreStatus)),

        // Initial inventory values
        currentGold14: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        currentGold18: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        currentGold21: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        currentGold24: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        // Initial cash balances
        currentUSD: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        currentSYP: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        // Gold prices in USD
        priceGold14USD: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        priceGold18USD: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        priceGold21USD: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        priceGold24USD: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),

        // Exchange rate
        exchangeRateUSDtoSYP: z
            .number()
            .min(0, lang === "en" ? "Value cannot be negative" : "القيمة لا يمكن أن تكون سالبة"),
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
export type StoreInput = z.infer<ReturnType<typeof getStoreSchema>>;
