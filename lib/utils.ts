import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en"; // optional, default is en

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGoldTypeLabel = (lang: "en" | "ar", goldType: string) => {
  const labels = {
    GOLD_14: lang === "en" ? "14K" : "١٤ عيار",
    GOLD_18: lang === "en" ? "18K" : "١٨ عيار",
    GOLD_21: lang === "en" ? "21K" : "٢١ عيار",
    GOLD_24: lang === "en" ? "24K" : "٢٤ عيار",
  };
  return labels[goldType as keyof typeof labels] || goldType;
};

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
