// lib/zod/stock.schemas.ts
import { z } from "zod";
import { GoldType, StockType } from "@/lib/generated/prisma";

// Base stock schema with all fields
const baseStockSchema = z.object({
    goldType: z.enum(GoldType, "Gold type is required"),
    quantity: z.number("Quantity is required").positive("Quantity must be greater than 0"),
    type: z.enum(StockType, "Stock type is required"),
    costPerGramUSD: z.number().optional().nullable(),
    totalCostUSD: z.number().optional().nullable(),
    totalCostSYP: z.number().optional().nullable(),
    supplier: z.string().optional().nullable(),
    invoiceRef: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    balanceAfter:z.number().optional().nullable()
});

// Create stock schema (for POST requests)
export const createStockSchema = baseStockSchema;

// Update stock schema (for PUT requests) - all fields optional
export const updateStockSchema = baseStockSchema.partial();

// Create stock schema with language support
export const getCreateStockSchema = (lang: "en" | "ar") => {
    const messages = {
        en: {
            goldTypeRequired: "Gold type is required",
            goldTypeInvalid: "Invalid gold type",
            quantityRequired: "Quantity is required",
            quantityInvalid: "Quantity must be a number",
            quantityPositive: "Quantity must be greater than 0",
            typeRequired: "Stock type is required",
            typeInvalid: "Invalid stock type",
        },
        ar: {
            goldTypeRequired: "نوع الذهب مطلوب",
            goldTypeInvalid: "نوع الذهب غير صالح",
            quantityRequired: "الكمية مطلوبة",
            quantityInvalid: "يجب أن تكون الكمية رقمًا",
            quantityPositive: "يجب أن تكون الكمية أكبر من 0",
            typeRequired: "نوع الحركة مطلوب",
            typeInvalid: "نوع الحركة غير صالح",
        },
    };

    const m = messages[lang];

    return z.object({
        goldType: z.enum(GoldType, m.goldTypeRequired),
        quantity: z.number(m.quantityRequired).positive(m.quantityPositive),
        type: z.enum(StockType, m.typeRequired),
        costPerGramUSD: z.number().optional().nullable(),
        totalCostUSD: z.number().optional().nullable(),
        totalCostSYP: z.number().optional().nullable(),
        supplier: z.string().optional().nullable(),
        invoiceRef: z.string().optional().nullable(),
        note: z.string().optional().nullable(),
        
    });
};

// Update stock schema with language support
export const getUpdateStockSchema = (lang: "en" | "ar") => {
    return getCreateStockSchema(lang).partial();
};

// Type exports
export type CreateStockInput = z.infer<typeof createStockSchema>;
export type UpdateStockInput = z.infer<typeof updateStockSchema>;