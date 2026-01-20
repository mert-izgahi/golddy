import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en"; // optional, default is en

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getPaymentTypeLabel = (paymentType: string, lang: "en" | "ar") => {
  const labels = {
    CASH: lang === "en" ? "Cash" : "نقدي",
    TRANSFER: lang === "en" ? "Transfer" : "تحويل شام كاش",
    OTHER: lang === "en" ? "Other" : "أخرى"
  };
  return labels[paymentType as keyof typeof labels] || paymentType;
};

// ✅ Format date based on language
export const formatDate = (
  date: string | Date,
  lang: "en" | "ar" = "en",
  formatType: "short" | "long" = "short"
) => {
  const d = dayjs(date).locale(lang === "ar" ? "ar" : "en");

  if (formatType === "long") {
    // Example: 9 يناير 2026 / Jan 9, 2026
    return lang === "ar"
      ? d.format("D MMMM YYYY")
      : d.format("MMM D, YYYY");
  }

  // Example: 09/01/2026 or ٩‏/١‏/٢٠٢٦
  return lang === "ar" ? d.format("DD/MM/YYYY") : d.format("MM/DD/YYYY");
};
export const formatCurrency = (
  amount: number,
  currency: string,
  lang: "en" | "ar" = "en"
) => {
  const formatter = new Intl.NumberFormat(lang === "ar" ? "ar-SY" : "en-US", {
    style: "currency",
    currency,
    currencyDisplay: "code",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let formatted = formatter.format(amount);

  if (lang === "ar") {
    // Move currency code/symbol to the start (e.g. "ل.س ٨١")
    // and clean unnecessary RTL marks
    formatted = formatted
      .replace(/\s?([A-Z]{2,3}\$?|\u200F|\u202B|\u202C)/g, "") // remove misplaced marks
      .trim();

    // Convert again to show code first
    formatted = `${currency} ${new Intl.NumberFormat("ar-SY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)}`;
  }

  return formatted;
};



/**
 * Get gold type label in the specified language
 */
export function getGoldTypeLabel(lang: "en" | "ar", goldType: string): string {
  const labels = {
    en: {
      GOLD_14: "14K Gold",
      GOLD_18: "18K Gold",
      GOLD_21: "21K Gold",
      GOLD_24: "24K Gold",
    },
    ar: {
      GOLD_14: "ذهب عيار ١٤",
      GOLD_18: "ذهب عيار ١٨",
      GOLD_21: "ذهب عيار ٢١",
      GOLD_24: "ذهب عيار ٢٤",
    }
  };

  return labels[lang][goldType as keyof typeof labels.en] || goldType;
}

/**
 * Get stock type label in the specified language
 */
export function getStockTypeLabel(lang: "en" | "ar", stockType: string): string {
  const labels = {
    en: {
      ADD: "Addition",
      REMOVE: "Removal",
    },
    ar: {
      ADD: "إضافة",
      REMOVE: "سحب",
    }
  };

  return labels[lang][stockType as keyof typeof labels.en] || stockType;
}

/**
 * Format quantity with + or - prefix based on stock type
 */
export function formatStockQuantity(quantity: number, type: "ADD" | "REMOVE"): string {
  const prefix = type === "ADD" ? "+" : "-";
  return `${prefix}${quantity.toFixed(2)}g`;
}

/**
 * Calculate total stock value across all gold types
 */
export function calculateTotalStockValue(currentStock: Record<string, number>): number {
  return Object.values(currentStock).reduce((total, quantity) => total + quantity, 0);
}

/**
 * Get color class for stock type
 */
export function getStockTypeColorClass(type: "ADD" | "REMOVE"): string {
  return type === "ADD" ? "text-green-600" : "text-red-600";
}

/**
 * Get background color class for stock type
 */
export function getStockTypeBgColorClass(type: "ADD" | "REMOVE"): string {
  return type === "ADD" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200";
}