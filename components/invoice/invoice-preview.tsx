// components/invoice/invoice-preview.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLangStore } from "@/store/lang-store";
import { Sale, Store } from "@/lib/generated/prisma";
import { formatCurrency, formatDate, getPaymentTypeLabel, getGoldTypeLabel } from "@/lib/utils";
import { generateInvoicePDF, printInvoicePDF, InvoiceData } from "@/lib/pdf-generator";
import { Loader2, Download, Printer, Eye, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface InvoicePreviewProps {
  sale: Sale & {
    store: Store;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function InvoicePreview({ sale, isOpen, onClose }: InvoicePreviewProps) {
  const { lang } = useLangStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const invoiceData: InvoiceData = {
        sale,
      };

      const { dataUrl, filename } = await generateInvoicePDF(invoiceData);

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
      toast.error(
        lang === "en" ? "Failed to generate invoice" : "فشل في إنشاء الفاتورة"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrintPDF = async () => {
    try {
      setIsGenerating(true);
      const invoiceData: InvoiceData = {
        sale,
      };

      await printInvoicePDF(invoiceData);

      toast.success(
        lang === "en" ? "Print dialog opened" : "تم فتح نافذة الطباعة"
      );
    } catch (error) {
      console.error("Error printing PDF:", error);
      toast.error(
        lang === "en" ? "Failed to prepare for printing" : "فشل في التحضير للطباعة"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const currentTotal = sale.currency === 'USD' ? sale.totalUSD : sale.totalSYP;
  const difference = sale.amountPaid - currentTotal;
  const pricePerGram = sale.currency === 'USD' ? sale.pricePerGramUSD : sale.pricePerGramSYP;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>
            {lang === "en" ? "Invoice Preview" : "معاينة الفاتورة"}
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {lang === "en" ? "SALE INVOICE" : "فاتورة بيع"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {lang === "en" ? `Invoice #${sale.invoiceNumber}` : `فاتورة رقم ${sale.invoiceNumber}`}
            </p>
          </div>

          {/* Store and Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Information */}
            <div>
              <h3 className="font-semibold text-sm mb-2">
                {lang === "en" ? "Store Information" : "معلومات المتجر"}
              </h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">{sale.store.name}</span></p>
                {sale.store.address && (
                  <p>{lang === "en" ? "Address: " : "العنوان: "}{sale.store.address}</p>
                )}
                {sale.store.city && (
                  <p>{lang === "en" ? "City: " : "المدينة: "}{sale.store.city}</p>
                )}
                {sale.store.primaryPhoneNumber && (
                  <p>{lang === "en" ? "Phone: " : "الهاتف: "}{sale.store.primaryPhoneNumber}</p>
                )}
              </div>
            </div>

            {/* Invoice Details */}
            <div>
              <h3 className="font-semibold text-sm mb-2">
                {lang === "en" ? "Invoice Details" : "تفاصيل الفاتورة"}
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  {lang === "en" ? "Date: " : "التاريخ: "}
                  {formatDate(sale.createdAt, lang)}
                </p>
                <p>
                  {lang === "en" ? "Payment Method: " : "طريقة الدفع: "}
                  <Badge variant="outline">
                    {getPaymentTypeLabel(sale.paymentType, lang)}
                  </Badge>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="font-semibold text-sm mb-2">
              {lang === "en" ? "Customer Information" : "معلومات العميل"}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                {lang === "en" ? "Name: " : "الاسم: "}
                <span className="font-medium">
                  {sale.customerName || (lang === "en" ? "Walk-in Customer" : "عميل زائر")}
                </span>
              </p>
              {sale.customerPhone && (
                <p>
                  {lang === "en" ? "Phone: " : "الهاتف: "}
                  {sale.customerPhone}
                </p>
              )}
            </div>
          </div>

          {/* Sale Details Table */}
          <div>
            <h3 className="font-semibold text-sm mb-3">
              {lang === "en" ? "Sale Details" : "تفاصيل البيع"}
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 p-3 text-sm font-medium border-b">
                <div>{lang === "en" ? "Gold Type" : "نوع الذهب"}</div>
                <div>{lang === "en" ? "Weight (g)" : "الوزن (جرام)"}</div>
                <div>{lang === "en" ? "Price/g" : "السعر/جرام"}</div>
                <div>{lang === "en" ? "Total" : "الإجمالي"}</div>
              </div>
              <div className="grid grid-cols-4 p-3 text-sm">
                <div>
                  <Badge variant="secondary">
                    {getGoldTypeLabel(lang, sale.goldType)}
                  </Badge>
                </div>
                <div>{sale.weight.toFixed(2)}</div>
                <div>
                  {formatCurrency(pricePerGram, sale.currency, lang)}
                </div>
                <div className="font-medium">
                  {formatCurrency(currentTotal, sale.currency, lang)}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <h3 className="font-semibold text-sm mb-3">
              {lang === "en" ? "Payment Summary" : "ملخص الدفع"}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{lang === "en" ? "Amount Paid:" : "المبلغ المدفوع:"}</span>
                <span className="font-medium">
                  {formatCurrency(sale.amountPaid, sale.currency, lang)}
                </span>
              </div>

              {Math.abs(difference) > 0.01 && (
                <div className="flex justify-between">
                  <span>
                    {difference > 0
                      ? (lang === "en" ? "Change Due:" : "الباقي للعميل:")
                      : (lang === "en" ? "Remaining Balance:" : "المتبقي:")
                    }
                  </span>
                  <span className={`font-medium ${difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(difference), sale.currency, lang)}
                  </span>
                </div>
              )}

              {Math.abs(difference) <= 0.01 && (
                <div className="flex justify-between">
                  <span>{lang === "en" ? "Payment Status:" : "حالة الدفع:"}</span>
                  <Badge className="bg-green-100 text-green-800">
                    {lang === "en" ? "Paid in Full" : "مدفوع بالكامل"}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Currency Exchange */}
          {sale.currency === 'USD' && sale.store?.exchangeRateUSDtoSYP && (
            <div>
              <h3 className="font-semibold text-sm mb-3">
                {lang === "en" ? "Currency Exchange" : "سعر الصرف"}
              </h3>
              <div className="space-y-2 text-sm bg-blue-50 p-3 rounded">
                <div className="flex justify-between">
                  <span>{lang === "en" ? "Equivalent in SYP:" : "المعادل بالليرة:"}</span>
                  <span className="font-medium">
                    {formatCurrency(sale.totalUSD * sale.store.exchangeRateUSDtoSYP, 'SYP', lang)}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {lang === "en"
                    ? `Exchange Rate: 1 USD = ${sale.store.exchangeRateUSDtoSYP.toFixed(2)} SYP`
                    : `سعر الصرف: ١ دولار = ${sale.store.exchangeRateUSDtoSYP.toFixed(2)} ليرة`
                  }
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {sale.description && (
            <div>
              <h3 className="font-semibold text-sm mb-3">
                {lang === "en" ? "Notes" : "ملاحظات"}
              </h3>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {sale.description}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {lang === "en" ? "Download PDF" : "تحميل PDF"}
            </Button>

            <Button
              onClick={handlePrintPDF}
              disabled={isGenerating}
              variant="outline"
              className="flex-1"
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Printer className="mr-2 h-4 w-4" />
              )}
              {lang === "en" ? "Print" : "طباعة"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}