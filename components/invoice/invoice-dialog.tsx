// components/invoice/invoice-dialog.tsx - UPDATED VERSION WITH PROFIT
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Download, Printer, X, AlertCircle, DollarSign, TrendingUp } from "lucide-react";
import { useLangStore } from "@/store/lang-store";
import { generateInvoicePDF, printInvoicePDF } from "@/lib/pdf-generator";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface InvoiceDialogProps {
    saleId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function InvoiceDialog({ saleId, isOpen, onClose }: InvoiceDialogProps) {
    const { lang } = useLangStore();
    const [isLoading, setIsLoading] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch invoice data when dialog opens
    useEffect(() => {
        if (isOpen && saleId) {
            fetchInvoiceData();
        } else {
            // Reset state when dialog closes
            setInvoiceData(null);
            setError(null);
        }
    }, [isOpen, saleId]);

    const fetchInvoiceData = async () => {
        if (!saleId) {
            setError(lang === "en" ? "No sale ID provided" : "لم يتم توفير معرف البيع");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await apiClient.get(`/sales/${saleId}`);

            if (response.data.success) {
                const sale = response.data.result;

                // Fetch store data as well
                const storeResponse = await apiClient.get(`/stores/${sale.storeId}`);

                if (storeResponse.data.success) {
                    // Combine sale and store data for invoice
                    const invoiceData = {
                        sale: {
                            ...sale,
                            store: storeResponse.data.result
                        },
                        lang: lang // Pass current language for PDF generation
                    };
                    setInvoiceData(invoiceData);
                } else {
                    throw new Error("Failed to fetch store data");
                }
            } else {
                throw new Error(response.data.message || "Failed to fetch sale data");
            }
        } catch (error: any) {
            console.error("Error fetching invoice data:", error);
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                (lang === "en" ? "Failed to load invoice data" : "فشل في تحميل بيانات الفاتورة");
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!invoiceData) return;

        try {
            setIsLoading(true);
            const invoiceDataWithLang = {
                ...invoiceData,
                lang: lang // Pass current language
            };

            const { dataUrl, filename } = await generateInvoicePDF(invoiceDataWithLang);

            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success(
                lang === "en" ? "Invoice downloaded successfully" : "تم تنزيل الفاتورة بنجاح"
            );
        } catch (error) {
            console.error("Error generating PDF:", error);
            const errorMessage = lang === "en"
                ? "Failed to generate invoice PDF"
                : "فشل في إنشاء ملف PDF للفاتورة";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrintPDF = async () => {
        if (!invoiceData) return;

        try {
            setIsLoading(true);
            const invoiceDataWithLang = {
                ...invoiceData,
                lang: lang // Pass current language
            };

            await printInvoicePDF(invoiceDataWithLang);

            toast.success(
                lang === "en" ? "Print dialog opened" : "تم فتح نافذة الطباعة"
            );
        } catch (error) {
            console.error("Error printing PDF:", error);
            const errorMessage = lang === "en"
                ? "Failed to prepare for printing"
                : "فشل في التحضير للطباعة";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Format gold type display
    const formatGoldType = (goldType: string) => {
        const goldTypes: Record<string, { en: string; ar: string }> = {
            'GOLD_14': { en: "14K Gold", ar: "ذهب عيار ١٤" },
            'GOLD_18': { en: "18K Gold", ar: "ذهب عيار ١٨" },
            'GOLD_21': { en: "21K Gold", ar: "ذهب عيار ٢١" },
            'GOLD_24': { en: "24K Gold", ar: "ذهب عيار ٢٤" },
        };
        return goldTypes[goldType]?.[lang] || goldType;
    };

    // Format currency display
    const formatCurrency = (amount: number, currency: string) => {
        if (currency === 'USD') {
            return `${amount.toFixed(2)} USD`;
        } else {
            return `${amount.toFixed(0)} ليرة`;
        }
    };

    // Format payment type
    const formatPaymentType = (paymentType: string) => {
        const types: Record<string, { en: string; ar: string }> = {
            'CASH': { en: "Cash", ar: "نقدي" },
            'SHAM_CASH': { en: "Sham Cash Transfer", ar: "تحويل شام كاش" },
            'OTHER': { en: "Other", ar: "أخرى" },
        };
        return types[paymentType]?.[lang] || paymentType;
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                onClose();
            }
        }}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div>
                        <DialogTitle>
                            {lang === "en" ? "Invoice Options" : "خيارات الفاتورة"}
                        </DialogTitle>
                        <DialogDescription>
                            {lang === "en" ? "Download or print the invoice" : "قم بتنزيل أو طباعة الفاتورة"}
                        </DialogDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="py-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                            <p className="text-muted-foreground">
                                {lang === "en" ? "Loading invoice data..." : "جاري تحميل بيانات الفاتورة..."}
                            </p>
                        </div>
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    ) : invoiceData ? (
                        <div className="space-y-6">
                            {/* Invoice Preview Header */}
                            <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <DollarSign className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">
                                    {lang === "en" ? "Invoice" : "فاتورة"}
                                </h3>
                                <div className="flex flex-col items-center gap-2">
                                    <Badge variant="outline" className="text-base font-bold px-4 py-1">
                                        {lang === "en" ? "Invoice #" : "فاتورة رقم"} {invoiceData.sale.invoiceNumber}
                                    </Badge>
                                    <div className="text-sm text-muted-foreground">
                                        {new Date(invoiceData.sale.createdAt).toLocaleDateString(lang === "en" ? "en-US" : "ar-SA", {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Details Summary */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Store Information */}
                                <div className="space-y-4 p-4 border rounded-lg bg-white">
                                    <h4 className="font-semibold text-lg border-b pb-2 flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-blue-500" />
                                        {lang === "en" ? "Store Information" : "معلومات المتجر"}
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-gray-600">
                                                {lang === "en" ? "Store Name" : "اسم المتجر"}:
                                            </span>
                                            <span className="font-semibold text-right">
                                                {invoiceData.sale.store.name}
                                            </span>
                                        </div>
                                        {invoiceData.sale.store.address && (
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-sm text-gray-600">
                                                    {lang === "en" ? "Address" : "العنوان"}:
                                                </span>
                                                <span className="text-right">{invoiceData.sale.store.address}</span>
                                            </div>
                                        )}
                                        {invoiceData.sale.store.city && (
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-sm text-gray-600">
                                                    {lang === "en" ? "City" : "المدينة"}:
                                                </span>
                                                <span className="text-right">{invoiceData.sale.store.city}</span>
                                            </div>
                                        )}
                                        {invoiceData.sale.store.primaryPhoneNumber && (
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-sm text-gray-600">
                                                    {lang === "en" ? "Phone" : "الهاتف"}:
                                                </span>
                                                <span className="text-right">{invoiceData.sale.store.primaryPhoneNumber}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Sale Information */}
                                <div className="space-y-4 p-4 border rounded-lg bg-white">
                                    <h4 className="font-semibold text-lg border-b pb-2 flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        {lang === "en" ? "Sale Details" : "تفاصيل البيع"}
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-gray-600">
                                                {lang === "en" ? "Customer" : "العميل"}:
                                            </span>
                                            <span className="font-semibold text-right">
                                                {invoiceData.sale.customerName || (lang === "en" ? "Walk-in Customer" : "عميل مباشر")}
                                            </span>
                                        </div>
                                        {invoiceData.sale.customerPhone && (
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-sm text-gray-600">
                                                    {lang === "en" ? "Phone" : "الهاتف"}:
                                                </span>
                                                <span className="text-right">{invoiceData.sale.customerPhone}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-gray-600">
                                                {lang === "en" ? "Payment Type" : "طريقة الدفع"}:
                                            </span>
                                            <Badge variant="outline" className="text-green-600">
                                                {formatPaymentType(invoiceData.sale.paymentType)}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gold and Financial Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Gold Details */}
                                <div className="space-y-4 p-4 border rounded-lg bg-yellow-50">
                                    <h4 className="font-semibold text-lg border-b pb-2 text-yellow-700">
                                        {lang === "en" ? "Gold Details" : "تفاصيل الذهب"}
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-yellow-700">
                                                {lang === "en" ? "Gold Type" : "نوع الذهب"}:
                                            </span>
                                            <span className="font-bold text-yellow-800">
                                                {formatGoldType(invoiceData.sale.goldType)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-yellow-700">
                                                {lang === "en" ? "Weight" : "الوزن"}:
                                            </span>
                                            <span className="font-bold text-yellow-800">
                                                {invoiceData.sale.weight.toFixed(2)} {lang === "en" ? "grams" : "جرام"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-yellow-700">
                                                {lang === "en" ? "Price per Gram" : "السعر لكل جرام"}:
                                            </span>
                                            <span className="font-bold text-yellow-800">
                                                {formatCurrency(invoiceData.sale.pricePerGramUSD, 'USD')}
                                            </span>
                                        </div>
                                        {invoiceData.sale.store.exchangeRateUSDtoSYP && (
                                            <div className="text-xs text-yellow-600 text-center">
                                                {lang === "en"
                                                    ? `Exchange rate: 1 USD = ${invoiceData.sale.store.exchangeRateUSDtoSYP.toFixed(2)} SYP`
                                                    : `سعر الصرف: ١ دولار = ${invoiceData.sale.store.exchangeRateUSDtoSYP.toFixed(2)} ليرة`
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Financial Details with Profit */}
                                <div className="space-y-4 p-4 border rounded-lg bg-green-50">
                                    <h4 className="font-semibold text-lg border-b pb-2 text-green-700">
                                        {lang === "en" ? "Financial Summary" : "ملخص مالي"}
                                    </h4>
                                    <div className="space-y-3">
                                        {/* Base Amount */}
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm text-green-700">
                                                {lang === "en" ? "Base Amount" : "المبلغ الأساسي"}:
                                            </span>
                                            <span className="font-bold text-green-800">
                                                {formatCurrency(invoiceData.sale.totalUSD - invoiceData.sale.profitUSD, 'USD')}
                                            </span>
                                        </div>

                                        {/* Profit */}
                                        <div className="flex justify-between items-center pt-2 border-t">
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-sm text-green-700">
                                                    {lang === "en" ? "Profit" : "الربح"}:
                                                </span>
                                                <span className="text-xs text-green-600">
                                                    ({invoiceData.sale.profitUSD > 0 ? '+' : ''}{invoiceData.sale.profitUSD.toFixed(2)} USD)
                                                </span>
                                            </div>
                                            <span className="font-bold text-green-800">
                                                +{formatCurrency(invoiceData.sale.profitUSD, 'USD')}
                                            </span>
                                        </div>

                                        {/* Total Amount */}
                                        <div className="flex justify-between items-center pt-2 border-t">
                                            <span className="font-bold text-lg text-green-900">
                                                {lang === "en" ? "Total Amount" : "المبلغ الإجمالي"}:
                                            </span>
                                            <span className="font-bold text-2xl text-green-900">
                                                {formatCurrency(invoiceData.sale.totalUSD, 'USD')}
                                            </span>
                                        </div>

                                        {/* Amount Paid */}
                                        <div className="flex justify-between items-center pt-3">
                                            <span className="font-bold text-lg text-blue-900">
                                                {lang === "en" ? "Amount Paid" : "المبلغ المدفوع"}:
                                            </span>
                                            <span className="font-bold text-2xl text-blue-900">
                                                {formatCurrency(invoiceData.sale.amountPaid, invoiceData.sale.currency)}
                                            </span>
                                        </div>

                                        {/* Balance if any */}
                                        {invoiceData.sale.amountPaid !== invoiceData.sale.totalUSD && (
                                            <div className="flex justify-between items-center pt-2 border-t">
                                                <span className="font-medium text-sm text-orange-700">
                                                    {lang === "en" ? "Balance" : "الرصيد"}:
                                                </span>
                                                <span className="font-bold text-orange-800">
                                                    {formatCurrency(
                                                        invoiceData.sale.amountPaid > invoiceData.sale.totalUSD
                                                            ? invoiceData.sale.amountPaid - invoiceData.sale.totalUSD
                                                            : invoiceData.sale.totalUSD - invoiceData.sale.amountPaid,
                                                        invoiceData.sale.currency
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* SYP Conversion (Arabic Invoice Requirement) */}
                            {lang === "ar" && (
                                <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                                    <h4 className="font-semibold text-lg border-b pb-2 text-blue-700">
                                        {lang === "ar" ? "المبلغ بالليرة السورية" : "Amount in Syrian Pounds"}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="text-sm text-blue-600 mb-1">
                                                {lang === "ar" ? "المبلغ الأساسي" : "Base Amount"}
                                            </div>
                                            <div className="font-bold text-lg text-blue-800">
                                                {((invoiceData.sale.totalUSD - invoiceData.sale.profitUSD) *
                                                    invoiceData.sale.store.exchangeRateUSDtoSYP).toFixed(0)} ليرة
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-blue-600 mb-1">
                                                {lang === "ar" ? "الربح" : "Profit"}
                                            </div>
                                            <div className="font-bold text-lg text-blue-800">
                                                +{(invoiceData.sale.profitUSD *
                                                    invoiceData.sale.store.exchangeRateUSDtoSYP).toFixed(0)} ليرة
                                            </div>
                                        </div>
                                        <div className="text-center col-span-2">
                                            <div className="text-sm text-blue-600 mb-1">
                                                {lang === "ar" ? "الإجمالي بالليرة" : "Total in SYP"}
                                            </div>
                                            <div className="font-bold text-2xl text-blue-900">
                                                {(invoiceData.sale.totalUSD *
                                                    invoiceData.sale.store.exchangeRateUSDtoSYP).toFixed(0)} ليرة
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            {invoiceData.sale.description && (
                                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                                    <h4 className="font-semibold text-lg border-b pb-2">
                                        {lang === "en" ? "Notes" : "ملاحظات"}
                                    </h4>
                                    <p className="text-gray-700">
                                        {invoiceData.sale.description}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                <Button
                                    onClick={handleDownloadPDF}
                                    disabled={isLoading}
                                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Download className="mr-2 h-5 w-5" />
                                    )}
                                    {lang === "en" ? "Download PDF Invoice" : "تحميل فاتورة PDF"}
                                </Button>

                                <Button
                                    onClick={handlePrintPDF}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="flex-1 h-12 border-2 hover:bg-gray-50"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Printer className="mr-2 h-5 w-5" />
                                    )}
                                    {lang === "en" ? "Print Invoice" : "طباعة الفاتورة"}
                                </Button>
                            </div>

                            {/* Invoice Footer */}
                            <div className="text-center text-xs text-gray-500 pt-4 border-t">
                                <p>
                                    {lang === "en"
                                        ? "Thank you for your business! Please keep this invoice for your records."
                                        : "شكراً لتعاملكم! يرجى الاحتفاظ بهذه الفاتورة للسجلات."
                                    }
                                </p>
                                <p className="mt-1">
                                    {lang === "en"
                                        ? "Generated on " + new Date().toLocaleDateString()
                                        : "تم الإنشاء في " + new Date().toLocaleDateString('ar-SA')
                                    }
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">
                                {lang === "en" ? "No invoice data available" : "لا توجد بيانات فاتورة متاحة"}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}