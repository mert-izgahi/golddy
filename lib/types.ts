import type { Role, Store, User } from "../lib/generated/prisma"

export type ContextUser = Pick<User, "id" | "email" | "role">

export type UserWithStores = User & {
    stores: Store[]
}

export interface CurrentPrices {
  [key: string]: number;
  priceGold14USD: number;
  priceGold18USD: number;
  priceGold21USD: number;
  priceGold24USD: number;
  exchangeRateUSDtoSYP: number;
}

export interface StoreInventory {
  currentGold14: number;
  currentGold18: number;
  currentGold21: number;
  currentGold24: number;
}

export type ApiResponse<T> = {
    result: T;
}

export type ApiResponseWithPagination<T> = {
    result: T[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
        hasNext: boolean,
        hasPrevious: boolean
    },
}

export interface QueryParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface InvoiceData {
  sale: {
    id: string;
    invoiceNumber: string;
    createdAt: string;
    weight: number;
    goldType: string;
    pricePerGramUSD: number;
    pricePerGramSYP: number;
    totalUSD: number;
    totalSYP: number;
    profitUSD: number;
    profitSYP: number;
    currency: string;
    paymentType: string;
    amountPaid: number;
    customerName: string;
    customerPhone: string;
    description: string;
    store: {
      name: string;
      address: string;
      city: string;
      primaryPhoneNumber: string;
      exchangeRateUSDtoSYP: number;
    };
  };
  lang?: 'en' | 'ar';
}